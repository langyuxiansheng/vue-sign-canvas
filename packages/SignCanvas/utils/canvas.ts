import type { ResolvedSignCanvasOptions, SignCanvasImageFit } from '../constants';

/**
 * CSS 像素坐标点。
 */
export interface CanvasPoint {
    x: number;
    y: number;
}

/**
 * CSS 尺寸。
 */
export interface CanvasSize {
    width: number;
    height: number;
}

/**
 * 画布辅助图层。它们只参与显示和导出，不计入真实签名内容。
 */
export interface CanvasBoardLayers {
    backgroundImage?: HTMLImageElement | null;
    guideImage?: HTMLImageElement | null;
}

/**
 * 将任意输入转成安全数字。
 *
 * @param value 待转换值。
 * @param fallback 转换失败时使用的兜底值。
 */
export function toNumber(value: unknown, fallback: number): number {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
}

/**
 * 归一化导出图片类型，兼容 jpg 别名。
 *
 * @param type 用户传入的图片类型。
 */
export function normalizeImageType(type: string): 'png' | 'jpeg' | 'webp' {
    const imageType = String(type || 'png').toLowerCase();
    if (imageType === 'jpg') {
        return 'jpeg';
    }
    if (imageType === 'jpeg' || imageType === 'webp') {
        return imageType;
    }
    return 'png';
}

/**
 * 限制图片质量范围。这里的 quality 同时承担导出质量和等比缩放比例。
 *
 * @param quality 期望质量。
 */
export function normalizeQuality(quality: number): number {
    const value = toNumber(quality, 1);
    if (value < 0.1 || value > 1) {
        return 1;
    }
    return value;
}

/**
 * 根据事件坐标计算相对于 canvas 左上角的 CSS 像素坐标。
 *
 * @param event 浏览器输入事件。
 * @param canvas 目标画布。
 */
export function getCanvasPoint(event: PointerEvent, canvas: HTMLCanvasElement): CanvasPoint {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

/**
 * 计算当前画布的 CSS 尺寸。
 *
 * @param options 组件配置。
 */
export function getCanvasCssSize(options: ResolvedSignCanvasOptions): CanvasSize {
    if (options.isFullScreen) {
        return {
            width: window.innerWidth || document.body.clientWidth,
            height: window.innerHeight || document.body.clientHeight
        };
    }
    return {
        width: toNumber(options.canvasWidth, 600),
        height: toNumber(options.canvasHeight, 600)
    };
}

/**
 * 调整 canvas 的真实像素尺寸和 CSS 尺寸。
 *
 * @param canvas 目标画布。
 * @param size CSS 尺寸。
 * @param dpr 设备像素比。
 */
export function resizeCanvas(canvas: HTMLCanvasElement, size: CanvasSize, dpr: number): void {
    canvas.width = Math.floor(size.width * dpr);
    canvas.height = Math.floor(size.height * dpr);
    canvas.style.width = `${size.width}px`;
    canvas.style.height = `${size.height}px`;
}

/**
 * 写入或清理全屏覆盖样式。
 *
 * @param canvas 目标画布。
 * @param options 组件配置。
 */
export function applyCoverStyle(canvas: HTMLCanvasElement, options: ResolvedSignCanvasOptions): void {
    if (options.isFullScreen && options.isFullCover) {
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.margin = '0';
        canvas.style.zIndex = '20001';
        return;
    }
    canvas.style.position = '';
    canvas.style.top = '';
    canvas.style.left = '';
    canvas.style.margin = '';
    canvas.style.zIndex = '';
}

/**
 * 绘制背景色、外框和米字格辅助线。辅助元素不计入“是否签名”状态。
 *
 * @param context 画布上下文。
 * @param canvas 目标画布。
 * @param options 组件配置。
 * @param dpr 设备像素比。
 */
export function drawBoard(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    options: ResolvedSignCanvasOptions,
    dpr: number,
    layers: CanvasBoardLayers = {}
): void {
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (options.bgColor && options.bgColor !== 'none') {
        context.fillStyle = options.bgColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (layers.backgroundImage) {
        drawFittedImage(
            context,
            layers.backgroundImage,
            canvas,
            options.backgroundImageFit,
            normalizeAlpha(options.backgroundImageOpacity)
        );
    }

    if (options.guideEnabled) {
        if (layers.guideImage) {
            drawFittedImage(
                context,
                layers.guideImage,
                canvas,
                options.guideImageFit,
                normalizeAlpha(options.guideImageOpacity)
            );
        } else if (options.guideText) {
            drawGuideText(context, canvas, options);
        }
    }

    if (!options.isShowBorder) {
        context.restore();
        return;
    }

    const borderWidth = toNumber(options.borderWidth, 1) * dpr;
    const inset = borderWidth / 2;
    context.beginPath();
    context.lineWidth = borderWidth;
    context.strokeStyle = options.borderColor;
    context.moveTo(inset, inset);
    context.lineTo(canvas.width - inset, inset);
    context.lineTo(canvas.width - inset, canvas.height - inset);
    context.lineTo(inset, canvas.height - inset);
    context.closePath();
    context.stroke();

    if (!options.isSign) {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(canvas.width, canvas.height);
        context.moveTo(canvas.width, 0);
        context.lineTo(0, canvas.height);
        context.moveTo(canvas.width / 2, 0);
        context.lineTo(canvas.width / 2, canvas.height);
        context.moveTo(0, canvas.height / 2);
        context.lineTo(canvas.width, canvas.height / 2);
        context.stroke();
    }

    context.restore();
}

/**
 * 将 canvas 导出为 base64。JPEG 不支持透明通道，因此导出前会铺底色。
 *
 * @param sourceCanvas 源画布。
 * @param options 组件配置。
 * @param quality 导出质量和缩放比例。
 */
export function exportCanvas(
    sourceCanvas: HTMLCanvasElement,
    options: ResolvedSignCanvasOptions,
    quality = options.quality
): string {
    const imageType = normalizeImageType(options.imgType);
    const ratio = normalizeQuality(quality);
    const targetCanvas = document.createElement('canvas');
    const targetContext = targetCanvas.getContext('2d');

    if (!targetContext) {
        return sourceCanvas.toDataURL(`image/${imageType}`, ratio);
    }

    const normalizedRotate = normalizeRotate(options.exportRotate);
    const shouldSwapSize = normalizedRotate === 90 || normalizedRotate === 270;
    const outputWidth = Math.max(1, Math.floor(sourceCanvas.width * ratio));
    const outputHeight = Math.max(1, Math.floor(sourceCanvas.height * ratio));
    targetCanvas.width = shouldSwapSize ? outputHeight : outputWidth;
    targetCanvas.height = shouldSwapSize ? outputWidth : outputHeight;

    if (imageType === 'jpeg') {
        targetContext.fillStyle = options.bgColor && options.bgColor !== 'none' ? options.bgColor : options.jpegBgColor;
        targetContext.fillRect(0, 0, targetCanvas.width, targetCanvas.height);
    }

    drawRotatedCanvas(targetContext, sourceCanvas, outputWidth, outputHeight, normalizedRotate);
    return targetCanvas.toDataURL(`image/${imageType}`, ratio);
}

/**
 * 加载一张图片，支持 base64、本地地址和允许跨域的远程地址。
 *
 * @param src 图片地址。
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        if (/^https?:\/\//.test(src)) {
            image.crossOrigin = 'anonymous';
        }
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

/**
 * 绘制按指定规则适配到画布内的图片。
 *
 * @param context 画布上下文。
 * @param image 图片对象。
 * @param canvas 目标画布。
 * @param fit 图片适配方式。
 * @param opacity 透明度。
 */
function drawFittedImage(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    fit: SignCanvasImageFit,
    opacity: number
): void {
    const rect = getImageTargetRect(image, canvas, fit);
    context.save();
    context.globalAlpha = opacity;
    context.drawImage(image, rect.x, rect.y, rect.width, rect.height);
    context.restore();
}

/**
 * 计算图片在目标画布中的绘制区域。
 *
 * @param image 图片对象。
 * @param canvas 目标画布。
 * @param fit 图片适配方式。
 */
function getImageTargetRect(image: HTMLImageElement, canvas: HTMLCanvasElement, fit: SignCanvasImageFit): {
    x: number;
    y: number;
    width: number;
    height: number;
} {
    if (fit === 'stretch') {
        return { x: 0, y: 0, width: canvas.width, height: canvas.height };
    }

    const imageWidth = image.naturalWidth || canvas.width;
    const imageHeight = image.naturalHeight || canvas.height;
    const imageRatio = imageWidth / imageHeight;
    const canvasRatio = canvas.width / canvas.height;
    let width = imageWidth;
    let height = imageHeight;

    if (fit === 'center') {
        width = Math.min(imageWidth, canvas.width);
        height = Math.min(imageHeight, canvas.height);
    } else if ((fit === 'cover' && imageRatio > canvasRatio) || (fit === 'contain' && imageRatio < canvasRatio)) {
        height = canvas.height;
        width = height * imageRatio;
    } else {
        width = canvas.width;
        height = width / imageRatio;
    }

    return {
        x: (canvas.width - width) / 2,
        y: (canvas.height - height) / 2,
        width,
        height
    };
}

/**
 * 绘制临摹文字。文字使用真实像素坐标，因此与 DPR 后的画布保持一致。
 *
 * @param context 画布上下文。
 * @param canvas 目标画布。
 * @param options 组件配置。
 */
function drawGuideText(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    options: ResolvedSignCanvasOptions
): void {
    const text = options.guideText.trim();
    if (!text) {
        return;
    }

    context.save();
    context.globalAlpha = normalizeAlpha(options.guideTextOpacity);
    context.fillStyle = options.guideTextColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = options.guideFont;

    const maxWidth = canvas.width * 0.78;
    const metrics = context.measureText(text);
    if (metrics.width > maxWidth && metrics.width > 0) {
        const fontSize = getFontSize(options.guideFont);
        const nextFontSize = Math.max(12, Math.floor(fontSize * maxWidth / metrics.width));
        context.font = options.guideFont.replace(`${fontSize}px`, `${nextFontSize}px`);
    }

    context.fillText(text, canvas.width / 2, canvas.height / 2, maxWidth);
    context.restore();
}

/**
 * 从 CSS font 字符串中提取 px 字号。
 *
 * @param font CSS font 字符串。
 */
function getFontSize(font: string): number {
    const matched = font.match(/(\d+(?:\.\d+)?)px/);
    return matched ? Number(matched[1]) : 96;
}

/**
 * 归一化透明度。
 *
 * @param alpha 透明度。
 */
function normalizeAlpha(alpha: number): number {
    return Math.min(1, Math.max(0, toNumber(alpha, 1)));
}

/**
 * 归一化导出旋转角度。
 *
 * @param rotate 旋转角度。
 */
function normalizeRotate(rotate: number): 0 | 90 | 180 | 270 {
    return rotate === 90 || rotate === 180 || rotate === 270 ? rotate : 0;
}

/**
 * 将源画布按指定角度绘制到目标画布。
 *
 * @param context 目标上下文。
 * @param sourceCanvas 源画布。
 * @param outputWidth 未旋转时的输出宽度。
 * @param outputHeight 未旋转时的输出高度。
 * @param rotate 旋转角度。
 */
function drawRotatedCanvas(
    context: CanvasRenderingContext2D,
    sourceCanvas: HTMLCanvasElement,
    outputWidth: number,
    outputHeight: number,
    rotate: 0 | 90 | 180 | 270
): void {
    if (rotate === 0) {
        context.drawImage(sourceCanvas, 0, 0, outputWidth, outputHeight);
        return;
    }

    context.save();
    if (rotate === 90) {
        context.translate(outputHeight, 0);
        context.rotate(Math.PI / 2);
    } else if (rotate === 180) {
        context.translate(outputWidth, outputHeight);
        context.rotate(Math.PI);
    } else {
        context.translate(0, outputWidth);
        context.rotate(-Math.PI / 2);
    }
    context.drawImage(sourceCanvas, 0, 0, outputWidth, outputHeight);
    context.restore();
}
