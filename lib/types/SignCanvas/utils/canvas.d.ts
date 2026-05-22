import type { ResolvedSignCanvasOptions } from '../constants';
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
export declare function toNumber(value: unknown, fallback: number): number;
/**
 * 归一化导出图片类型，兼容 jpg 别名。
 *
 * @param type 用户传入的图片类型。
 */
export declare function normalizeImageType(type: string): 'png' | 'jpeg' | 'webp';
/**
 * 限制图片质量范围。这里的 quality 同时承担导出质量和等比缩放比例。
 *
 * @param quality 期望质量。
 */
export declare function normalizeQuality(quality: number): number;
/**
 * 根据事件坐标计算相对于 canvas 左上角的 CSS 像素坐标。
 *
 * @param event 浏览器输入事件。
 * @param canvas 目标画布。
 */
export declare function getCanvasPoint(event: PointerEvent, canvas: HTMLCanvasElement): CanvasPoint;
/**
 * 计算当前画布的 CSS 尺寸。
 *
 * @param options 组件配置。
 */
export declare function getCanvasCssSize(options: ResolvedSignCanvasOptions): CanvasSize;
/**
 * 调整 canvas 的真实像素尺寸和 CSS 尺寸。
 *
 * @param canvas 目标画布。
 * @param size CSS 尺寸。
 * @param dpr 设备像素比。
 */
export declare function resizeCanvas(canvas: HTMLCanvasElement, size: CanvasSize, dpr: number): void;
/**
 * 写入或清理全屏覆盖样式。
 *
 * @param canvas 目标画布。
 * @param options 组件配置。
 */
export declare function applyCoverStyle(canvas: HTMLCanvasElement, options: ResolvedSignCanvasOptions): void;
/**
 * 绘制背景色、外框和米字格辅助线。辅助元素不计入“是否签名”状态。
 *
 * @param context 画布上下文。
 * @param canvas 目标画布。
 * @param options 组件配置。
 * @param dpr 设备像素比。
 */
export declare function drawBoard(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, options: ResolvedSignCanvasOptions, dpr: number, layers?: CanvasBoardLayers): void;
/**
 * 将 canvas 导出为 base64。JPEG 不支持透明通道，因此导出前会铺底色。
 *
 * @param sourceCanvas 源画布。
 * @param options 组件配置。
 * @param quality 导出质量和缩放比例。
 */
export declare function exportCanvas(sourceCanvas: HTMLCanvasElement, options: ResolvedSignCanvasOptions, quality?: number): string;
/**
 * 加载一张图片，支持 base64、本地地址和允许跨域的远程地址。
 *
 * @param src 图片地址。
 */
export declare function loadImage(src: string): Promise<HTMLImageElement>;
//# sourceMappingURL=canvas.d.ts.map