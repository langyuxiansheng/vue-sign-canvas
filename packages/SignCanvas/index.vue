<template>
    <canvas
        ref="canvasRef"
        class="app-sign-canvas"
        :class="{ 'is-disabled': isDisabled }"
        :aria-disabled="isDisabled"
        tabindex="0"
        @pointerdown.prevent.stop="handlePointerDown"
        @pointermove.prevent.stop="handlePointerMove"
        @pointerup.prevent.stop="handlePointerUp"
        @pointercancel.prevent.stop="handlePointerCancel"
        @pointerleave.prevent.stop="handlePointerCancel"
    >
        您的浏览器不支持canvas技术,请升级浏览器!
    </canvas>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSignCanvas, type SignCanvasEmits, type SignCanvasExpose, type SignCanvasProps } from './useSignCanvas';

defineOptions({
    name: 'SignCanvas'
});

const props = withDefaults(defineProps<SignCanvasProps>(), {
    modelValue: null,
    image: null,
    options: null
});

const emit = defineEmits<SignCanvasEmits>();
const canvasRef = ref<HTMLCanvasElement | null>(null);
const signCanvas = useSignCanvas({ canvasRef, props, emit });

const {
    isDisabled,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
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
    isEmpty,
    getSignatureStatus,
    redraw,
    initCanvas
} = signCanvas;

/**
 * 暴露给父组件 ref 调用的稳定 API。保留旧版本方法名，同时提供 Vue3 更语义化的方法。
 */
defineExpose<SignCanvasExpose>({
    clear,
    canvasClear,
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
    isEmpty,
    getSignatureStatus,
    redraw,
    initCanvas
});
</script>

<style scoped>
.app-sign-canvas {
    display: block;
    touch-action: none;
    user-select: none;
}

.app-sign-canvas.is-disabled {
    cursor: not-allowed;
}
</style>
