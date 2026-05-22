import type { App } from 'vue';
import SignCanvas from './SignCanvas/index.vue';

export type {
    ClearPayload,
    ExportPayload,
    FromDataURLPayload,
    SignCanvasExpose,
    SignCanvasProps,
    SignatureStatus,
    SignStroke
} from './SignCanvas/useSignCanvas';
export type { SignCanvasExportRotate, SignCanvasImageFit, SignCanvasImageType, SignCanvasOptions } from './SignCanvas/constants';

/**
 * Vue 插件安装入口，支持 `app.use(SignCanvas)`。
 *
 * @param app Vue 应用实例。
 */
SignCanvas.install = (app: App): void => {
    app.component('SignCanvas', SignCanvas);
};

export { SignCanvas };
export default SignCanvas;
