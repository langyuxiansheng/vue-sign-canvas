<template>
    <canvas
        :ref="domId"
        class="app-sign-canvas" :id="domId"
        @mousedown.prevent.stop="handleMousedown"
        @mousemove.prevent.stop="handleMousemove"
        @mouseup.prevent.stop="handleMouseup"
        @mouseleave.prevent.stop="handleMouseleave"
        @touchstart.prevent.stop="handleTouchstart"
        @touchmove.prevent.stop="handleTouchmove"
        @touchend.prevent.stop="handleTouchend">
        您的浏览器不支持canvas技术,请升级浏览器!
    </canvas>
</template>
<script>
export default {
    name: 'SignCanvas',
    model: {
        value: 'image',
        event: 'confirm'
    },
    props: {
        image: {
            required: false,
            type: [String],
            default: null
        },

        options: {  //配置项
            required: false,
            type: [Object],
            default: () => null
        },

    },
    data () {
        return {
            value: null, //base64
            domId: `sign-canvas-${Math.random().toString(36).substring(2)}`,  //生成唯一dom标识
            canvas:null,    //canvas dom对象
            context:null,   //canvas 画布对象
            dpr: 1,
            config: {
                isFullScreen: false, //是否全屏手写 [Boolean] 可选
                isFullCover: false, //是否全屏模式下覆盖所有的元素 [Boolean] 可选
                isDpr: false,       //是否使用dpr兼容高分屏 [Boolean] 可选
                lastWriteSpeed: 1,  //书写速度 [Number] 可选
                lastWriteWidth: 2,  //下笔的宽度 [Number] 可选
                lineCap: 'round',   //线条的边缘类型 [butt]平直的边缘 [round]圆形线帽 [square]	正方形线帽
                lineJoin: 'round',  //线条交汇时边角的类型  [bevel]创建斜角 [round]创建圆角 [miter]创建尖角。
                canvasWidth: 600, //canvas宽高 [Number] 可选
                canvasHeight: 600,  //高度  [Number] 可选
                isShowBorder: true, //是否显示边框 [可选]
                bgColor: 'none', //背景色 [String] 可选 直接渲染到图片 [移除:这背景色仅仅只是canvas背景,保存的图片仍然是透明的]
                borderWidth: 1, // 网格线宽度  [Number] 可选
                borderColor: "#ff787f", //网格颜色  [String] 可选
                writeWidth: 5, //基础轨迹宽度  [Number] 可选
                maxWriteWidth: 30, // 写字模式最大线宽  [Number] 可选
                minWriteWidth: 5, // 写字模式最小线宽  [Number] 可选
                writeColor: '#101010', // 轨迹颜色  [String] 可选
                isSign: false, //签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
                imgType:'png',   //下载的图片格式  [String] 可选为 jpeg  canvas本是透明背景的
                enableResize: true, //是否启用窗口变化监听 [Boolean] 可选, 此操作在pc端用于监听窗口变化,动态调整画板大小
            },
            resizeTimer: null,
            canvasImage: null,   //canvas转换的图片
            test: null
        };
    },
    mounted () {
        this.init();
        if(this.config.enableResize){
            //监听窗口变化
            window.onresize = ()=> {
                if (this.resizeTimer) clearTimeout(this.resizeTimer);
                this.resizeTimer = setTimeout(()=>{
                    this.init()
                } , 100);
            }
        }
    },

    beforeDestroy () {
        if(this.config.enableResize){
            window.onresize = null;
            clearTimeout(this.resizeTimer);
        }
    },

    watch:{
        options:{
            handler(){
                this.init();
            },
            deep: true
        }
    },

    methods: {
        init () {
            const options = this.options;
            if (options) {
                for (const key in options) {
                    this.config[key] = options[key];
                }
            }
            this.dpr = typeof window !== 'undefined' && this.config.isDpr ? window.devicePixelRatio || window.webkitDevicePixelRatio || window.mozDevicePixelRatio || 1 : 1;
            this.canvas = document.getElementById(this.domId);
            this.context = this.canvas.getContext("2d");
            if (this.config.isFullScreen) {
                this.config.canvasWidth = window.innerWidth || document.body.clientWidth;
                this.config.canvasHeight = window.innerHeight || document.body.clientHeight;
                if (this.config.isFullCover) {//开启全屏覆盖
                    this.canvas.style.position = 'fixed';
                    this.canvas.style.top = 0;
                    this.canvas.style.left = 0;
                    this.canvas.style.margin = 0;
                    this.canvas.style.zIndex = 20001;
                }
            }
            this.canvas.height = this.config.canvasWidth;
            this.canvas.width = this.config.canvasHeight;
            this.canvasInit();
            this.canvasClear();
        },

        /**
         * 轨迹宽度
         */
        setLineWidth () {
            const nowTime = new Date().getTime();
            const diffTime = nowTime - this.config.lastWriteTime;
            this.config.lastWriteTime = nowTime;
            let returnNum = this.config.minWriteWidth + (this.config.maxWriteWidth - this.config.minWriteWidth) * diffTime / 30;
            if (returnNum < this.config.minWriteWidth) {
                returnNum = this.config.minWriteWidth;
            } else if (returnNum > this.config.maxWriteWidth) {
                returnNum = this.config.maxWriteWidth;
            }
            returnNum = returnNum.toFixed(2);
            //写字模式和签名模式
            if (this.config.isSign) {
                this.context.lineWidth = this.config.writeWidth * this.dpr;
            } else {
                const lineWidth = this.config.lastWriteWidth = this.config.lastWriteWidth / 4 * 3 + returnNum / 4;
                this.context.lineWidth = lineWidth * this.dpr;
            }
        },

        /**
         * 写开始
         */
        writeBegin (point) {
            this.config.isWrite = true;
            this.config.lastWriteTime = new Date().getTime();
            this.config.lastPoint = point;
            this.writeContextStyle();
        },

        /**
         * 绘制轨迹
         */
        writing (point) {
            this.context.beginPath();
            this.context.moveTo(this.config.lastPoint.x * this.dpr, this.config.lastPoint.y * this.dpr);
            this.context.lineTo(point.x * this.dpr, point.y * this.dpr);
            this.setLineWidth();
            this.context.stroke();
            this.config.lastPoint = point;
            this.context.closePath();
        },

         /**
         * 写结束
         */
        writeEnd (point) {
            this.config.isWrite = false;
            this.config.lastPoint = point;
            this.saveAsImg();
        },

        /**
         * 轨迹样式
         */
        writeContextStyle () {
            this.context.beginPath();
            this.context.strokeStyle = this.config.writeColor;
            this.context.lineCap = this.config.lineCap;
            this.context.lineJoin = this.config.lineJoin;
        },


        /**
         * 清空画板
         */
        canvasClear () {
            this.context.save();
            this.context.strokeStyle = this.config.writeColor;
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            //设置背景色
            if(this.config.bgColor && this.config.bgColor !== 'none') {
                this.context.fillStyle = this.config.bgColor;
                this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
            }

            //绘制线框
            this.context.beginPath();
            this.context.lineWidth = this.config.borderWidth * this.dpr;
            this.context.strokeStyle = this.config.borderColor;
            let size = this.config.borderWidth / 2 * this.dpr;
            if(this.config.isShowBorder){
                //画外面的框
                this.context.moveTo(size, size);
                this.context.lineTo(this.canvas.width - size, size);
                this.context.lineTo(this.canvas.width - size, this.canvas.height - size);
                this.context.lineTo(size, this.canvas.height - size);
                this.context.closePath();
                this.context.stroke();
            }
            if (this.config.isShowBorder && !this.config.isSign) {
                //画里面的框
                this.context.moveTo(0, 0);
                this.context.lineTo(this.canvas.width, this.canvas.height);
                this.context.lineTo(this.canvas.width, this.canvas.height / 2);
                this.context.lineTo(0, this.canvas.height / 2);
                this.context.lineTo(0, this.canvas.height);
                this.context.lineTo(this.canvas.width, 0);
                this.context.lineTo(this.canvas.width / 2, 0);
                this.context.lineTo(this.canvas.width / 2, this.canvas.height);
                this.context.stroke();
            }
            this.context.restore();
            this.$emit('confirm', null);
        },

        /**
         * 初始化画板
         */
        canvasInit () {
            this.canvas.width = this.config.canvasWidth * this.dpr;
            this.canvas.height = this.config.canvasHeight * this.dpr;
            this.canvas.style.width = `${this.config.canvasWidth}px`;
            this.canvas.style.height = `${this.config.canvasHeight}px`;
            this.config.emptyCanvas = this.canvas.toDataURL(`image/${this.config.imgType}`);
        },

        /**
         * 鼠标按下 => 下笔
         */
        handleMousedown(e){
            this.writeBegin({ x: e.offsetX || e.clientX, y: e.offsetY || e.clientY });
        },

        /**
         * 书写过程 => 下笔书写
         */
        handleMousemove(e){
            this.config.isWrite && this.writing({ x: e.offsetX, y: e.offsetY });
        },

        /**
         * 鼠标松开 => 提笔
         */
        handleMouseup(e){
            this.writeEnd({ x: e.offsetX, y: e.offsetY });
        },

        /**
         * 离开书写区域 => 提笔离开
         */
        handleMouseleave(e){
            this.config.isWrite = false;
            this.config.lastPoint = { x: e.offsetX, y: e.offsetY };
        },

        /* ==========================移动端兼容=Start================================ */

        /**
         * 手指按下 => 下笔
         */
        handleTouchstart(e){
            const touch = e.targetTouches[0];
            const x = touch.clientX ? touch.clientX - this.getRect().left :  touch.pageX - this.offset(touch.target,'left');
            const y = touch.clientY ? touch.clientY - this.getRect().top  : touch.pageY - this.offset(touch.target,'top');
            this.writeBegin({ x, y});
        },

        /**
         * 手指移动 => 下笔书写
         */
        handleTouchmove(e){
            const touch = e.targetTouches[0];
            const x = touch.clientX ? touch.clientX - this.getRect().left :  touch.pageX - this.offset(touch.target,'left');
            const y = touch.clientY ? touch.clientY - this.getRect().top  : touch.pageY - this.offset(touch.target,'top');
            this.config.isWrite && this.writing({ x, y });
        },

        /**
         * 手指移动结束 => 提笔离开
         */
        handleTouchend(e){
            const tcs = e.targetTouches;
            const ccs = e.changedTouches;
            const touch = tcs && tcs.length && tcs[0] || ccs && ccs.length && ccs[0];
            const x = touch.clientX ? touch.clientX - this.getRect().left :  touch.pageX - this.offset(touch.target,'left');
            const y = touch.clientY ? touch.clientY - this.getRect().top  : touch.pageY - this.offset(touch.target,'top');
            this.writeEnd({ x, y });
        },

        /* ==========================移动端兼容=End================================== */

         /**
         *  保存图片 格式base64
         */
        saveAsImg() {
            this.canvasImage = new Image();
            this.canvasImage.src = this.canvas.toDataURL(`image/${this.config.imgType}`);
            this.$emit('confirm',this.canvasImage.src);
            return this.config.quality !== 1 ? this.dealImage() : this.canvasImage.src;
        },

        /**
         * 下载二维码到本地
         * @param name 文件名
         * @param isQual 是否下载压缩后的图片
         */
        downloadSignImg(name) {
            let dataURL = this.saveAsImg();
            this.saveFile(dataURL, name ? `${name}.${this.config.imgType}` : `${Date.parse(new Date())}.${this.config.imgType}`);
        },

        /**
         * 保存文件
         */
        saveFile(data, filename) {
            const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            saveLink.href = data;
            saveLink.download = filename;
            const event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            saveLink.dispatchEvent(event);
        },

        /**
         * 获取画布的元素的大小及其相对于视口的位置
         * @return {}
         */
        getRect() {
            return this.$refs[this.domId].getBoundingClientRect();
        },

        /**
         * 获取dom对象的偏移量 可以获取解决position定位的问题
         * @returns number
         */
        offset(obj, direction) {
            //将top,left首字母大写,并拼接成offsetTop,offsetLeft
            const offsetDir = 'offset'+ direction[0].toUpperCase()+direction.substring(1);
            let realNum = obj[offsetDir];
            let positionParent = obj.offsetParent;  //获取上一级定位元素对象
            while(positionParent != null){
                realNum += positionParent[offsetDir];
                positionParent = positionParent.offsetParent;
            }
            return realNum;
        },

        /**
         * 图片压缩
         * @param quality 压缩系数
         * @returns
         * 说明: 此方法返回压缩后的base64,系数[0.1-1]之间
         */
        dealImage(quality = 1)  {
            let curQuality = quality < 0.1 || quality > 1 ? 0.6 : quality;
            //压缩系数0-1之间
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            //目标尺寸
            canvas.width = Math.floor(this.config.canvasWidth * curQuality);
            canvas.height = Math.floor(this.config.canvasHeight * curQuality);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(this.canvasImage, 0, 0, canvas.width, canvas.height);
            let drgImg = canvas.toDataURL('image/png', curQuality);
            return drgImg;
        }
    }
};
</script>
