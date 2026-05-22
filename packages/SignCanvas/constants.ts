/**
 * 签名板导出的图片类型。
 */
export type SignCanvasImageType = 'png' | 'jpeg' | 'jpg' | 'webp';

/**
 * 图片在画布中的适配方式。
 */
export type SignCanvasImageFit = 'contain' | 'cover' | 'stretch' | 'center';

/**
 * 导出图片旋转角度。
 */
export type SignCanvasExportRotate = 0 | 90 | 180 | 270;

/**
 * 签名板配置项。
 */
export interface SignCanvasOptions {
    /** 是否使用浏览器视口尺寸作为画布尺寸。 */
    isFullScreen?: boolean;
    /** 全屏时是否使用 fixed 定位覆盖页面。 */
    isFullCover?: boolean;
    /** 是否按 devicePixelRatio 放大真实画布，提升高分屏清晰度。 */
    isDpr?: boolean;
    /** 写字模式的上一段轨迹宽度，用于平滑计算。 */
    lastWriteWidth?: number;
    /** 画笔线帽。 */
    lineCap?: CanvasLineCap;
    /** 画笔连接样式。 */
    lineJoin?: CanvasLineJoin;
    /** 非全屏模式下的 CSS 宽度。 */
    canvasWidth?: number;
    /** 非全屏模式下的 CSS 高度。 */
    canvasHeight?: number;
    /** 是否绘制外框和辅助线。 */
    isShowBorder?: boolean;
    /** 导出时一起绘制的背景色，`none` 表示透明背景。 */
    bgColor?: string;
    /** 自定义背景图地址，支持 base64、本地地址和允许 CORS 的远程图片。 */
    backgroundImage?: string;
    /** 自定义背景图适配方式。 */
    backgroundImageFit?: SignCanvasImageFit;
    /** 自定义背景图透明度。 */
    backgroundImageOpacity?: number;
    /** 边框和辅助线宽度。 */
    borderWidth?: number;
    /** 边框和辅助线颜色。 */
    borderColor?: string;
    /** 签名模式固定画笔宽度。 */
    writeWidth?: number;
    /** 写字模式最大画笔宽度。 */
    maxWriteWidth?: number;
    /** 写字模式最小画笔宽度。 */
    minWriteWidth?: number;
    /** 画笔颜色。 */
    writeColor?: string;
    /** 是否使用签名模式；签名模式使用固定线宽，写字模式使用动态线宽。 */
    isSign?: boolean;
    /** 导出图片类型。 */
    imgType?: SignCanvasImageType;
    /** 导出图片质量和缩放系数，范围 0.1 - 1。 */
    quality?: number;
    /** JPEG 导出时透明区域使用的底色。 */
    jpegBgColor?: string;
    /** 导出图片旋转角度。 */
    exportRotate?: SignCanvasExportRotate;
    /** 是否监听窗口尺寸变化并自动重绘。 */
    enableResize?: boolean;
    /** 是否禁用绘制。 */
    disabled?: boolean;
    /** 是否只读展示。 */
    readonly?: boolean;
    /** 是否允许空画布导出 base64。 */
    allowEmpty?: boolean;
    /** 是否记录笔迹历史，用于撤销和重做。 */
    enableHistory?: boolean;
    /** 是否启用 Ctrl+Z / Ctrl+Y / Ctrl+Shift+Z 快捷键。 */
    enableShortcuts?: boolean;
    /** 最多保留多少次下笔历史。 */
    maxHistory?: number;
    /** 是否开启描写/临摹引导层。 */
    guideEnabled?: boolean;
    /** 临摹文字。 */
    guideText?: string;
    /** 临摹文字字体。 */
    guideFont?: string;
    /** 临摹文字颜色。 */
    guideTextColor?: string;
    /** 临摹文字透明度。 */
    guideTextOpacity?: number;
    /** 临摹图片地址，优先级高于 guideText。 */
    guideImage?: string;
    /** 临摹图片适配方式。 */
    guideImageFit?: SignCanvasImageFit;
    /** 临摹图片透明度。 */
    guideImageOpacity?: number;
}

/**
 * 组件内部使用的完整配置。业务侧 options 会覆盖这些值，但不会覆盖运行时笔迹状态。
 */
export type ResolvedSignCanvasOptions = Required<SignCanvasOptions>;

/**
 * 签名板默认配置。
 */
export const DEFAULT_OPTIONS: ResolvedSignCanvasOptions = {
    isFullScreen: false,
    isFullCover: false,
    isDpr: false,
    lastWriteWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
    canvasWidth: 600,
    canvasHeight: 600,
    isShowBorder: true,
    bgColor: 'none',
    backgroundImage: '',
    backgroundImageFit: 'cover',
    backgroundImageOpacity: 1,
    borderWidth: 1,
    borderColor: '#ff787f',
    writeWidth: 5,
    maxWriteWidth: 30,
    minWriteWidth: 5,
    writeColor: '#101010',
    isSign: false,
    imgType: 'png',
    quality: 1,
    jpegBgColor: '#fff',
    exportRotate: 0,
    enableResize: true,
    disabled: false,
    readonly: false,
    allowEmpty: false,
    enableHistory: true,
    enableShortcuts: true,
    maxHistory: 100,
    guideEnabled: false,
    guideText: '',
    guideFont: '700 96px serif',
    guideTextColor: '#101010',
    guideTextOpacity: 0.16,
    guideImage: '',
    guideImageFit: 'contain',
    guideImageOpacity: 0.24
};

/**
 * 空画布导出的占位值。组件不会把它当图片对外展示，只用于内部比对。
 */
export const EMPTY_IMAGE = null;
