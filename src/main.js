import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import VueScroller from 'vue-scroller'
import App from './App.vue'
import axios from 'axios'
import qs from 'qs';
import './plugins/element';

Vue.use(VueRouter)
Vue.use(VueCookies)
Vue.use(VueScroller)
Vue.use(axios)
Vue.use(qs)
import {get, post, fetch, patch, put} from './utils/request'

Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

// Vue.config.productionTip = false

import router from './router/index';

router.beforeEach((to, from, next) => {
    const nextRoute = [ '/', '/sendMessage', '/message/:id'];
    let token = localStorage.getItem('token');
    if (nextRoute.indexOf(to.path) >= 0) {
        if(token == undefined || !token){
            next('/login');
        }
    }
    if (to.path === '/login') {
        if (token) {
            next.push('/');
        }
    }
    next();
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
