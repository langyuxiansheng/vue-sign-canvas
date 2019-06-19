import Vue from 'vue';
import App from './App.vue';
import LicenseKeyboard from '../packages';

Vue.use(LicenseKeyboard);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
