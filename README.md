# sign-canvas

基于 Vue 3 + TypeScript 的手写签名板组件，支持 PC / 移动端指针输入、高清绘制、空签名判断、图片回显、只读模式、撤销重做、描写临摹、自定义背景图合成、导出旋转、JPEG 白底导出和类型提示。

## 版本说明

`2.0.0` 是一次完整重构升级，不再兼容 `1.x` 的 Vue 2 项目和旧构建体系。

- 新版本：Vue 3 + TypeScript + Vite。
- 旧版本：Vue 2 + Vue CLI，继续使用 `1.x`。
- 如果你的项目仍是 Vue 2，请安装旧版本：

```bash
npm i sign-canvas@1
```

也可以切换到仓库的 `1.x` 分支查看旧版源码和文档。

## 兼容范围

`sign-canvas@2` 面向 Vue 3 Web/H5 场景，依赖浏览器 DOM Canvas 和 Pointer Events。当前主包不承诺兼容 uni-app 小程序端、App 端或其他非标准 DOM 运行时。

如果你的 uni-app 项目只运行 H5 端，可以自行验证使用；如果目标包含小程序或 App，建议单独封装适配层，或后续新建独立的 uni-app 专用包，而不是在当前 Web 主包里混入平台分支。

## 安装

```bash
npm i sign-canvas
```

## 使用

```vue
<template>
  <SignCanvas
    ref="signCanvasRef"
    v-model="signature"
    :options="options"
    @change="status = $event"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SignCanvas, {
  type SignCanvasExpose,
  type SignCanvasOptions,
  type SignatureStatus
} from 'sign-canvas';

const signature = ref<string | null>(null);
const signCanvasRef = ref<SignCanvasExpose | null>(null);
const status = ref<SignatureStatus>({
  empty: true,
  strokes: 0,
  hasImage: false,
  canUndo: false,
  canRedo: false,
  history: 0,
  redo: 0
});

const options: SignCanvasOptions = {
  canvasWidth: 600,
  canvasHeight: 360,
  isDpr: true,
  isSign: true,
  writeColor: '#101010',
  bgColor: '#fff',
  imgType: 'png'
};

function submit() {
  if (signCanvasRef.value?.isEmpty()) {
    return;
  }
  const image = signCanvasRef.value?.toDataURL();
}
</script>
```

## 全局注册

```ts
import { createApp } from 'vue';
import SignCanvas from 'sign-canvas';
import App from './App.vue';

createApp(App).use(SignCanvas).mount('#app');
```

## Options

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---:|---|
| `canvasWidth` | `number` | `600` | 非全屏模式下的 CSS 宽度 |
| `canvasHeight` | `number` | `600` | 非全屏模式下的 CSS 高度 |
| `isFullScreen` | `boolean` | `false` | 使用浏览器视口尺寸 |
| `isFullCover` | `boolean` | `false` | 全屏时 fixed 覆盖页面 |
| `isDpr` | `boolean` | `false` | 按设备像素比绘制，改善高清屏模糊 |
| `isSign` | `boolean` | `false` | 签名模式使用固定线宽；关闭后使用动态线宽 |
| `isShowBorder` | `boolean` | `true` | 绘制外框和辅助线 |
| `bgColor` | `string` | `none` | 导出图片背景色，`none` 表示透明 |
| `backgroundImage` | `string` | `''` | 自定义背景图地址，支持 base64、本地地址和允许 CORS 的远程图片 |
| `backgroundImageFit` | `contain \| cover \| stretch \| center` | `cover` | 背景图适配方式 |
| `backgroundImageOpacity` | `number` | `1` | 背景图透明度，范围 `0 - 1` |
| `borderWidth` | `number` | `1` | 边框和辅助线宽度 |
| `borderColor` | `string` | `#ff787f` | 边框和辅助线颜色 |
| `writeWidth` | `number` | `5` | 签名模式画笔宽度 |
| `maxWriteWidth` | `number` | `30` | 写字模式最大线宽 |
| `minWriteWidth` | `number` | `5` | 写字模式最小线宽 |
| `writeColor` | `string` | `#101010` | 画笔颜色 |
| `lineCap` | `CanvasLineCap` | `round` | 线帽 |
| `lineJoin` | `CanvasLineJoin` | `round` | 连接样式 |
| `imgType` | `png \| jpeg \| jpg \| webp` | `png` | 导出图片类型 |
| `quality` | `number` | `1` | 导出质量和缩放比例，范围 `0.1 - 1` |
| `jpegBgColor` | `string` | `#fff` | JPEG 透明区域底色，避免黑底 |
| `exportRotate` | `0 \| 90 \| 180 \| 270` | `0` | 导出图片旋转角度 |
| `enableResize` | `boolean` | `true` | 窗口变化时自动重绘 |
| `disabled` | `boolean` | `false` | 禁用绘制 |
| `readonly` | `boolean` | `false` | 只读展示 |
| `allowEmpty` | `boolean` | `false` | 是否允许空画布导出 base64 |
| `enableHistory` | `boolean` | `true` | 是否记录笔迹历史，用于撤销和重做 |
| `enableShortcuts` | `boolean` | `true` | 是否启用 `Ctrl+Z` / `Ctrl+Y` / `Ctrl+Shift+Z` |
| `maxHistory` | `number` | `100` | 最多保留多少次下笔历史 |
| `guideEnabled` | `boolean` | `false` | 是否开启描写/临摹引导层 |
| `guideText` | `string` | `''` | 临摹文字 |
| `guideFont` | `string` | `700 96px serif` | 临摹文字字体，使用 Canvas font 语法 |
| `guideTextColor` | `string` | `#101010` | 临摹文字颜色 |
| `guideTextOpacity` | `number` | `0.16` | 临摹文字透明度，范围 `0 - 1` |
| `guideImage` | `string` | `''` | 临摹图片地址；配置后优先于 `guideText` |
| `guideImageFit` | `contain \| cover \| stretch \| center` | `contain` | 临摹图片适配方式 |
| `guideImageOpacity` | `number` | `0.24` | 临摹图片透明度，范围 `0 - 1` |

## 图层和临摹

`backgroundImage` 和 `guideEnabled` 都属于辅助图层：它们会显示在画布里，也会合成进导出的图片，但不会计入 `isEmpty()`、撤销历史或 `strokes` 数量。也就是说，用户还没有真正下笔时，带背景图或临摹字的画布仍然会被判断为空签名。

```ts
const options: SignCanvasOptions = {
  canvasWidth: 720,
  canvasHeight: 360,
  bgColor: '#fff',
  backgroundImage: contractImageBase64,
  backgroundImageFit: 'cover',
  guideEnabled: true,
  guideText: '张三',
  guideFont: '700 96px serif',
  guideTextColor: '#101010',
  guideTextOpacity: 0.16
};
```

如果需要用图片作为临摹稿，配置 `guideImage` 即可。`guideImage` 的优先级高于 `guideText`。

```ts
const options: SignCanvasOptions = {
  guideEnabled: true,
  guideImage: '/trace-template.png',
  guideImageFit: 'contain',
  guideImageOpacity: 0.22
};
```

## 导出旋转

`exportRotate` 只影响 `toDataURL()`、`saveAsImg()`、`downloadSignImg()` 和自动 `v-model` 输出的图片方向，不改变页面上正在绘制的画布方向。

```ts
const options: SignCanvasOptions = {
  imgType: 'jpeg',
  jpegBgColor: '#fff',
  exportRotate: 90
};
```

## 实例方法

通过组件 `ref` 调用：

```ts
signCanvasRef.value?.clear();
signCanvasRef.value?.toDataURL();
signCanvasRef.value?.fromDataURL(base64);
signCanvasRef.value?.undo();
signCanvasRef.value?.redo();
```

| 方法 | 返回值 | 说明 |
|---|---|---|
| `clear(payload?)` | `void` | 清空画布 |
| `canvasClear(payload?)` | `void` | 旧版方法名，等同于 `clear` |
| `toDataURL(payload?)` | `string \| null` | 导出图片；空画布默认返回 `null` |
| `saveAsImg(payload?)` | `string \| null` | 旧版方法名，等同于 `toDataURL` |
| `downloadSignImg(name?)` | `string \| null` | 下载当前签名图 |
| `dealImage(quality?)` | `string \| null` | 按质量导出压缩图 |
| `fromDataURL(dataURL, payload?)` | `Promise<string \| null>` | 回显已有签名，之后可继续绘制 |
| `undo()` | `boolean` | 撤销最近一次下笔 |
| `redo()` | `boolean` | 重做最近一次撤销 |
| `canUndo()` | `boolean` | 是否可以撤销 |
| `canRedo()` | `boolean` | 是否可以重做 |
| `getStrokes()` | `SignStroke[]` | 获取当前笔迹快照 |
| `isEmpty()` | `boolean` | 判断是否没有真实签名内容 |
| `getSignatureStatus()` | `SignatureStatus` | 返回 `{ empty, strokes, hasImage, canUndo, canRedo, history, redo }` |
| `redraw()` | `void` | 手动重绘 |
| `initCanvas()` | `void` | 手动重新初始化尺寸 |

## 撤销和重做

组件会按“每次下笔”记录历史，而不是按每个线段记录历史。因此用户一次连续书写会作为一个整体被撤销。

- `Ctrl+Z` / `Command+Z`：撤销
- `Ctrl+Y` / `Command+Y`：重做
- `Ctrl+Shift+Z` / `Command+Shift+Z`：重做

输入框、文本域、下拉框和富文本区域内不会触发签名板快捷键，避免抢占表单自身的撤销行为。
页面存在多个签名板时，快捷键只作用于当前获得焦点的画布；用户下笔时组件会自动聚焦当前画布。

## 事件

| 事件 | 参数 | 说明 |
|---|---|---|
| `update:modelValue` | `string \| null` | Vue 3 `v-model` 更新 |
| `confirm` | `string \| null` | 兼容旧版事件 |
| `start` | `{ x, y }` | 开始绘制 |
| `end` | `{ x, y }` | 结束绘制 |
| `change` | `SignatureStatus` | 签名状态变化 |
| `clear` | 无 | 清空画布 |
| `undo` | `SignatureStatus` | 撤销成功 |
| `redo` | `SignatureStatus` | 重做成功 |

## 本地开发

```bash
npm install
npm run dev
npm run type-check
npm run lib
```

`npm run lib` 会输出：

- `lib/sign-canvas.js`
- `lib/sign-canvas.umd.cjs`
- `lib/sign-canvas.css`
- `lib/types/**/*.d.ts`

## v2 变更

- 这是不兼容旧版的重构升级，Vue 2 项目请继续使用 `sign-canvas@1` 或 `1.x` 分支。
- 升级到 Vue 3 + TypeScript + Vite。
- 使用 Pointer Events 统一 PC 和移动端输入，减少触点偏移问题。
- `options` 改变时保留已有笔迹，切换颜色、线宽、DPR 不再清空画布。
- 增加 `isEmpty()` / `getSignatureStatus()`，解决必填签名校验。
- 增加 `fromDataURL()`，支持已有签名回显和继续编辑。
- 增加 `readonly` / `disabled`。
- 增加笔迹历史、撤销、重做和快捷键支持。
- 增加自定义背景图合成，背景图会参与导出但不算真实签名。
- 增加描写/临摹引导层，支持文字临摹和图片临摹，可通过 `guideEnabled` 开关控制。
- 增加导出图片旋转，支持 `0 / 90 / 180 / 270` 度。
- JPEG 导出默认铺白底，避免透明区域变黑。
- 包内输出 `.d.ts`，支持 TS 项目类型提示。
