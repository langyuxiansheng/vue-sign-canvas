import { type SignCanvasExpose, type SignCanvasProps } from './useSignCanvas';
declare const __VLS_export: import("vue").DefineComponent<SignCanvasProps, SignCanvasExpose, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    end: (point: import("./utils/canvas").CanvasPoint) => any;
    start: (point: import("./utils/canvas").CanvasPoint) => any;
    "update:modelValue": (value: string | null) => any;
    confirm: (value: string | null) => any;
    change: (status: import("./useSignCanvas").SignatureStatus) => any;
    clear: () => any;
    undo: (status: import("./useSignCanvas").SignatureStatus) => any;
    redo: (status: import("./useSignCanvas").SignatureStatus) => any;
}, string, import("vue").PublicProps, Readonly<SignCanvasProps> & Readonly<{
    onEnd?: ((point: import("./utils/canvas").CanvasPoint) => any) | undefined;
    onStart?: ((point: import("./utils/canvas").CanvasPoint) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
    onConfirm?: ((value: string | null) => any) | undefined;
    onChange?: ((status: import("./useSignCanvas").SignatureStatus) => any) | undefined;
    onClear?: (() => any) | undefined;
    onUndo?: ((status: import("./useSignCanvas").SignatureStatus) => any) | undefined;
    onRedo?: ((status: import("./useSignCanvas").SignatureStatus) => any) | undefined;
}>, {
    options: import("./constants").SignCanvasOptions | null;
    modelValue: string | null;
    image: string | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
//# sourceMappingURL=index.vue.d.ts.map