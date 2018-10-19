import axios from 'axios';
import qs from 'qs';
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.use(VueRouter)

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://sd.local.com/api/frontend';

const router = new VueRouter()

let _this = this;
//http request 拦截器
axios.interceptors.request.use(
    config => {
        config.headers = {
            'Content-Type':'application/x-www-form-urlencoded',
        }
        const token = localStorage.getItem('token')
        if(token && token !== undefined){
            config.headers['User-Token'] = token;
        }
        config.data = qs.stringify(config.data);
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        let res = response.data;
        let code = res.code;
        switch (code){
            case 0:
            case -1:
                Vue.prototype.$message({
                    message: res.message,
                    type: 'error',
                });
                break;
            case -2:
                localStorage.removeItem('token')
                router.push('/login');
                location.reload();
                break;
            default:
                return response;
        }
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装get请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url,data = {}){
    let params = Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }).join("&");
    return new Promise((resolve,reject) => {
        axios.get(url+"?"+params)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}