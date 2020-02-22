import Vue from 'vue';
import VueOffline from 'vue-offline';
import VueGeolocation from 'vue-browser-geolocation';
import App from './App';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueGeolocation);
Vue.use(VueOffline);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
