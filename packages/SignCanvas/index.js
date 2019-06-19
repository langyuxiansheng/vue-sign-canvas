// 导入组件，组件必须声明 name
import SignCanvas from './src/main.vue';
// 为组件添加 install 方法，用于按需引入
SignCanvas.install = function (Vue) {
    Vue.component(SignCanvas.name, SignCanvas);
}
export default SignCanvas;
