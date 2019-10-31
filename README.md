# vue-sign-canvas  功能完善中,暂不可以使用!!!!



## 功能完善中,暂不可以使用!!!!
```
npm i vue-sign-canvas --save
```
```
//全局注册 main.js
import SignCanvas from 'vue-sign-canvas';

Vue.use(SignCanvas);

//或者局部注册
import SignCanvas from 'vue-sign-canvas';
{
    components:{ SignCanvas }
}
```
### 组件模板使用

```html
<template>
    <div id="app">
        <sign-canvas class="sign-canvas" ref="SignCanvas" v-model="value"/>
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
            value: null
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
    lastWriteSpeed: 1,  //书写速度
    lastWriteWidth: 2,  //下笔的宽度
    lineCap: 'round',   //lineCap 属性设置或返回线条末端线帽的样式。   butt	默认。向线条的每个末端添加平直的边缘。round	向线条的每个末端添加圆形线帽。square	向线条的每个末端添加正方形线帽。
    lineJoin: 'round',  //属性设置或返回所创建边角的类型，当两条线交汇时。  bevel	创建斜角。round	创建圆角。miter	默认。创建尖角。
    canvasWidth: 600, //canvas宽高
    canvasHeight: 600,  //高度
    isShowBorder: true, //是否显示网格
    bgColor: '#fcc', //背景色
    borderWidth: 1, // 网格线宽度
    borderColor: "#ff787f", //网格颜色
    writeWidth: 5, //基础轨迹宽度
    maxWriteWidth: 30, // 写字模式最大线宽
    minWriteWidth: 5, // 写字模式最小线宽
    writeColor: '#101010', // 轨迹颜色
    isSign: false, //签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
    imgType:'png'   //下载的图片格式  [String] 可选为 jpeg  canvas本是透明背景的
}
```




---



### 图片展示 
---
更多功能正在完善中......
如果您有什么好的建议请留言

你可以这样使用: 

```
## 二次开发 下载项目

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
