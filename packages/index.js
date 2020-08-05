// 导入单个组件
import SignCanvas from './SignCanvas';
SignCanvas.install = function (Vue) {
    Vue.component(SignCanvas.name, SignCanvas);
}
// 导出的对象必须具备一个 install 方法
export default SignCanvas;
