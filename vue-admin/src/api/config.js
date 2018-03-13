/*
 * axios http请求配置
 * @baseURL 请求api地址
 * @headers 头文件设置
 * @timeout 超时时间
 */
import Vue from 'vue';
import Axios from 'axios';
import Qs from 'qs';
//import { Message } from 'element-ui';
import Env from './env';
import Tips from './tips';
//Vue.component(Message.name, Message);

Axios.defaults.timeout = 5000;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Axios.defaults.baseURL = Env.api || "http://localhost:8080"; //当前环境地址

//POST传参序列化
Axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = Qs.stringify(config.data);
    }
    return config;
}, (error) => {
    // Message(Tips.request.errorData);
    return Promise.reject(error);
});

//code状态码200判断
Axios.interceptors.response.use((res) => {
    // if (res.data.error !== 0 || res.data.code !== 200) {
    if ( res.data.code !== 200) {
        // Message(res.data.msg || "网络异常");
        //console.log(res);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    // Message(Tips.request.errorNet);
    return Promise.reject(error);
});

export default Axios;
