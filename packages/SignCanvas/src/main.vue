<template>
    <div class="app-sign-canvas">
        <canvas id="sign-canvas" width="600" height="600">
            您的浏览器不支持canvas技术,请升级浏览器!
        </canvas>
        <div class="sign-btns">
            <span id="clear">清空</span>
            <span id="save">保存</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'SignCanvas',
    model: {
        value: 'image',
        event: 'confirm'
    },
    props: {
        image: {
            required: false,
            type: [String],
            default: null
        }
    },
    data() {
        return {
            value: null, //base64
            config:{
                canvas: null,
                context: null,
                isWrite: false, //是否开始
                lastWriteTime: -1,
                lastWriteSpeed: 1,
                lastWriteWidth: 2,
                canvasWidth: 600, //canvas宽高
                canvasHeight: 600,
                isShowBorder: true, //是否显示网格
                bgColor: '#fcc', //背景色
                borderWidth: 10, // 网格线宽度
                borderColor: "#f00", //网格颜色
                lastPoint: {}, //
                writeWidth: 5, //基础轨迹宽度
                maxWriteWidth: 30, // 写字模式最大线宽
                minWriteWidth: 5, // 写字模式最小线宽
                writeColor: '#0cc', // 轨迹颜色
                isWriteName:true //签名模式
            }
        };
    },
    mounted(){
        this.init('sign-canvas');
    },
    methods: {
        init(id, options){
            this.config.canvas =document.getElementById(id);
            this.config.context = this.config.canvas.getContext("2d");
            if(!options) return false;
            for(const name in options) {
               this.config[name] = options[name];
            }
        },

        /**
         * 轨迹宽度
         */
        setLineWidth() {
            const nowTime = new Date().getTime();
            const diffTime = nowTime - this.config.lastWriteTime;
            this.config.lastWriteTime = nowTime;
            let returnNum = this.config.minWriteWidth + (this.config.maxWriteWidth - this.config.minWriteWidth) * diffTime / 30;
            if(returnNum < this.config.minWriteWidth) {
                returnNum = this.config.minWriteWidth;
            } else if(returnNum > this.config.maxWriteWidth) {
                returnNum = this.config.maxWriteWidth;
            }
            returnNum = returnNum.toFixed(2);
            //写字模式和签名模式
            if(this.config.isWriteName){
                this.config.context.lineWidth = this.config.writeWidth;
            }else{
                this.config.context.lineWidth = this.config.lastWriteWidth = this.config.lastWriteWidth / 4 * 3 + returnNum / 4;
            }
        },

        /**
         * 绘制轨迹
         */
        writing(point){
            this.config.context.beginPath();
            this.config.context.moveTo(this.config.lastPoint.x, this.config.lastPoint.y);
            this.config.context.lineTo(point.x, point.y);
            this.setLineWidth();
            this.config.context.stroke();
            this.config.lastPoint = point;
            this.config.context.closePath();
        },

        /**
         * 轨迹样式
         */
        writeContextStyle(){
            this.config.context.beginPath();
            this.config.context.strokeStyle = this.config.writeColor;
            this.config.context.lineCap = 'round';
            this.config.context.lineJoin = "round";
        },

        /**
         * 写开始
         */
        writeBegin(point){
            this.config.isWrite = true;
            this.config.lastWriteTime = new Date().getTime();
            this.config.lastPoint = point;
            this.writeContextStyle();
        },

        /**
         * 写结束
         */
        writeEnd(){
            this.config.isWrite = false;
        },

        /**
         * 清空画板
         */
        canvasClear(){
            this.config.context.save();
            this.config.context.strokeStyle = '#fff';
            this.config.context.clearRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
            if(this.config.isShowBorder && !this.config.isWriteName) {
                this.config.context.beginPath();
                let size = this.config.borderWidth / 2;
                //画外面的框
                this.config.context.moveTo(size, size);
                this.config.context.lineTo(this.config.canvasWidth - size, size);
                this.config.context.lineTo(this.config.canvasWidth - size, this.config.canvasHeight - size);
                this.config.context.lineTo(size, this.config.canvasHeight - size);
                this.config.context.closePath();
                this.config.context.lineWidth = this.config.borderWidth;
                this.config.context.strokeStyle = this.config.borderColor;
                this.config.context.stroke();
                //画里面的框
                this.config.context.moveTo(0, 0);
                this.config.context.lineTo(this.config.canvasWidth, this.config.canvasHeight);
                this.config.context.lineTo(this.config.canvasWidth, this.config.canvasHeight / 2);
                this.config.context.lineTo(this.config.canvasWidth, this.config.canvasHeight / 2);
                this.config.context.lineTo(0, this.config.canvasHeight / 2);
                this.config.context.lineTo(0, this.config.canvasHeight);
                this.config.context.lineTo(this.config.canvasWidth, 0);
                this.config.context.lineTo(this.config.canvasWidth / 2, 0);
                this.config.context.lineTo(this.config.canvasWidth / 2, this.config.canvasHeight);
                this.config.context.stroke();
            }
            this.config.context.restore();
        },

        /**
         *  保存图片 格式base64
         */
        saveAsImg(){
            const image = new Image();
            image.src = this.canvas.toDataURL("image/png");
            if(image.src == this.emptyCanvas) {
                alert('请先书写')
            } else {
                console.log('提交的内容===>', image.src)
            }
        },

        /**
         * 初始化画板
         */
        canvasInit(){
            this.config.canvas.width = this.config.canvasWidth;
            this.config.canvas.height = this.config.canvasHeight;
            this.config.emptyCanvas = this.config.canvas.toDataURL("image/png");
        }








    }
};
</script>
<style  scoped>
*{margin: 0;padding: 0;}
.canvas {
    /*width: 100%;*/
    display: block;
    border: 1px solid red;
}
#clear,
#clear1,
#save {
    margin: 0 auto;
    display: inline-block;
    padding: 5px 10px;
    width: 50px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #eee;
    background: #e1e1e1;
    border-radius: 10px;
    text-align: center;
    margin: 20px auto;
    cursor: pointer;
}
</style>
