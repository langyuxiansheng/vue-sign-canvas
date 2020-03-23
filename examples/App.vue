<template>
    <div id="app">
        <h2 class="title">Vue Sign Canvas</h2>
        <sign-canvas class="sign-canvas" ref="SignCanvas" :options="options" v-model="value"/>
        <img v-if="value" class="view-image" :src="value" width="150" height="150">
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
                canvasWidth: 350, //canvas宽高 [Number] 可选
                canvasHeight: 370,  //高度  [Number] 可选
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
<style lang="less">
* {
    margin: 0;
    padding: 0;
}
.title{
    padding: 20px;
    text-align: center;
}
.sign-canvas{
    display: block;
    margin: 20px auto;
    border: 1px dashed #f00;
}
.view-image{
    display: block;
    margin: 20px auto;
}
.sign-btns{
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    #clear,
    #clear1,
    #save {
        display: inline-block;
        padding: 5px 10px;
        width: 100px;
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
