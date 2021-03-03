<template>
    <div id="app">
        <h2 class="title">Vue Sign Canvas 电子签名板</h2>
        <sign-canvas class="sign-canvas" ref="SignCanvas" :options="options" v-model="value"/>
        <img v-if="value" class="view-image" :src="value" width="150" height="150">
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
                    <span class="item-label">兼容高分屏高清绘制:</span>
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
                        <input v-model="options.borderWidth" type="number">
                    </span>
                </li>
                <li class="li-c">
                    <span class="item-label">下笔宽度:</span>
                    <span class="item-content">
                        <input v-model="options.writeWidth" type="number">
                    </span>
                </li>
                <li class="li-c">
                    <span class="item-label">图片类型:</span>
                    <span class="item-content">
                        <input v-model="options.imgType" type="text">
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
                        <input type="color" v-model="options.writeColor">
                    </span>
                </li>
                <li class="li-c">
                    <span class="item-label">背景色:</span>
                    <span class="item-content">
                        <input type="color" v-model="options.bgColor">
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
import SignCanvas from '../packages';
export default {
    components:{SignCanvas},
    data(){
        return {
            value: null,
            options:{
                isFullScreen: false,   ////是否全屏手写 [Boolean] 可选
                isFullCover: false, //是否全屏模式下覆盖所有的元素 [Boolean]   可选
                isDpr: false,       //是否使用dpr兼容高分屏 [Boolean] 可选
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
}
.view-image{
    display: block;
    margin: 20px auto;
}
.config{
    width: 350px;
    margin: 20px auto;
    .ul-config{
        .li-c{
            display: flex;
            align-items: center;
            padding: 4px 10px;
            .item-label{
                font-size: 14px;
            }
            .item-content{
                margin-left: 10px;
            }
        }
    }
}
.sign-btns{
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
