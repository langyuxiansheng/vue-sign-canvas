# sign-canvas 一个基于 canvas 开发,封装于 Vue 组件的通用手写签名板(电子签名板),支持 pc 端和移动端;

#### ┭┮﹏┭┮ 因为 vue-sign-canvas 的包名被占用了,只好去掉一个前缀了.... 假如此轮子对你有帮助,请顺手 star 一下吧.o(_￣︶￣_)o

#### 更多文章和技术推文，请关注微信公众号"笔优站长",有问题也可以及时反馈哦！

## 开始使用! 下载安装 npm 包

```bash
npm i sign-canvas --save
```

```javascript
//全局注册 main.js
import SignCanvas from "sign-canvas";

Vue.use(SignCanvas);

//局部注册
import SignCanvas from "sign-canvas";

components: {
    SignCanvas;
}
```

你可以这样使用:

### 组件模板使用

```html
<template>
    <div id="app">
        <h2 class="title">Vue Sign Canvas 电子签名板</h2>
        <sign-canvas class="sign-canvas" ref="SignCanvas" :options="options" v-model="value" />
        <img v-if="value" class="view-image" :src="value" width="150" height="150" />
        <div class="config">
            <ul class="ul-config">
                <li class="li-c">
                    <span class="item-label">书写速度:</span>
                    <span class="item-content">
                        <select name="isSign" v-model="options.isSign">
                            <option :value="true">签名</option>
                            <option :value="false">写字</option>
                        </select>
                    </span>
                </li>
                <li class="li-c">
                    <span class="item-label">显示边框/网格:</span>
                    <span class="item-content">
                        <select name="isSign" v-model="options.isShowBorder">
                            <option :value="true">显示</option>
                            <option :value="false">不显示</option>
                        </select>
                    </span>
                </li>
                <li class="li-c">
                    <span class="item-label">兼容高倍屏高清绘制:</span>
                    <span class="item-content">
                        <select name="isSign" v-model="options.isDpr">
                            <option :value="true">启用</option>
                            <option :value="false">关闭</option>
                        </select>
                    </span>
                </li>
                <li class="li-c">
                    <span class="item-label">边框宽度:</span>
                    <span class="item-content">
                        <input v-model="options.borderWidth" type="number" />
                    </span>
                </li>
                <li class="li-c">
                    <span class="item-label">下笔宽度:</span>
                    <span class="item-content">
                        <input v-model="options.writeWidth" type="number" />
                    </span>
                </li>
                <li class="li-c">
                    <span class="item-label">图片类型:</span>
                    <span class="item-content">
                        <input v-model="options.imgType" type="text" />
                    </span>
                </li>
                <li class="li-c">
                    <span class="item-label">线条的边缘类型:</span>
                    <span class="item-content">
                        <select name="lineCap" v-model="options.lineCap">
                            <option value="butt">平直的边缘</option>
                            <option value="round">圆形线帽</option>
                            <option value="square">正方形线帽</option>
                        </select>
                    </span>
                </li>
                <li class="li-c">
                    <span class="item-label">线条交汇时边角的类型:</span>
                    <span class="item-content">
                        <select name="lineCap" v-model="options.lineJoin">
                            <option value="bevel">创建斜角</option>
                            <option value="round">创建圆角</option>
                            <option value="miter">创建尖角</option>
                        </select>
                    </span>
                </li>
                <li class="li-c">
                    <span class="item-label">画笔颜色:</span>
                    <span class="item-content">
                        <input type="color" v-model="options.writeColor" />
                    </span>
                </li>
                <li class="li-c">
                    <span class="item-label">背景色:</span>
                    <span class="item-content">
                        <input type="color" v-model="options.bgColor" />
                    </span>
                </li>
            </ul>
        </div>
        <div class="sign-btns">
            <span id="clear" @click="canvasClear()">清空</span>
            <span id="save" @click="saveAsImg()">保存</span>
            <span id="save" @click="downloadSignImg()">下载</span>
        </div>
    </div>
</template>
<script>
    import SignCanvas from "../packages";
    export default {
        components: { SignCanvas },
        data() {
            return {
                value: null,
                options: {
                    isDpr: false, //是否使用dpr兼容高倍屏 [Boolean] 可选
                    lastWriteSpeed: 1, //书写速度 [Number] 可选
                    lastWriteWidth: 2, //下笔的宽度 [Number] 可选
                    lineCap: "round", //线条的边缘类型 [butt]平直的边缘 [round]圆形线帽 [square]	正方形线帽
                    lineJoin: "bevel", //线条交汇时边角的类型  [bevel]创建斜角 [round]创建圆角 [miter]创建尖角。
                    canvasWidth: 350, //canvas宽高 [Number] 可选
                    canvasHeight: 370, //高度  [Number] 可选
                    isShowBorder: true, //是否显示边框 [可选]
                    bgColor: "#fcc", //背景色 [String] 可选
                    borderWidth: 1, // 网格线宽度  [Number] 可选
                    borderColor: "#ff787f", //网格颜色  [String] 可选
                    writeWidth: 5, //基础轨迹宽度  [Number] 可选
                    maxWriteWidth: 30, // 写字模式最大线宽  [Number] 可选
                    minWriteWidth: 5, // 写字模式最小线宽  [Number] 可选
                    writeColor: "#101010", // 轨迹颜色  [String] 可选
                    isSign: true, //签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
                    imgType: "png", //下载的图片格式  [String] 可选为 jpeg  canvas本是透明背景的
                },
            };
        },
        methods: {
            /**
             * 清除画板
             */
            canvasClear() {
                this.$refs.SignCanvas.canvasClear();
            },

            /**
             * 保存图片
             */
            saveAsImg() {
                const img = this.$refs.SignCanvas.saveAsImg();
                alert(`image 的base64：${img}`);
            },

            /**
             * 下载图片
             */
            downloadSignImg() {
                this.$refs.SignCanvas.downloadSignImg();
            },
        },
    };
</script>
<style lang="less">
    * {
        margin: 0;
        padding: 0;
    }
    .title {
        padding: 20px;
        text-align: center;
    }
    .sign-canvas {
        display: block;
        margin: 20px auto;
    }
    .view-image {
        display: block;
        margin: 20px auto;
    }
    .config {
        width: 350px;
        margin: 20px auto;
        .ul-config {
            .li-c {
                display: flex;
                align-items: center;
                padding: 4px 10px;
                .item-label {
                    font-size: 14px;
                }
                .item-content {
                    margin-left: 10px;
                }
            }
        }
    }
    .sign-btns {
        display: flex;
        justify-content: space-between;
        #clear,
        #clear1,
        #save {
            display: inline-block;
            padding: 5px 10px;
            width: 76px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #eee;
            background: #e1e1e1;
            border-radius: 10px;
            text-align: center;
            margin: 20px auto;
            cursor: pointer;
        }
    }
</style>
```

### 功能与配置

```javascript
props:{
    options: {  //配置项
        required: false,
        type: [Object],
        default: () => null
    }
}

// 1. options [Object] 可选,非必传

// 2. v-model [String] 可选,非必传

```

1. 配置项 options 属性

```javascript
{
    isFullScreen: false, //是否全屏手写 [Boolean] 可选
    isFullCover: false, //是否全屏模式下覆盖所有的元素 [Boolean] 可选
    isDpr: false,       //是否使用dpr兼容高倍屏 [Boolean] 可选
    lastWriteSpeed: 1,  //书写速度 [Number] 可选
    lastWriteWidth: 2,  //下笔的宽度 [Number] 可选
    lineCap: 'round',   //线条的边缘类型 [butt]平直的边缘 [round]圆形线帽 [square]	正方形线帽
    lineJoin: 'bevel',  //线条交汇时边角的类型  [bevel]创建斜角 [round]创建圆角 [miter]创建尖角。
    canvasWidth: 350, //canvas宽高 [Number] 可选
    canvasHeight: 370,  //高度  [Number] 可选
    isShowBorder: true, //是否显示边框 [可选]
    bgColor: '#fcc', //背景色 [String] 可选
    borderWidth: 1, // 网格线宽度  [Number] 可选
    borderColor: "#ff787f", //网格颜色  [String] 可选
    writeWidth: 5, //基础轨迹宽度  [Number] 可选
    maxWriteWidth: 30, // 写字模式最大线宽  [Number] 可选
    minWriteWidth: 5, // 写字模式最小线宽  [Number] 可选
    writeColor: '#101010', // 轨迹颜色  [String] 可选
    isSign: true, //签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
    imgType:'png'   //下载的图片格式  [String] 可选为 jpeg  canvas本是透明背景的
}
```

2. 内置方法

```javascript
//清除画布 无返回值 [Void]
this.$refs.SignCanvas.canvasClear();

//获取base图片 返回图片的base64编码 [String]
this.$refs.SignCanvas.saveAsImg();

//下载图片到本地, 调用内置的下载图片方法,默认将图片保存为png格式(经测试在部分微信内置浏览器中无效)
this.$refs.SignCanvas.downloadSignImg();
```

## [在线演示](https://langyuxiansheng.github.io/vue-sign-canvas/)

### 图片展示

---

初始化展示
![初始化展示](https://github.com/langyuxiansheng/vue-sign-canvas/blob/master/images/s1.png)

非签名模式书写展示
![非签名模式书写展示](https://github.com/langyuxiansheng/vue-sign-canvas/blob/master/images/s2.png)

保存展示
![保存展示](https://github.com/langyuxiansheng/vue-sign-canvas/blob/master/images/s3.png)

下载的图片展示
![下载的图片展示](https://github.com/langyuxiansheng/vue-sign-canvas/blob/master/images/s4.png)

签名模式的图片展示
![签名模式的图片展示](https://github.com/langyuxiansheng/vue-sign-canvas/blob/master/images/s5.png)

---

## 更多功能正在完善中......

## 如果您有什么好的建议请留言

## 二次开发 下载项目

```bash
git clone https://github.com/langyuxiansheng/vue-sign-canvas.git
```

## Project setup

```bash
cd vue-sign-canvas

npm install
```

### Compiles and hot-reloads for development

```bash
npm run dev
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

## 缺陷 & 后期计划

> 目前还没有撤销回到上一步的操作,一旦输入错了就只有清除重写了(这个是之前去银行的时候,那个签名板是这样设计的);
> 如果有需要还是可以考虑加上回到上一步的方法.

## 更新日志

> v1.1.5 功能更新：增加全屏手写方案，可以通过 options.isFullScreen,和 options.isFullCover 属性控制,全屏模式下 canvasWidth 和 canvasHeight 属性设置无效,感谢网友 AFelicity”的建议与反馈。

> v1.1.3 功能更新：增加高倍屏下，绘制会模糊的适配方案，可以通过 options.isDpr 属性进行开启或者关闭，感谢网友“Wong-Harry”的建议与反馈。

> v1.1.2 优化部分逻辑代码.

> v1.1.1 修复 background 拼写错误,感谢网友"shady-xia"的反馈和建议.

> v1.1.0 本次更新调整较大,内容如下:

-   调整局部组件注册的逻辑,全局使用的不收影响,如果有局部注册的朋友请调整一下.
-   调整 demo 样式,增加动态配置项,属性支持动态响应了;
-   修复滚动距离导致画点偏移的 bug,优化核心代码,感谢网友“Jayj1997”的建议和反馈。

> v1.0.7 修复定位下的轨迹偏移,受 position 属性的影响的 bug。感谢网友“gexiaoyun” 和 “xingguyue”的反馈。

> v1.0.6 修复多个 canvas 无法同时存在的 bug,修复移动端滚动后影响绘制轨迹的 bug。感谢网友“hytao2017”的反馈。

> v1.0.5 优化部分代码。

> v1.0.4 修复增加局部注册引入方式。

> v1.0.3 修复“在移动端时,如果<sign-canvas>标签距离左侧有间距, 画笔和绘制的内容有偏移 #4”的 bug，感谢网友“xiaohuyahappy ”和“tzy19920902”的 bug 反馈见及修复建议。

> v1.0.2 兼容移动端的可用性

> v1.0.1 修复无法清空的 bug

> v1.0.0 注册发布到 npmjs

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
