/*
 * api请求封装
 * @type 请求方式(post/get)
 * @url 请求地址
 * @params 传递参数
 * @isOutsideLink 是否为外链
 */
import Axios from './config';

export function httpRequest(type, url, params, isOutsideLink) {
    //get
    if (type === "get") {
        //debugger;
        return new Promise((resolve, reject) => {
            url = isOutsideLink ? url : Axios.defaults.baseURL + url;
            Axios.get(url, { params })
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    //post
    if (type === "post") {
        return new Promise((resolve, reject) => {
            url = isOutsideLink ? url : Axios.defaults.baseURL + url;
            // debugger;
            Axios.post(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

export default httpRequest;
