import { type Ref } from 'vue';
import { type ResolvedSignCanvasOptions, type SignCanvasOptions } from './constants';
import { type CanvasPoint } from './utils/canvas';
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
export type ClearPayload = boolean | {
    emit?: boolean;
};
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
export declare function useSignCanvas(params: {
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
};
//# sourceMappingURL=useSignCanvas.d.ts.map