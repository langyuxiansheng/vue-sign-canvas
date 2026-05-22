<template>
    <main class="demo-page">
        <header class="topbar">
            <div>
                <p class="eyebrow">sign-canvas v2</p>
                <h1>Vue 3 签名板工作台</h1>
            </div>
            <div class="top-actions">
                <button type="button" class="secondary" @click="clearAll">清空</button>
                <button type="button" class="primary" @click="saveAll">保存双端</button>
            </div>
        </header>

        <section class="summary-grid">
            <article class="summary-item">
                <span>桌面状态</span>
                <strong>{{ desktopStatus.empty ? '未签名' : '已签名' }}</strong>
            </article>
            <article class="summary-item">
                <span>移动端状态</span>
                <strong>{{ mobileStatus.empty ? '未签名' : '已签名' }}</strong>
            </article>
            <article class="summary-item">
                <span>导出格式</span>
                <strong>{{ options.imgType }} / {{ options.exportRotate }}°</strong>
            </article>
            <article class="summary-item">
                <span>画笔</span>
                <strong>{{ options.writeWidth }}px</strong>
            </article>
            <article class="summary-item">
                <span>历史记录</span>
                <strong>{{ desktopStatus.history + mobileStatus.history }}</strong>
            </article>
            <article class="summary-item">
                <span>临摹层</span>
                <strong>{{ options.guideEnabled ? '开启' : '关闭' }}</strong>
            </article>
        </section>

        <section class="preview-grid">
            <article class="preview-panel desktop-panel">
                <div class="panel-head">
                    <div>
                        <h2>桌面预览</h2>
                        <p>{{ desktopOptions.canvasWidth }} x {{ desktopOptions.canvasHeight }}</p>
                    </div>
                    <div class="panel-actions">
                        <button type="button" :disabled="!desktopStatus.canUndo" @click="desktopRef?.undo()">撤销</button>
                        <button type="button" :disabled="!desktopStatus.canRedo" @click="desktopRef?.redo()">重做</button>
                        <button type="button" @click="desktopRef?.clear()">清空</button>
                        <button type="button" @click="desktopRef?.downloadSignImg('desktop-sign')">下载</button>
                    </div>
                </div>
                <div class="desktop-stage">
                    <SignCanvas
                        ref="desktopRef"
                        v-model="desktopImage"
                        class="sign-canvas"
                        :options="desktopOptions"
                        @change="desktopStatus = $event"
                    />
                </div>
                <div class="result-strip">
                    <div class="thumb">
                        <img v-if="desktopImage" :src="desktopImage" alt="桌面签名预览">
                        <span v-else>无预览</span>
                    </div>
                    <dl>
                        <div>
                            <dt>笔迹段数</dt>
                            <dd>{{ desktopStatus.strokes }}</dd>
                        </div>
                        <div>
                            <dt>回显图片</dt>
                            <dd>{{ desktopStatus.hasImage ? '有' : '无' }}</dd>
                        </div>
                        <div>
                            <dt>历史/重做</dt>
                            <dd>{{ desktopStatus.history }} / {{ desktopStatus.redo }}</dd>
                        </div>
                    </dl>
                </div>
            </article>

            <article class="preview-panel mobile-panel">
                <div class="panel-head">
                    <div>
                        <h2>移动端预览</h2>
                        <p>{{ mobileOptions.canvasWidth }} x {{ mobileOptions.canvasHeight }}</p>
                    </div>
                    <div class="panel-actions">
                        <button type="button" :disabled="!mobileStatus.canUndo" @click="mobileRef?.undo()">撤销</button>
                        <button type="button" :disabled="!mobileStatus.canRedo" @click="mobileRef?.redo()">重做</button>
                        <button type="button" @click="mobileRef?.clear()">清空</button>
                        <button type="button" @click="mobileRef?.downloadSignImg('mobile-sign')">下载</button>
                    </div>
                </div>
                <div class="phone-shell">
                    <div class="phone-bezel">
                        <div class="phone-status">
                            <span>9:41</span>
                            <b></b>
                            <i></i>
                        </div>
                        <div class="phone-screen">
                            <SignCanvas
                                ref="mobileRef"
                                v-model="mobileImage"
                                class="sign-canvas mobile-canvas"
                                :options="mobileOptions"
                                @change="mobileStatus = $event"
                            />
                        </div>
                        <div class="home-indicator"></div>
                    </div>
                </div>
                <div class="result-strip compact">
                    <div class="thumb">
                        <img v-if="mobileImage" :src="mobileImage" alt="移动端签名预览">
                        <span v-else>无预览</span>
                    </div>
                    <dl>
                        <div>
                            <dt>笔迹段数</dt>
                            <dd>{{ mobileStatus.strokes }}</dd>
                        </div>
                        <div>
                            <dt>回显图片</dt>
                            <dd>{{ mobileStatus.hasImage ? '有' : '无' }}</dd>
                        </div>
                        <div>
                            <dt>历史/重做</dt>
                            <dd>{{ mobileStatus.history }} / {{ mobileStatus.redo }}</dd>
                        </div>
                    </dl>
                </div>
            </article>
        </section>

        <section class="settings-shell">
            <div class="settings-head">
                <div>
                    <h2>参数控制</h2>
                    <p>所有参数即时作用到两个预览画布</p>
                </div>
                <button type="button" class="secondary" @click="resetOptions">重置参数</button>
            </div>

            <div class="settings-grid">
                <fieldset>
                    <legend>画布</legend>
                    <label>
                        宽度
                        <input v-model.number="options.canvasWidth" type="number" min="240" max="1200">
                    </label>
                    <label>
                        高度
                        <input v-model.number="options.canvasHeight" type="number" min="160" max="800">
                    </label>
                    <label>
                        背景色
                        <input v-model="options.bgColor" type="color">
                    </label>
                    <label>
                        高清绘制
                        <input v-model="options.isDpr" type="checkbox">
                    </label>
                    <label>
                        显示辅助线
                        <input v-model="options.isShowBorder" type="checkbox">
                    </label>
                </fieldset>

                <fieldset>
                    <legend>画笔</legend>
                    <label>
                        颜色
                        <input v-model="options.writeColor" type="color">
                    </label>
                    <label>
                        签名模式
                        <input v-model="options.isSign" type="checkbox">
                    </label>
                    <label>
                        固定宽度
                        <input v-model.number="options.writeWidth" type="range" min="1" max="30">
                    </label>
                    <label>
                        最小线宽
                        <input v-model.number="options.minWriteWidth" type="range" min="1" max="20">
                    </label>
                    <label>
                        最大线宽
                        <input v-model.number="options.maxWriteWidth" type="range" min="2" max="40">
                    </label>
                    <label>
                        线帽
                        <select v-model="options.lineCap">
                            <option value="round">round</option>
                            <option value="butt">butt</option>
                            <option value="square">square</option>
                        </select>
                    </label>
                    <label>
                        连接
                        <select v-model="options.lineJoin">
                            <option value="round">round</option>
                            <option value="bevel">bevel</option>
                            <option value="miter">miter</option>
                        </select>
                    </label>
                </fieldset>

                <fieldset>
                    <legend>背景图</legend>
                    <label class="wide-control">
                        图片地址 / Base64
                        <input v-model="options.backgroundImage" type="url" placeholder="https:// 或 data:image/...">
                    </label>
                    <label>
                        适配
                        <select v-model="options.backgroundImageFit">
                            <option value="cover">cover</option>
                            <option value="contain">contain</option>
                            <option value="stretch">stretch</option>
                            <option value="center">center</option>
                        </select>
                    </label>
                    <label>
                        透明度
                        <input v-model.number="options.backgroundImageOpacity" type="range" min="0" max="1" step="0.05">
                    </label>
                </fieldset>

                <fieldset>
                    <legend>边框</legend>
                    <label>
                        边框颜色
                        <input v-model="options.borderColor" type="color">
                    </label>
                    <label>
                        边框宽度
                        <input v-model.number="options.borderWidth" type="range" min="0" max="8">
                    </label>
                </fieldset>

                <fieldset>
                    <legend>描写/临摹</legend>
                    <label>
                        开启
                        <input v-model="options.guideEnabled" type="checkbox">
                    </label>
                    <label class="wide-control">
                        临摹文字
                        <input v-model="options.guideText" type="text" placeholder="例如：张三">
                    </label>
                    <label class="wide-control">
                        字体
                        <input v-model="options.guideFont" type="text" placeholder="700 96px serif">
                    </label>
                    <label>
                        文字颜色
                        <input v-model="options.guideTextColor" type="color">
                    </label>
                    <label>
                        文字透明度
                        <input v-model.number="options.guideTextOpacity" type="range" min="0" max="1" step="0.05">
                    </label>
                    <label class="wide-control">
                        临摹图片
                        <input v-model="options.guideImage" type="url" placeholder="留空时使用临摹文字">
                    </label>
                    <label>
                        图片适配
                        <select v-model="options.guideImageFit">
                            <option value="contain">contain</option>
                            <option value="cover">cover</option>
                            <option value="stretch">stretch</option>
                            <option value="center">center</option>
                        </select>
                    </label>
                    <label>
                        图片透明度
                        <input v-model.number="options.guideImageOpacity" type="range" min="0" max="1" step="0.05">
                    </label>
                </fieldset>

                <fieldset>
                    <legend>导出</legend>
                    <label>
                        图片格式
                        <select v-model="options.imgType">
                            <option value="png">png</option>
                            <option value="jpeg">jpeg</option>
                            <option value="webp">webp</option>
                        </select>
                    </label>
                    <label>
                        质量
                        <input v-model.number="options.quality" type="range" min="0.1" max="1" step="0.1">
                    </label>
                    <label>
                        JPEG 底色
                        <input v-model="options.jpegBgColor" type="color">
                    </label>
                    <label>
                        导出旋转
                        <select v-model.number="options.exportRotate">
                            <option :value="0">0°</option>
                            <option :value="90">90°</option>
                            <option :value="180">180°</option>
                            <option :value="270">270°</option>
                        </select>
                    </label>
                    <label>
                        允许空导出
                        <input v-model="options.allowEmpty" type="checkbox">
                    </label>
                </fieldset>

                <fieldset>
                    <legend>行为</legend>
                    <label>
                        自动重绘
                        <input v-model="options.enableResize" type="checkbox">
                    </label>
                    <label>
                        禁用绘制
                        <input v-model="options.disabled" type="checkbox">
                    </label>
                    <label>
                        只读
                        <input v-model="options.readonly" type="checkbox">
                    </label>
                    <label>
                        记录轨迹
                        <input v-model="options.enableHistory" type="checkbox">
                    </label>
                    <label>
                        快捷键
                        <input v-model="options.enableShortcuts" type="checkbox">
                    </label>
                    <label>
                        历史上限
                        <input v-model.number="options.maxHistory" type="number" min="1" max="500">
                    </label>
                </fieldset>
            </div>
        </section>

        <section class="output-shell">
            <div class="settings-head">
                <div>
                    <h2>导出格式预览</h2>
                    <p>保存后可检查 base64 类型、体积和最终像素</p>
                </div>
                <button type="button" class="secondary" @click="saveAll">刷新输出</button>
            </div>
            <div class="output-grid">
                <article v-for="item in outputItems" :key="item.name" class="output-card">
                    <div class="output-preview">
                        <img v-if="item.src" :src="item.src" :alt="`${item.name}导出预览`">
                        <span v-else>点击保存后生成</span>
                    </div>
                    <div class="output-meta">
                        <div>
                            <span>来源</span>
                            <strong>{{ item.name }}</strong>
                        </div>
                        <div>
                            <span>MIME</span>
                            <strong>{{ item.mime }}</strong>
                        </div>
                        <div>
                            <span>体积</span>
                            <strong>{{ item.size }}</strong>
                        </div>
                        <div>
                            <span>像素</span>
                            <strong>{{ item.dimension }}</strong>
                        </div>
                    </div>
                    <textarea readonly :value="item.preview"></textarea>
                </article>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import SignCanvas, { type SignCanvasExpose, type SignCanvasOptions, type SignatureStatus } from '../packages';

const desktopRef = ref<SignCanvasExpose | null>(null);
const mobileRef = ref<SignCanvasExpose | null>(null);
const desktopImage = ref<string | null>(null);
const mobileImage = ref<string | null>(null);
const emptyStatus: SignatureStatus = {
    empty: true,
    strokes: 0,
    hasImage: false,
    canUndo: false,
    canRedo: false,
    history: 0,
    redo: 0
};
const desktopStatus = ref<SignatureStatus>({ ...emptyStatus });
const mobileStatus = ref<SignatureStatus>({ ...emptyStatus });

const defaultOptions: Required<SignCanvasOptions> = {
    isFullScreen: false,
    isFullCover: false,
    isDpr: true,
    lastWriteWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
    canvasWidth: 720,
    canvasHeight: 360,
    isShowBorder: true,
    bgColor: '#fdfdfb',
    backgroundImage: '',
    backgroundImageFit: 'cover',
    backgroundImageOpacity: 1,
    borderWidth: 1,
    borderColor: '#e05f6f',
    writeWidth: 5,
    maxWriteWidth: 26,
    minWriteWidth: 4,
    writeColor: '#18212f',
    isSign: true,
    imgType: 'png',
    quality: 1,
    jpegBgColor: '#fdfdfb',
    exportRotate: 0,
    enableResize: false,
    disabled: false,
    readonly: false,
    allowEmpty: false,
    enableHistory: true,
    enableShortcuts: true,
    maxHistory: 100,
    guideEnabled: true,
    guideText: '签名',
    guideFont: '700 96px serif',
    guideTextColor: '#18212f',
    guideTextOpacity: 0.14,
    guideImage: '',
    guideImageFit: 'contain',
    guideImageOpacity: 0.24
};

const options = reactive<Required<SignCanvasOptions>>({ ...defaultOptions });

const desktopOptions = computed<SignCanvasOptions>(() => ({
    ...options,
    canvasWidth: options.canvasWidth,
    canvasHeight: options.canvasHeight,
    isFullScreen: false,
    isFullCover: false
}));

const mobileOptions = computed<SignCanvasOptions>(() => ({
    ...options,
    canvasWidth: 292,
    canvasHeight: 414,
    isFullScreen: false,
    isFullCover: false
}));

const outputItems = computed(() => [
    createOutputItem('桌面端', desktopImage.value, desktopOptions.value),
    createOutputItem('移动端', mobileImage.value, mobileOptions.value)
]);

/**
 * 同时清空桌面和移动端预览。
 */
function clearAll(): void {
    desktopRef.value?.clear();
    mobileRef.value?.clear();
}

/**
 * 同时导出桌面和移动端签名图。
 */
function saveAll(): void {
    desktopRef.value?.toDataURL();
    mobileRef.value?.toDataURL();
}

/**
 * 恢复 demo 默认参数，保留当前签名内容以验证重绘能力。
 */
function resetOptions(): void {
    Object.assign(options, defaultOptions);
}

/**
 * 生成导出预览信息。这里按当前 DPR 和 quality 估算最终像素，方便验证导出配置。
 */
function createOutputItem(name: string, src: string | null, config: SignCanvasOptions) {
    const mime = src?.match(/^data:([^;]+);/)?.[1] || `image/${config.imgType || 'png'}`;
    const dpr = config.isDpr ? window.devicePixelRatio || 1 : 1;
    const quality = Number(config.quality || 1);
    const width = Math.max(1, Math.round(Number(config.canvasWidth || 0) * dpr * quality));
    const height = Math.max(1, Math.round(Number(config.canvasHeight || 0) * dpr * quality));
    const rotate = Number(config.exportRotate || 0);
    const shouldSwapSize = rotate === 90 || rotate === 270;

    return {
        name,
        src,
        mime,
        size: src ? formatBase64Size(src) : '-',
        dimension: shouldSwapSize ? `${height} x ${width}` : `${width} x ${height}`,
        preview: src ? `${src.slice(0, 132)}...` : '暂无输出'
    };
}

/**
 * 估算 base64 图片实际字节大小。
 */
function formatBase64Size(dataURL: string): string {
    const base64 = dataURL.split(',')[1] || '';
    const bytes = Math.max(0, Math.floor(base64.length * 0.75));
    if (bytes < 1024) {
        return `${bytes} B`;
    }
    return `${(bytes / 1024).toFixed(1)} KB`;
}
</script>

<style scoped>
.demo-page {
    min-height: 100vh;
    padding: 28px;
    box-sizing: border-box;
    color: oklch(24% 0.025 250);
    background:
        linear-gradient(180deg, oklch(98% 0.006 250), oklch(95% 0.01 230) 42%, oklch(96% 0.008 120));
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
}

.topbar,
.summary-grid,
.preview-grid,
.settings-shell,
.output-shell {
    max-width: 1280px;
    margin-inline: auto;
}

.topbar {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 18px;
}

.eyebrow {
    margin: 0 0 6px;
    color: oklch(45% 0.08 28);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0;
}

h1,
h2,
p {
    margin: 0;
}

h1 {
    font-size: 30px;
    line-height: 1.2;
    letter-spacing: 0;
}

h2 {
    font-size: 17px;
    line-height: 1.25;
    letter-spacing: 0;
}

.top-actions,
.panel-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

button,
select,
input[type="number"],
input[type="text"],
input[type="url"] {
    min-height: 36px;
    border: 1px solid oklch(86% 0.015 245);
    border-radius: 7px;
    background: oklch(99% 0.004 250);
    color: oklch(24% 0.025 250);
    font: inherit;
}

button {
    padding: 0 14px;
    cursor: pointer;
    transition: background 160ms ease-out, border-color 160ms ease-out, transform 160ms ease-out;
}

button:hover {
    border-color: oklch(70% 0.05 245);
    background: oklch(97% 0.008 250);
}

button:disabled {
    cursor: not-allowed;
    opacity: 0.45;
}

button:active {
    transform: translateY(1px);
}

.primary {
    border-color: oklch(56% 0.13 28);
    background: oklch(56% 0.13 28);
    color: oklch(99% 0.006 28);
    font-weight: 700;
}

.secondary {
    background: oklch(99% 0.004 250);
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
    margin-bottom: 18px;
}

.summary-item {
    padding: 14px 16px;
    border: 1px solid oklch(88% 0.014 245);
    border-radius: 8px;
    background: oklch(99% 0.004 250);
}

.summary-item span {
    display: block;
    color: oklch(48% 0.026 250);
    font-size: 12px;
}

.summary-item strong {
    display: block;
    margin-top: 6px;
    font-size: 18px;
}

.preview-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 390px;
    gap: 18px;
    align-items: stretch;
}

.preview-panel,
.settings-shell,
.output-shell {
    border: 1px solid oklch(87% 0.014 245);
    border-radius: 8px;
    background: oklch(99% 0.004 250);
    box-shadow: 0 18px 40px oklch(55% 0.035 250 / 0.11);
}

.preview-panel {
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
}

.panel-head,
.settings-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 18px;
    border-bottom: 1px solid oklch(90% 0.012 245);
}

.panel-head p,
.settings-head p {
    margin-top: 4px;
    color: oklch(50% 0.026 250);
    font-size: 13px;
}

.desktop-stage {
    padding: 22px;
    overflow: auto;
    background:
        linear-gradient(90deg, oklch(94% 0.009 245) 1px, transparent 1px),
        linear-gradient(0deg, oklch(94% 0.009 245) 1px, transparent 1px),
        oklch(97% 0.006 245);
    background-size: 24px 24px;
}

.sign-canvas {
    max-width: 100%;
    border-radius: 6px;
    box-shadow: 0 8px 20px oklch(55% 0.025 250 / 0.12);
}

.phone-shell {
    display: grid;
    place-items: center;
    padding: 26px 0 24px;
    background:
        radial-gradient(circle at 50% 0, oklch(94% 0.01 250), transparent 44%),
        oklch(96% 0.007 245);
}

.phone-bezel {
    width: 324px;
    padding: 10px 10px 12px;
    border: 1px solid oklch(63% 0.018 250);
    border-radius: 36px;
    background: linear-gradient(180deg, oklch(23% 0.018 250), oklch(15% 0.016 250));
    box-shadow:
        inset 0 0 0 1px oklch(100% 0 0 / 0.08),
        0 20px 44px oklch(30% 0.028 250 / 0.22);
    box-sizing: border-box;
}

.phone-status {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: 7px;
    height: 28px;
    padding: 0 14px;
    color: oklch(96% 0.004 250);
    font-size: 11px;
    font-weight: 700;
}

.phone-status::after {
    position: absolute;
    top: 8px;
    left: 50%;
    width: 76px;
    height: 9px;
    border-radius: 999px;
    background: oklch(7% 0.01 250);
    content: "";
    transform: translateX(-50%);
}

.phone-status b {
    width: 15px;
    height: 8px;
    border: 1px solid oklch(88% 0.004 250);
    border-radius: 3px;
}

.phone-status i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: oklch(88% 0.004 250);
}

.phone-screen {
    width: 292px;
    height: 414px;
    overflow: hidden;
    border-radius: 22px;
    background: oklch(99% 0.004 250);
}

.mobile-canvas {
    display: block;
    border-radius: 0;
    box-shadow: none;
}

.home-indicator {
    width: 104px;
    height: 4px;
    margin: 10px auto 0;
    border-radius: 999px;
    background: oklch(72% 0.006 250);
}

.result-strip {
    display: grid;
    grid-template-columns: 132px minmax(0, 1fr);
    gap: 14px;
    align-items: center;
    padding: 14px 18px 18px;
    border-top: 1px solid oklch(90% 0.012 245);
}

.result-strip.compact {
    grid-template-columns: 110px minmax(0, 1fr);
}

.thumb {
    display: grid;
    place-items: center;
    height: 74px;
    border: 1px dashed oklch(78% 0.026 245);
    border-radius: 7px;
    color: oklch(52% 0.026 250);
    background: oklch(97% 0.006 245);
    font-size: 13px;
    overflow: hidden;
}

.thumb img {
    max-width: 100%;
    max-height: 100%;
}

dl {
    margin: 0;
}

dl div {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 5px 0;
}

dt {
    color: oklch(50% 0.026 250);
}

dd {
    margin: 0;
    font-weight: 700;
}

.settings-shell {
    margin-top: 18px;
    overflow: hidden;
}

.output-shell {
    margin-top: 18px;
    overflow: hidden;
}

.settings-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(180px, 1fr));
    gap: 0;
}

fieldset {
    min-width: 0;
    margin: 0;
    padding: 16px;
    border: 0;
    border-right: 1px solid oklch(90% 0.012 245);
}

fieldset:last-child {
    border-right: 0;
}

legend {
    margin-bottom: 12px;
    color: oklch(32% 0.035 250);
    font-size: 13px;
    font-weight: 800;
}

label {
    display: grid;
    grid-template-columns: minmax(72px, 1fr) minmax(82px, 128px);
    align-items: center;
    gap: 10px;
    min-height: 38px;
    color: oklch(42% 0.026 250);
    font-size: 13px;
}

input[type="number"],
input[type="text"],
input[type="url"],
select {
    width: 100%;
    padding: 0 9px;
    box-sizing: border-box;
}

.wide-control {
    grid-template-columns: 1fr;
    align-items: stretch;
    gap: 7px;
}

input[type="color"] {
    width: 42px;
    height: 28px;
    padding: 0;
    border: 1px solid oklch(84% 0.014 245);
    border-radius: 6px;
    background: transparent;
}

input[type="range"] {
    width: 100%;
}

input[type="checkbox"] {
    justify-self: start;
    width: 18px;
    height: 18px;
    accent-color: oklch(56% 0.13 28);
}

.output-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0;
}

.output-card {
    display: grid;
    grid-template-columns: 180px minmax(0, 1fr);
    gap: 16px;
    padding: 18px;
    border-right: 1px solid oklch(90% 0.012 245);
}

.output-card:last-child {
    border-right: 0;
}

.output-preview {
    display: grid;
    place-items: center;
    min-height: 128px;
    border: 1px dashed oklch(78% 0.026 245);
    border-radius: 7px;
    color: oklch(52% 0.026 250);
    background: oklch(97% 0.006 245);
    font-size: 13px;
    overflow: hidden;
}

.output-preview img {
    max-width: 100%;
    max-height: 128px;
}

.output-meta {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    align-content: start;
}

.output-meta div {
    min-width: 0;
    padding: 10px;
    border: 1px solid oklch(90% 0.012 245);
    border-radius: 7px;
    background: oklch(98% 0.005 245);
}

.output-meta span {
    display: block;
    color: oklch(50% 0.026 250);
    font-size: 12px;
}

.output-meta strong {
    display: block;
    margin-top: 4px;
    overflow: hidden;
    font-size: 13px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

textarea {
    grid-column: 1 / -1;
    width: 100%;
    min-height: 82px;
    padding: 10px;
    border: 1px solid oklch(88% 0.014 245);
    border-radius: 7px;
    box-sizing: border-box;
    resize: vertical;
    color: oklch(35% 0.026 250);
    background: oklch(98% 0.004 245);
    font: 12px/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

@media (max-width: 1120px) {
    .preview-grid {
        grid-template-columns: 1fr;
    }

    .settings-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .output-grid {
        grid-template-columns: 1fr;
    }

    fieldset {
        border-right: 0;
        border-bottom: 1px solid oklch(90% 0.012 245);
    }

    .output-card {
        border-right: 0;
        border-bottom: 1px solid oklch(90% 0.012 245);
    }
}

@media (max-width: 720px) {
    .demo-page {
        padding: 16px;
    }

    .topbar,
    .panel-head,
    .settings-head {
        align-items: stretch;
        flex-direction: column;
    }

    .summary-grid,
    .settings-grid {
        grid-template-columns: 1fr;
    }

    .preview-panel {
        min-width: 0;
    }

    .desktop-stage {
        padding: 14px;
    }

    .phone-shell {
        padding: 18px 0;
    }

    .phone-bezel {
        width: min(324px, 100%);
        box-sizing: border-box;
    }

    .phone-screen {
        width: 100%;
        max-width: 292px;
        margin-inline: auto;
    }

    .result-strip,
    .result-strip.compact {
        grid-template-columns: 1fr;
    }

    .output-card {
        grid-template-columns: 1fr;
    }

    .output-meta {
        grid-template-columns: 1fr;
    }

    label {
        grid-template-columns: 1fr;
        gap: 6px;
    }
}
</style>
