import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch, type Ref } from 'vue';
import { DEFAULT_OPTIONS, EMPTY_IMAGE, type ResolvedSignCanvasOptions, type SignCanvasOptions } from './constants';
import {
    applyCoverStyle,
    drawBoard,
    exportCanvas,
    getCanvasCssSize,
    getCanvasPoint,
    loadImage,
    resizeCanvas,
    toNumber,
    type CanvasPoint,
    type CanvasSize
} from './utils/canvas';

/**
 * 线段笔迹。
 */
export interface LineStroke {
    type: 'line';
    from: CanvasPoint;
    to: CanvasPoint;
    lineWidth: number;
    color: string;
    lineCap: CanvasLineCap;
    lineJoin: CanvasLineJoin;
}

/**
 * 点笔迹。只点击不移动也会生成一个点笔迹。
 */
export interface PointStroke {
    type: 'point';
    point: CanvasPoint;
    radius: number;
    color: string;
}

/**
 * 组件内部保存的真实笔迹。背景色和辅助线不会进入这个列表。
 */
export type SignStroke = LineStroke | PointStroke;

/**
 * 签名板状态摘要，主要用于表单校验和调试。
 */
export interface SignatureStatus {
    empty: boolean;
    strokes: number;
    hasImage: boolean;
    canUndo: boolean;
    canRedo: boolean;
    history: number;
    redo: number;
}

/**
 * 清空画板参数。
 */
export type ClearPayload = boolean | { emit?: boolean };

/**
 * 导出图片参数。
 */
export interface ExportPayload {
    quality?: number;
    allowEmpty?: boolean;
}

/**
 * 回显图片参数。
 */
export interface FromDataURLPayload {
    emit?: boolean;
    clear?: boolean;
}

/**
 * SignCanvas 组件 props。
 */
export interface SignCanvasProps {
    modelValue?: string | null;
    image?: string | null;
    options?: SignCanvasOptions | null;
}

/**
 * SignCanvas 组件事件。
 */
export interface SignCanvasEmits {
    (event: 'update:modelValue', value: string | null): void;
    (event: 'confirm', value: string | null): void;
    (event: 'start', point: CanvasPoint): void;
    (event: 'end', point: CanvasPoint): void;
    (event: 'change', status: SignatureStatus): void;
    (event: 'clear'): void;
    (event: 'undo', status: SignatureStatus): void;
    (event: 'redo', status: SignatureStatus): void;
}

/**
 * 组件对外暴露的实例方法。
 */
export interface SignCanvasExpose {
    clear: (payload?: ClearPayload) => void;
    canvasClear: (payload?: ClearPayload) => void;
    saveAsImg: (payload?: ExportPayload) => string | null;
    toDataURL: (payload?: ExportPayload) => string | null;
    downloadSignImg: (name?: string) => string | null;
    dealImage: (quality?: number) => string | null;
    fromDataURL: (dataURL: string, payload?: FromDataURLPayload) => Promise<string | null>;
    undo: () => boolean;
    redo: () => boolean;
    canUndo: () => boolean;
    canRedo: () => boolean;
    getStrokes: () => SignStroke[];
    isEmpty: () => boolean;
    getSignatureStatus: () => SignatureStatus;
    redraw: () => void;
    initCanvas: () => void;
}

/**
 * 封装签名画板的状态、绘制和对外 API。
 *
 * @param params 参数对象。
 * @param params.canvasRef 组件内 canvas 引用。
 * @param params.props Vue 组件 props。
 * @param params.emit Vue 组件 emit。
 */
export function useSignCanvas(params: {
    canvasRef: Ref<HTMLCanvasElement | null>;
    props: SignCanvasProps;
    emit: SignCanvasEmits;
}): SignCanvasExpose & {
    options: Ref<ResolvedSignCanvasOptions>;
    isDisabled: Ref<boolean>;
    handlePointerDown: (event: PointerEvent) => void;
    handlePointerMove: (event: PointerEvent) => void;
    handlePointerUp: (event: PointerEvent) => void;
    handlePointerCancel: (event: PointerEvent) => void;
    handlePointerLeave: (event: PointerEvent) => void;
    handleLostPointerCapture: (event: PointerEvent) => void;
} {
    const { canvasRef, props, emit } = params;
    const context = shallowRef<CanvasRenderingContext2D | null>(null);
    const options = ref<ResolvedSignCanvasOptions>(createOptions(props.options));
    const cssSize = ref<CanvasSize>({ width: options.value.canvasWidth, height: options.value.canvasHeight });
    const dpr = ref(1);
    const strokes = ref<SignStroke[]>([]);
    const undoStack = ref<SignStroke[][]>([]);
    const redoStack = ref<SignStroke[][]>([]);
    const currentStrokeBatch = ref<SignStroke[]>([]);
    const sourceImage = shallowRef<HTMLImageElement | null>(null);
    const backgroundImage = shallowRef<HTMLImageElement | null>(null);
    const backgroundImageSrc = ref('');
    const guideImage = shallowRef<HTMLImageElement | null>(null);
    const guideImageSrc = ref('');
    const internalImage = ref<string | null>(EMPTY_IMAGE);
    const isDrawing = ref(false);
    const activePointerId = ref<number | null>(null);
    const hasMoved = ref(false);
    const hasSignature = ref(false);
    const lastPoint = ref<CanvasPoint | null>(null);
    const lastWriteTime = ref(0);
    const lastWriteWidth = ref(options.value.lastWriteWidth);
    const resizeTimer = ref<ReturnType<typeof setTimeout> | null>(null);
    const isResizeBound = ref(false);
    const layerLoadId = ref(0);

    const isDisabled = computed(() => !!(options.value.disabled || options.value.readonly));

    /**
     * 初始化或重算画布尺寸，并把已有内容完整重绘回来。
     */
    function initCanvas(): void {
        const canvas = canvasRef.value;
        if (!canvas) {
            return;
        }
        options.value = createOptions(props.options, options.value);
        dpr.value = options.value.isDpr ? window.devicePixelRatio || 1 : 1;
        cssSize.value = getCanvasCssSize(options.value);
        context.value = canvas.getContext('2d');
        resizeCanvas(canvas, cssSize.value, dpr.value);
        applyCoverStyle(canvas, options.value);
        applyInputStyle(canvas);
        redraw();
    }

    /**
     * 重绘背景、历史图片和所有真实笔迹。
     */
    function redraw(): void {
        const canvas = canvasRef.value;
        const ctx = context.value;
        if (!canvas || !ctx) {
            return;
        }
        drawBoard(ctx, canvas, options.value, dpr.value, {
            backgroundImage: backgroundImage.value,
            guideImage: guideImage.value
        });
        if (sourceImage.value) {
            ctx.drawImage(sourceImage.value, 0, 0, canvas.width, canvas.height);
        }
        strokes.value.forEach(drawStroke);
        hasSignature.value = !!sourceImage.value || strokes.value.length > 0;
    }

    /**
     * 绘制一段已缓存的笔迹。缓存用 CSS 像素保存，绘制时统一乘 dpr。
     *
     * @param stroke 笔迹数据。
     */
    function drawStroke(stroke: SignStroke): void {
        const ctx = context.value;
        if (!ctx) {
            return;
        }
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = stroke.color;
        ctx.strokeStyle = stroke.color;

        if (stroke.type === 'point') {
            ctx.arc(stroke.point.x * dpr.value, stroke.point.y * dpr.value, stroke.radius * dpr.value, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            return;
        }

        ctx.lineCap = stroke.lineCap;
        ctx.lineJoin = stroke.lineJoin;
        ctx.lineWidth = stroke.lineWidth * dpr.value;
        ctx.moveTo(stroke.from.x * dpr.value, stroke.from.y * dpr.value);
        ctx.lineTo(stroke.to.x * dpr.value, stroke.to.y * dpr.value);
        ctx.stroke();
        ctx.restore();
    }

    /**
     * 开始一次指针绘制。禁用或只读状态下直接忽略输入。
     *
     * @param event 指针事件。
     */
    function handlePointerDown(event: PointerEvent): void {
        if (isDisabled.value || !canvasRef.value || isDrawing.value || !event.isPrimary) {
            return;
        }
        canvasRef.value.focus();
        capturePointer(canvasRef.value, event.pointerId);
        activePointerId.value = event.pointerId;
        isDrawing.value = true;
        hasMoved.value = false;
        currentStrokeBatch.value = [];
        lastPoint.value = getCanvasPoint(event, canvasRef.value);
        lastWriteTime.value = Date.now();
        lastWriteWidth.value = toNumber(options.value.lastWriteWidth, DEFAULT_OPTIONS.lastWriteWidth);
        emit('start', lastPoint.value);
    }

    /**
     * 追加指针移动轨迹，并立即绘制到当前画布。
     *
     * @param event 指针事件。
     */
    function handlePointerMove(event: PointerEvent): void {
        if (!isDrawing.value || !lastPoint.value || !canvasRef.value || !isActivePointer(event)) {
            return;
        }
        const point = getCanvasPoint(event, canvasRef.value);
        const stroke = createLineStroke(lastPoint.value, point);
        strokes.value.push(stroke);
        currentStrokeBatch.value.push(stroke);
        drawStroke(stroke);
        lastPoint.value = point;
        hasMoved.value = true;
        hasSignature.value = true;
    }

    /**
     * 结束一次绘制。只有点击没有移动时，会补一个圆点作为有效签名。
     *
     * @param event 指针事件。
     */
    function handlePointerUp(event: PointerEvent): void {
        if (!isActivePointer(event)) {
            return;
        }
        finishPointer(event, { commitPoint: true, releaseCapture: true });
    }

    /**
     * 指针取消时结束本次绘制。取消事件不补点，避免浏览器手势打断时误生成签名。
     *
     * @param event 指针事件。
     */
    function handlePointerCancel(event: PointerEvent): void {
        if (!isActivePointer(event)) {
            return;
        }
        finishPointer(event, { commitPoint: false, releaseCapture: true });
    }

    /**
     * 鼠标离开画布时收尾；触摸和手写笔依赖 pointer capture 继续派发事件，不能提前截断。
     *
     * @param event 指针事件。
     */
    function handlePointerLeave(event: PointerEvent): void {
        if (!isActivePointer(event) || event.pointerType !== 'mouse') {
            return;
        }
        finishPointer(event, { commitPoint: true, releaseCapture: true });
    }

    /**
     * pointer capture 意外丢失时兜底收尾，避免内部状态卡在绘制中。
     *
     * @param event 指针事件。
     */
    function handleLostPointerCapture(event: PointerEvent): void {
        if (!isActivePointer(event) || !isDrawing.value) {
            return;
        }
        finishPointer(event, { commitPoint: false, releaseCapture: false });
    }

    /**
     * 结束一次绘制。只有正常 pointerup 且没有移动时，才补一个圆点作为有效签名。
     *
     * @param event 指针事件。
     * @param payload 收尾配置。
     */
    function finishPointer(event: PointerEvent, payload: { commitPoint: boolean; releaseCapture: boolean }): void {
        if (!isDrawing.value || !canvasRef.value) {
            return;
        }
        const point = getCanvasPoint(event, canvasRef.value);
        if (!hasMoved.value) {
            const stroke = createPointStroke(point);
            if (payload.commitPoint) {
                strokes.value.push(stroke);
                currentStrokeBatch.value.push(stroke);
                drawStroke(stroke);
                hasSignature.value = true;
            }
        }
        commitHistoryBatch();
        isDrawing.value = false;
        activePointerId.value = null;
        lastPoint.value = null;
        if (payload.releaseCapture) {
            releasePointer(canvasRef.value, event.pointerId);
        }
        emitCurrentImage();
        emit('end', point);
        emit('change', getSignatureStatus());
    }

    /**
     * 判断事件是否属于当前正在绘制的指针，避免触摸屏多指或模拟器重复事件打断轨迹。
     *
     * @param event 指针事件。
     */
    function isActivePointer(event: PointerEvent): boolean {
        return activePointerId.value !== null && event.pointerId === activePointerId.value;
    }

    /**
     * 清空画布和内部签名状态。
     *
     * @param payload 是否触发 v-model/confirm 更新。
     */
    function canvasClear(payload: ClearPayload = true): void {
        const shouldEmit = typeof payload === 'boolean' ? payload : payload.emit !== false;
        strokes.value = [];
        undoStack.value = [];
        redoStack.value = [];
        currentStrokeBatch.value = [];
        sourceImage.value = null;
        activePointerId.value = null;
        hasSignature.value = false;
        internalImage.value = EMPTY_IMAGE;
        redraw();
        if (shouldEmit) {
            emitEmpty();
            emit('clear');
            emit('change', getSignatureStatus());
        }
    }

    /**
     * 语义化别名，方便新项目使用。
     *
     * @param payload 是否触发 v-model/confirm 更新。
     */
    function clear(payload: ClearPayload = true): void {
        canvasClear(payload);
    }

    /**
     * 导出当前签名图。空画布默认返回 null，除非开启 allowEmpty。
     *
     * @param payload 导出参数。
     */
    function saveAsImg(payload: ExportPayload = {}): string | null {
        return toDataURL(payload);
    }

    /**
     * 导出当前画布为 base64。
     *
     * @param payload 导出参数。
     */
    function toDataURL(payload: ExportPayload = {}): string | null {
        const allowEmpty = payload.allowEmpty ?? options.value.allowEmpty;
        const canvas = canvasRef.value;
        if (!canvas || (!allowEmpty && isEmpty())) {
            emitEmpty();
            return null;
        }
        const dataURL = exportCanvas(canvas, options.value, payload.quality ?? options.value.quality);
        internalImage.value = dataURL;
        emitImage(dataURL);
        return dataURL;
    }

    /**
     * 下载当前签名图。
     *
     * @param name 文件名，不传则使用时间戳。
     */
    function downloadSignImg(name?: string): string | null {
        const dataURL = toDataURL();
        if (!dataURL) {
            return null;
        }
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `${name || Date.now()}.${options.value.imgType}`;
        link.click();
        return dataURL;
    }

    /**
     * 兼容旧版本方法名，用于按质量导出压缩图片。
     *
     * @param quality 图片质量。
     */
    function dealImage(quality = options.value.quality): string | null {
        return toDataURL({ quality, allowEmpty: options.value.allowEmpty });
    }

    /**
     * 从 base64 或图片地址回显签名，之后仍可继续绘制。
     *
     * @param dataURL base64、本地地址或允许 CORS 的远程图片地址。
     * @param payload 回显参数。
     */
    async function fromDataURL(dataURL: string, payload: FromDataURLPayload = {}): Promise<string | null> {
        if (!dataURL) {
            canvasClear({ emit: payload.emit !== false });
            return null;
        }
        const image = await loadImage(dataURL);
        if (payload.clear !== false) {
            strokes.value = [];
            undoStack.value = [];
            redoStack.value = [];
            currentStrokeBatch.value = [];
        }
        sourceImage.value = image;
        hasSignature.value = true;
        internalImage.value = dataURL;
        redraw();
        if (payload.emit !== false) {
            emitImage(dataURL);
            emit('change', getSignatureStatus());
        }
        return dataURL;
    }

    /**
     * 判断当前是否没有真实签名内容。背景和网格不会算作签名。
     */
    function isEmpty(): boolean {
        return !hasSignature.value;
    }

    /**
     * 撤销最近一次下笔。一次下笔内的多个线段会作为一个整体撤销。
     */
    function undo(): boolean {
        if (!canUndo()) {
            return false;
        }
        const batch = undoStack.value.pop();
        if (!batch) {
            return false;
        }
        strokes.value.splice(Math.max(0, strokes.value.length - batch.length), batch.length);
        redoStack.value.push(batch);
        redraw();
        emitCurrentImage();
        emit('undo', getSignatureStatus());
        emit('change', getSignatureStatus());
        return true;
    }

    /**
     * 重做最近一次被撤销的下笔。
     */
    function redo(): boolean {
        if (!canRedo()) {
            return false;
        }
        const batch = redoStack.value.pop();
        if (!batch) {
            return false;
        }
        strokes.value.push(...batch);
        undoStack.value.push(batch);
        redraw();
        emitCurrentImage();
        emit('redo', getSignatureStatus());
        emit('change', getSignatureStatus());
        return true;
    }

    /**
     * 是否存在可撤销的下笔历史。
     */
    function canUndo(): boolean {
        return options.value.enableHistory && undoStack.value.length > 0;
    }

    /**
     * 是否存在可重做的下笔历史。
     */
    function canRedo(): boolean {
        return options.value.enableHistory && redoStack.value.length > 0;
    }

    /**
     * 返回当前笔迹快照，调用方可以用于自定义回放或持久化。
     */
    function getStrokes(): SignStroke[] {
        return strokes.value.map((stroke) => {
            if (stroke.type === 'point') {
                return {
                    ...stroke,
                    point: { ...stroke.point }
                };
            }
            return {
                ...stroke,
                from: { ...stroke.from },
                to: { ...stroke.to }
            };
        });
    }

    /**
     * 返回当前签名状态，便于表单校验和调试。
     */
    function getSignatureStatus(): SignatureStatus {
        return {
            empty: isEmpty(),
            strokes: strokes.value.length,
            hasImage: !!sourceImage.value,
            canUndo: canUndo(),
            canRedo: canRedo(),
            history: undoStack.value.length,
            redo: redoStack.value.length
        };
    }

    /**
     * 创建线段笔迹，并计算当前线宽。
     *
     * @param from 起点。
     * @param to 终点。
     */
    function createLineStroke(from: CanvasPoint, to: CanvasPoint): LineStroke {
        return {
            type: 'line',
            from,
            to,
            lineWidth: getLineWidth(),
            color: options.value.writeColor,
            lineCap: options.value.lineCap,
            lineJoin: options.value.lineJoin
        };
    }

    /**
     * 创建点笔迹。只点击不移动也应该被视为一次签名。
     *
     * @param point 坐标。
     */
    function createPointStroke(point: CanvasPoint): PointStroke {
        const width = toNumber(options.value.writeWidth, DEFAULT_OPTIONS.writeWidth);
        return {
            type: 'point',
            point,
            radius: Math.max(width / 2, 1),
            color: options.value.writeColor
        };
    }

    /**
     * 计算本段轨迹宽度。签名模式固定宽度，写字模式根据间隔做平滑变化。
     */
    function getLineWidth(): number {
        if (options.value.isSign) {
            return toNumber(options.value.writeWidth, DEFAULT_OPTIONS.writeWidth);
        }
        const now = Date.now();
        const diffTime = Math.max(now - lastWriteTime.value, 1);
        lastWriteTime.value = now;
        const minWidth = toNumber(options.value.minWriteWidth, DEFAULT_OPTIONS.minWriteWidth);
        const maxWidth = toNumber(options.value.maxWriteWidth, DEFAULT_OPTIONS.maxWriteWidth);
        const targetWidth = Math.max(minWidth, Math.min(maxWidth, minWidth + (maxWidth - minWidth) * diffTime / 30));
        lastWriteWidth.value = lastWriteWidth.value / 4 * 3 + targetWidth / 4;
        return Number(lastWriteWidth.value.toFixed(2));
    }

    /**
     * 根据当前画布内容触发 v-model 和 confirm。
     */
    function emitCurrentImage(): void {
        if (!options.value.allowEmpty && isEmpty()) {
            emitEmpty();
            return;
        }
        const canvas = canvasRef.value;
        if (!canvas) {
            emitEmpty();
            return;
        }
        const dataURL = exportCanvas(canvas, options.value, options.value.quality);
        internalImage.value = dataURL;
        emitImage(dataURL);
    }

    /**
     * 触发图片值更新。
     *
     * @param dataURL 导出的图片。
     */
    function emitImage(dataURL: string): void {
        emit('update:modelValue', dataURL);
        emit('confirm', dataURL);
    }

    /**
     * 触发空值更新。
     */
    function emitEmpty(): void {
        internalImage.value = EMPTY_IMAGE;
        emit('update:modelValue', null);
        emit('confirm', null);
    }

    /**
     * 将一次下笔提交为一条历史记录。redo 栈会在新绘制后失效。
     */
    function commitHistoryBatch(): void {
        if (!options.value.enableHistory || currentStrokeBatch.value.length === 0) {
            currentStrokeBatch.value = [];
            return;
        }
        undoStack.value.push([...currentStrokeBatch.value]);
        const maxHistory = Math.max(1, Number(options.value.maxHistory) || DEFAULT_OPTIONS.maxHistory);
        if (undoStack.value.length > maxHistory) {
            const dropped = undoStack.value.shift();
            if (dropped) {
                // 历史上限只限制可撤销记录，不影响画布上已经存在的笔迹。
            }
        }
        redoStack.value = [];
        currentStrokeBatch.value = [];
    }

    /**
     * 处理键盘快捷键。输入框内不抢占浏览器默认撤销行为。
     */
    function handleKeydown(event: KeyboardEvent): void {
        if (!options.value.enableShortcuts || document.activeElement !== canvasRef.value || isEditableTarget(event.target)) {
            return;
        }
        const key = event.key.toLowerCase();
        const isModifierPressed = event.metaKey || event.ctrlKey;
        if (!isModifierPressed) {
            return;
        }
        if (key === 'z' && !event.shiftKey) {
            if (undo()) {
                event.preventDefault();
            }
            return;
        }
        if (key === 'y' || (key === 'z' && event.shiftKey)) {
            if (redo()) {
                event.preventDefault();
            }
        }
    }

    /**
     * 根据 enableResize 绑定或解绑窗口监听。
     */
    function syncResizeListener(): void {
        if (options.value.enableResize) {
            addResizeListener();
        } else {
            removeResizeListener();
        }
    }

    function addResizeListener(): void {
        if (isResizeBound.value) {
            return;
        }
        window.addEventListener('resize', handleResize, false);
        isResizeBound.value = true;
    }

    function removeResizeListener(): void {
        if (!isResizeBound.value) {
            return;
        }
        window.removeEventListener('resize', handleResize, false);
        isResizeBound.value = false;
    }

    function handleResize(): void {
        if (resizeTimer.value) {
            clearTimeout(resizeTimer.value);
        }
        resizeTimer.value = setTimeout(initCanvas, 100);
    }

    /**
     * 同步背景图和临摹图缓存。图层只作为显示/导出材料，不进入签名笔迹历史。
     */
    async function syncLayerImages(): Promise<void> {
        const loadId = layerLoadId.value + 1;
        layerLoadId.value = loadId;
        const nextBackgroundSrc = options.value.backgroundImage || '';
        const nextGuideSrc = options.value.guideImage || '';
        const shouldReloadBackground = nextBackgroundSrc !== backgroundImageSrc.value;
        const shouldReloadGuide = nextGuideSrc !== guideImageSrc.value;

        if (!shouldReloadBackground && !shouldReloadGuide) {
            return;
        }

        const [nextBackgroundImage, nextGuideImage] = await Promise.all([
            shouldReloadBackground ? loadOptionalLayerImage(nextBackgroundSrc) : Promise.resolve(backgroundImage.value),
            shouldReloadGuide ? loadOptionalLayerImage(nextGuideSrc) : Promise.resolve(guideImage.value)
        ]);

        // 多次快速切换配置时，只让最后一次加载结果落盘，避免旧图覆盖新图。
        if (loadId !== layerLoadId.value) {
            return;
        }

        if (shouldReloadBackground) {
            backgroundImageSrc.value = nextBackgroundSrc;
            backgroundImage.value = nextBackgroundImage;
        }
        if (shouldReloadGuide) {
            guideImageSrc.value = nextGuideSrc;
            guideImage.value = nextGuideImage;
        }
    }

    watch(
        () => props.options,
        async () => {
            options.value = createOptions(props.options, options.value);
            await syncLayerImages();
            initCanvas();
            syncResizeListener();
        },
        { deep: true }
    );

    watch(
        () => props.modelValue || props.image,
        async (value) => {
            if (value === internalImage.value) {
                return;
            }
            if (value) {
                await fromDataURL(value, { emit: false });
            } else {
                canvasClear(false);
            }
        }
    );

    onMounted(async () => {
        await nextTick();
        initCanvas();
        syncResizeListener();
        await syncLayerImages();
        redraw();
        window.addEventListener('keydown', handleKeydown, false);
        window.addEventListener('pointerup', handlePointerUp, false);
        window.addEventListener('pointercancel', handlePointerCancel, false);
        const initialValue = props.modelValue || props.image;
        if (initialValue) {
            await fromDataURL(initialValue, { emit: false });
        }
    });

    onBeforeUnmount(() => {
        removeResizeListener();
        if (resizeTimer.value) {
            clearTimeout(resizeTimer.value);
        }
        window.removeEventListener('keydown', handleKeydown, false);
        window.removeEventListener('pointerup', handlePointerUp, false);
        window.removeEventListener('pointercancel', handlePointerCancel, false);
    });

    return {
        options,
        isDisabled,
        isEmpty,
        getSignatureStatus,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        handlePointerCancel,
        handlePointerLeave,
        handleLostPointerCapture,
        canvasClear,
        clear,
        undo,
        redo,
        canUndo,
        canRedo,
        getStrokes,
        saveAsImg,
        toDataURL,
        downloadSignImg,
        dealImage,
        fromDataURL,
        redraw,
        initCanvas
    };
}

/**
 * 合并默认配置、历史配置和外部 options。
 *
 * @param incoming 外部配置。
 * @param previous 上一次配置。
 */
function createOptions(
    incoming?: SignCanvasOptions | null,
    previous: ResolvedSignCanvasOptions = DEFAULT_OPTIONS
): ResolvedSignCanvasOptions {
    return Object.assign({}, DEFAULT_OPTIONS, previous, incoming || {});
}

/**
 * 写入触摸绘制所需的关键交互样式。部分业务项目只引入 JS 产物、不引入 CSS，
 * 如果缺少 touch-action: none，Chrome/Edge 触摸会被页面手势打断成一小截。
 *
 * @param canvas 目标画布。
 */
function applyInputStyle(canvas: HTMLCanvasElement): void {
    canvas.style.touchAction = 'none';
    canvas.style.userSelect = 'none';
    (canvas.style as CSSStyleDeclaration & { webkitUserSelect?: string }).webkitUserSelect = 'none';
}

/**
 * 安全开启 pointer capture。部分触摸屏和模拟环境可能抛异常，不能因此中断绘制。
 *
 * @param canvas 目标画布。
 * @param pointerId 指针 ID。
 */
function capturePointer(canvas: HTMLCanvasElement, pointerId: number): void {
    try {
        canvas.setPointerCapture?.(pointerId);
    } catch {
        // capture 失败时仍允许继续绘制，window 级 pointerup/pointercancel 会负责兜底收尾。
    }
}

/**
 * 安全释放 pointer capture，兼容 pointer 已经丢失或浏览器实现不完整的场景。
 *
 * @param canvas 目标画布。
 * @param pointerId 指针 ID。
 */
function releasePointer(canvas: HTMLCanvasElement, pointerId: number): void {
    try {
        canvas.releasePointerCapture?.(pointerId);
    } catch {
        // 某些环境会在 pointercancel/lostpointercapture 后自动释放，再手动释放会抛异常。
    }
}

/**
 * 加载可选图层图片。加载失败时返回空图层，避免因为背景或临摹素材失效阻断签名板。
 *
 * @param src 图片地址。
 */
async function loadOptionalLayerImage(src: string): Promise<HTMLImageElement | null> {
    if (!src) {
        return null;
    }
    try {
        return await loadImage(src);
    } catch {
        return null;
    }
}

/**
 * 判断快捷键事件是否来自可编辑元素，避免抢占输入框、文本域和富文本里的撤销。
 *
 * @param target 事件目标。
 */
function isEditableTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) {
        return false;
    }
    const tagName = target.tagName.toLowerCase();
    return target.isContentEditable || tagName === 'input' || tagName === 'textarea' || tagName === 'select';
}
