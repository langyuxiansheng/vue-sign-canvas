module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "112a");
/******/ })
/************************************************************************/
/******/ ({

/***/ "05fd":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("baa7")('native-function-to-string', Function.toString);


/***/ }),

/***/ "065d":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("bb8b");
var createDesc = __webpack_require__("5edc");
module.exports = __webpack_require__("26df") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "0926":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "0b34":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "112a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_@vue_cli-service@3.12.1@@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("e67d")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("a450");

// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4d543de8-vue-loader-template"}!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!./node_modules/_babel-loader@8.2.5@babel-loader/lib!./node_modules/_vue-loader@15.10.0@vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.10.0@vue-loader/lib??vue-loader-options!./packages/SignCanvas/index.vue?vue&type=template&id=18e51cb3&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('canvas', {
    ref: _vm.domId,
    staticClass: "app-sign-canvas",
    attrs: {
      "id": _vm.domId
    },
    on: {
      "mousedown": function mousedown($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.handleMousedown.apply(null, arguments);
      },
      "mousemove": function mousemove($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.handleMousemove.apply(null, arguments);
      },
      "mouseup": function mouseup($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.handleMouseup.apply(null, arguments);
      },
      "mouseleave": function mouseleave($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.handleMouseleave.apply(null, arguments);
      },
      "touchstart": function touchstart($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.handleTouchstart.apply(null, arguments);
      },
      "touchmove": function touchmove($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.handleTouchmove.apply(null, arguments);
      },
      "touchend": function touchend($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.handleTouchend.apply(null, arguments);
      }
    }
  }, [_vm._v("\n    您的浏览器不支持canvas技术,请升级浏览器!\n")]);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./packages/SignCanvas/index.vue?vue&type=template&id=18e51cb3&

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("4057");

// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!./node_modules/_babel-loader@8.2.5@babel-loader/lib!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.10.0@vue-loader/lib??vue-loader-options!./packages/SignCanvas/index.vue?vue&type=script&lang=js&

/* harmony default export */ var SignCanvasvue_type_script_lang_js_ = ({
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
    options: {
      //配置项
      required: false,
      type: [Object],
      default: function _default() {
        return null;
      }
    }
  },
  data: function data() {
    return {
      value: null,
      //base64
      domId: "sign-canvas-".concat(Math.random().toString(36).substring(2)),
      //生成唯一dom标识
      canvas: null,
      //canvas dom对象
      context: null,
      //canvas 画布对象
      dpr: 1,
      config: {
        isFullScreen: false,
        //是否全屏手写 [Boolean] 可选
        isFullCover: false,
        //是否全屏模式下覆盖所有的元素 [Boolean] 可选
        isDpr: false,
        //是否使用dpr兼容高分屏 [Boolean] 可选
        lastWriteSpeed: 1,
        //书写速度 [Number] 可选
        lastWriteWidth: 2,
        //下笔的宽度 [Number] 可选
        lineCap: 'round',
        //线条的边缘类型 [butt]平直的边缘 [round]圆形线帽 [square]	正方形线帽
        lineJoin: 'round',
        //线条交汇时边角的类型  [bevel]创建斜角 [round]创建圆角 [miter]创建尖角。
        canvasWidth: 600,
        //canvas宽高 [Number] 可选
        canvasHeight: 600,
        //高度  [Number] 可选
        isShowBorder: true,
        //是否显示边框 [可选]
        bgColor: 'none',
        //背景色 [String] 可选 直接渲染到图片 [移除:这背景色仅仅只是canvas背景,保存的图片仍然是透明的]
        borderWidth: 1,
        // 网格线宽度  [Number] 可选
        borderColor: "#ff787f",
        //网格颜色  [String] 可选
        writeWidth: 5,
        //基础轨迹宽度  [Number] 可选
        maxWriteWidth: 30,
        // 写字模式最大线宽  [Number] 可选
        minWriteWidth: 5,
        // 写字模式最小线宽  [Number] 可选
        writeColor: '#101010',
        // 轨迹颜色  [String] 可选
        isSign: false,
        //签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
        imgType: 'png',
        //下载的图片格式  [String] 可选为 jpeg  canvas本是透明背景的
        enableResize: true //是否启用窗口变化监听 [Boolean] 可选, 此操作在pc端用于监听窗口变化,动态调整画板大小

      },
      resizeTimer: null,
      canvasImage: null,
      //canvas转换的图片
      test: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.init();

    if (this.config.enableResize) {
      //监听窗口变化
      window.onresize = function () {
        if (_this.resizeTimer) clearTimeout(_this.resizeTimer);
        _this.resizeTimer = setTimeout(function () {
          _this.init();
        }, 100);
      };
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.config.enableResize) {
      window.onresize = null;
      clearTimeout(this.resizeTimer);
    }
  },
  watch: {
    options: {
      handler: function handler() {
        this.init();
      },
      deep: true
    }
  },
  methods: {
    init: function init() {
      var options = this.options;

      if (options) {
        for (var key in options) {
          this.config[key] = options[key];
        }
      }

      this.dpr = typeof window !== 'undefined' && this.config.isDpr ? window.devicePixelRatio || window.webkitDevicePixelRatio || window.mozDevicePixelRatio || 1 : 1;
      this.canvas = document.getElementById(this.domId);
      this.context = this.canvas.getContext("2d");

      if (this.config.isFullScreen) {
        this.config.canvasWidth = window.innerWidth || document.body.clientWidth;
        this.config.canvasHeight = window.innerHeight || document.body.clientHeight;

        if (this.config.isFullCover) {
          //开启全屏覆盖
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
    setLineWidth: function setLineWidth() {
      var nowTime = new Date().getTime();
      var diffTime = nowTime - this.config.lastWriteTime;
      this.config.lastWriteTime = nowTime;
      var returnNum = this.config.minWriteWidth + (this.config.maxWriteWidth - this.config.minWriteWidth) * diffTime / 30;

      if (returnNum < this.config.minWriteWidth) {
        returnNum = this.config.minWriteWidth;
      } else if (returnNum > this.config.maxWriteWidth) {
        returnNum = this.config.maxWriteWidth;
      }

      returnNum = returnNum.toFixed(2); //写字模式和签名模式

      if (this.config.isSign) {
        this.context.lineWidth = this.config.writeWidth * this.dpr;
      } else {
        var lineWidth = this.config.lastWriteWidth = this.config.lastWriteWidth / 4 * 3 + returnNum / 4;
        this.context.lineWidth = lineWidth * this.dpr;
      }
    },

    /**
     * 写开始
     */
    writeBegin: function writeBegin(point) {
      this.config.isWrite = true;
      this.config.lastWriteTime = new Date().getTime();
      this.config.lastPoint = point;
      this.writeContextStyle();
    },

    /**
     * 绘制轨迹
     */
    writing: function writing(point) {
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
    writeEnd: function writeEnd(point) {
      this.config.isWrite = false;
      this.config.lastPoint = point;
      this.saveAsImg();
    },

    /**
     * 轨迹样式
     */
    writeContextStyle: function writeContextStyle() {
      this.context.beginPath();
      this.context.strokeStyle = this.config.writeColor;
      this.context.lineCap = this.config.lineCap;
      this.context.lineJoin = this.config.lineJoin;
    },

    /**
     * 清空画板
     */
    canvasClear: function canvasClear() {
      this.context.save();
      this.context.strokeStyle = this.config.writeColor;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); //设置背景色

      if (this.config.bgColor && this.config.bgColor !== 'none') {
        this.context.fillStyle = this.config.bgColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      } //绘制线框


      this.context.beginPath();
      this.context.lineWidth = this.config.borderWidth * this.dpr;
      this.context.strokeStyle = this.config.borderColor;
      var size = this.config.borderWidth / 2 * this.dpr;

      if (this.config.isShowBorder) {
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
    canvasInit: function canvasInit() {
      this.canvas.width = this.config.canvasWidth * this.dpr;
      this.canvas.height = this.config.canvasHeight * this.dpr;
      this.canvas.style.width = "".concat(this.config.canvasWidth, "px");
      this.canvas.style.height = "".concat(this.config.canvasHeight, "px");
      this.config.emptyCanvas = this.canvas.toDataURL("image/".concat(this.config.imgType));
    },

    /**
     * 鼠标按下 => 下笔
     */
    handleMousedown: function handleMousedown(e) {
      this.writeBegin({
        x: e.offsetX || e.clientX,
        y: e.offsetY || e.clientY
      });
    },

    /**
     * 书写过程 => 下笔书写
     */
    handleMousemove: function handleMousemove(e) {
      this.config.isWrite && this.writing({
        x: e.offsetX,
        y: e.offsetY
      });
    },

    /**
     * 鼠标松开 => 提笔
     */
    handleMouseup: function handleMouseup(e) {
      this.writeEnd({
        x: e.offsetX,
        y: e.offsetY
      });
    },

    /**
     * 离开书写区域 => 提笔离开
     */
    handleMouseleave: function handleMouseleave(e) {
      this.config.isWrite = false;
      this.config.lastPoint = {
        x: e.offsetX,
        y: e.offsetY
      };
    },

    /* ==========================移动端兼容=Start================================ */

    /**
     * 手指按下 => 下笔
     */
    handleTouchstart: function handleTouchstart(e) {
      var touch = e.targetTouches[0];
      var x = touch.clientX ? touch.clientX - this.getRect().left : touch.pageX - this.offset(touch.target, 'left');
      var y = touch.clientY ? touch.clientY - this.getRect().top : touch.pageY - this.offset(touch.target, 'top');
      this.writeBegin({
        x: x,
        y: y
      });
    },

    /**
     * 手指移动 => 下笔书写
     */
    handleTouchmove: function handleTouchmove(e) {
      var touch = e.targetTouches[0];
      var x = touch.clientX ? touch.clientX - this.getRect().left : touch.pageX - this.offset(touch.target, 'left');
      var y = touch.clientY ? touch.clientY - this.getRect().top : touch.pageY - this.offset(touch.target, 'top');
      this.config.isWrite && this.writing({
        x: x,
        y: y
      });
    },

    /**
     * 手指移动结束 => 提笔离开
     */
    handleTouchend: function handleTouchend(e) {
      var tcs = e.targetTouches;
      var ccs = e.changedTouches;
      var touch = tcs && tcs.length && tcs[0] || ccs && ccs.length && ccs[0];
      var x = touch.clientX ? touch.clientX - this.getRect().left : touch.pageX - this.offset(touch.target, 'left');
      var y = touch.clientY ? touch.clientY - this.getRect().top : touch.pageY - this.offset(touch.target, 'top');
      this.writeEnd({
        x: x,
        y: y
      });
    },

    /* ==========================移动端兼容=End================================== */

    /**
    *  保存图片 格式base64
    */
    saveAsImg: function saveAsImg() {
      this.canvasImage = new Image();
      this.canvasImage.src = this.canvas.toDataURL("image/".concat(this.config.imgType));
      this.$emit('confirm', this.canvasImage.src);
      return this.config.quality !== 1 ? this.dealImage() : this.canvasImage.src;
    },

    /**
     * 下载二维码到本地
     * @param name 文件名
     * @param isQual 是否下载压缩后的图片
     */
    downloadSignImg: function downloadSignImg(name) {
      var dataURL = this.saveAsImg();
      this.saveFile(dataURL, name ? "".concat(name, ".").concat(this.config.imgType) : "".concat(Date.parse(new Date()), ".").concat(this.config.imgType));
    },

    /**
     * 保存文件
     */
    saveFile: function saveFile(data, filename) {
      var saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      saveLink.href = data;
      saveLink.download = filename;
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      saveLink.dispatchEvent(event);
    },

    /**
     * 获取画布的元素的大小及其相对于视口的位置
     * @return {}
     */
    getRect: function getRect() {
      return this.$refs[this.domId].getBoundingClientRect();
    },

    /**
     * 获取dom对象的偏移量 可以获取解决position定位的问题
     * @returns number
     */
    offset: function offset(obj, direction) {
      //将top,left首字母大写,并拼接成offsetTop,offsetLeft
      var offsetDir = 'offset' + direction[0].toUpperCase() + direction.substring(1);
      var realNum = obj[offsetDir];
      var positionParent = obj.offsetParent; //获取上一级定位元素对象

      while (positionParent != null) {
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
    dealImage: function dealImage() {
      var quality = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var curQuality = quality < 0.1 || quality > 1 ? 0.6 : quality; //压缩系数0-1之间

      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d'); //目标尺寸

      canvas.width = Math.floor(this.config.canvasWidth * curQuality);
      canvas.height = Math.floor(this.config.canvasHeight * curQuality);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(this.canvasImage, 0, 0, canvas.width, canvas.height);
      var drgImg = canvas.toDataURL('image/png', curQuality);
      return drgImg;
    }
  }
});
// CONCATENATED MODULE: ./packages/SignCanvas/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var packages_SignCanvasvue_type_script_lang_js_ = (SignCanvasvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/_vue-loader@15.10.0@vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./packages/SignCanvas/index.vue





/* normalize component */

var component = normalizeComponent(
  packages_SignCanvasvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SignCanvas = (component.exports);
// CONCATENATED MODULE: ./packages/index.js

// 导入单个组件


SignCanvas.install = function (Vue) {
  Vue.component(SignCanvas.name, SignCanvas);
}; // 导出的对象必须具备一个 install 方法


/* harmony default export */ var packages_0 = (SignCanvas);
// CONCATENATED MODULE: ./node_modules/_@vue_cli-service@3.12.1@@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (packages_0);



/***/ }),

/***/ "26df":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("0926")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "3d8a":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "4057":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("de49");
var anObject = __webpack_require__("a86f");
var $flags = __webpack_require__("6bf8");
var DESCRIPTORS = __webpack_require__("26df");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("84e8")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("0926")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "4fd4":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "5d10":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("9cff");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "5edc":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "6bf8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("a86f");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "76e3":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "83d3":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("26df") && !__webpack_require__("0926")(function () {
  return Object.defineProperty(__webpack_require__("e8d7")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "84e8":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("0b34");
var hide = __webpack_require__("065d");
var has = __webpack_require__("4fd4");
var SRC = __webpack_require__("d8b3")('src');
var $toString = __webpack_require__("05fd");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("76e3").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "9cff":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "a450":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("bb8b").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("26df") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "a86f":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("9cff");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "baa7":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("76e3");
var global = __webpack_require__("0b34");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("3d8a") ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "bb8b":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("a86f");
var IE8_DOM_DEFINE = __webpack_require__("83d3");
var toPrimitive = __webpack_require__("5d10");
var dP = Object.defineProperty;

exports.f = __webpack_require__("26df") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "d8b3":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "de49":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("26df") && /./g.flags != 'g') __webpack_require__("bb8b").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("6bf8")
});


/***/ }),

/***/ "e67d":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "e8d7":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("9cff");
var document = __webpack_require__("0b34").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ })

/******/ });
//# sourceMappingURL=sign-canvas.common.js.map