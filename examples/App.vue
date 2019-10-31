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
