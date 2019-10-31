# vue-sign-canvas 一个基于canvas开发,封装于Vue组件的通用手写签名板(电子签名板),支持pc端和移动端;

## 开始使用! 下载安装npm包
```bash
npm i vue-sign-canvas --save
```
```javascript
//全局注册 main.js
import SignCanvas from 'vue-sign-canvas';

Vue.use(SignCanvas);

//或者局部注册
import SignCanvas from 'vue-sign-canvas';
{
    components:{ SignCanvas }
}
```

你可以这样使用: 

### 组件模板使用

```html
<template>
    <div id="app">
        <sign-canvas class="sign-canvas" ref="SignCanvas" :options="options" v-model="value"/>
        <img class="view-image" :src="value" width="150" height="150">
        <div class="sign-btns">
            <span id="clear" @click="canvasClear()">清空</span>
            <span id="save" @click="saveAsImg()">保存</span>
            <span id="save" @click="downloadSignImg()">下载</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            value: null,
            options:{
                isSign: true, //签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
                isShowBorder: false, //是否显示边框 [可选]
            }
        }
    },
    methods:{

        /**
         * 清除画板
         */
        canvasClear(){
            this.$refs.SignCanvas.canvasClear();
        },

        /**
         * 保存图片
         */
        saveAsImg(){
            const img = this.$refs.SignCanvas.saveAsImg();
            alert(`image 的base64：${img}`);
        },

        /**
         * 下载图片
         */
        downloadSignImg(){
            this.$refs.SignCanvas.downloadSignImg();
        },

    }
}
</script>
<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
}
.sign-canvas{
    display: block;
    margin: 0 auto;
    border: 1px dashed #f00;
}
.view-image{
    display: block;
    margin: 20px auto;
}
.sign-btns{
    width: 800px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    #clear,
    #clear1,
    #save {
        margin: 0 auto;
        display: inline-block;
        padding: 5px 10px;
        width: 150px;
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
    lastWriteSpeed: 1,  //书写速度 [Number] 可选
    lastWriteWidth: 2,  //下笔的宽度 [Number] 可选
    lineCap: 'round',   //线条的边缘类型 [butt]平直的边缘 [round]圆形线帽 [square]	正方形线帽
    lineJoin: 'round',  //线条交汇时边角的类型  [bevel]创建斜角 [round]创建圆角 [miter]创建尖角。
    canvasWidth: 600, //canvas宽高 [Number] 可选
    canvasHeight: 600,  //高度  [Number] 可选
    isShowBorder: true, //是否显示边框 [可选]   当签名模式处于false的时候此选项才生效
    bgColor: '#fcc', //背景色 [String] 可选
    borderWidth: 1, // 网格线宽度  [Number] 可选
    borderColor: "#ff787f", //网格颜色  [String] 可选
    writeWidth: 5, //基础轨迹宽度  [Number] 可选
    maxWriteWidth: 30, // 写字模式最大线宽  [Number] 可选
    minWriteWidth: 5, // 写字模式最小线宽  [Number] 可选
    writeColor: '#101010', // 轨迹颜色  [String] 可选
    isSign: false, //签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
    imgType:'png'   //下载的图片格式  [String] 可选为 jpeg  canvas本是透明背景的
}
```

2. 内置方法
```javascript
//清除画布 无返回值 [Void]
this.$refs.SignCanvas.canvasClear(); 

//清除画布 返回图片的base64编码 [String]
this.$refs.SignCanvas.saveAsImg();

//调用内置的下载图片方法,默认将图片保存为png格式
this.$refs.SignCanvas.downloadSignImg();

```
## [在线演示](https://langyuxiansheng.github.io/vue-license-keyboard/)
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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
