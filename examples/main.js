import Vue from 'vue';
import App from './App.vue';
// import SignCanvas from '../packages';
// Vue.use(SignCanvas);
Vue.config.productionTip = false;
new Vue({
    render: h => h(App),
}).$mount('#app');
