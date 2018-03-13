/*
* 模块调取后台test模块api
* @api 后台api地址
* @link 全局链接地址
* @share 全局分享默认配置
*/
import HttpRequest from '../api/http';

const TEST = {
  //获取微信签名
  getWxJsTicket: function (params) {
    return HttpRequest("post", "/user/get-wxjssdk-auth", params);
  },
  //获取上传的微信图片
  getWeixinImg: function (params) {
    return HttpRequest("get", "/test/getmedia", params);
  },
  //获取微信支付参数
  getWxParams(params) {
    return HttpRequest("post", "/pay/activity", params)
  },
  //用户注册
  userRegister(params) {
    return HttpRequest("get", "/chat-api/get-uuid-by-socket-id", params);
  },
  //用户历史消息记录
  getMessageList(params) {
    return HttpRequest("get", "/chat-api/get-message-list", params);
  },
  //用户发送文字
  sendMessage(params) {
    return HttpRequest("post", "/chat-api/user-add-text-message", params);
  },
  //获取表情包列表
  getEmojiList(params) {
    return HttpRequest("get", "/chat-api/get-face-list", params);
  },
  //   //图片上传七牛
  // selectImgs(params) {
  //   return HttpRequest("post", "/chat-api/upload-image",params);
  // }
  //图片上传
  sendImg(params) {
    return HttpRequest("post", "/chat-api/user-add-image-message", params);
  },
  //获取当前国家区号
  getAreaCode(params) {
    return HttpRequest("get", "/register/get-country-code", params);
  },
  //短信验证
  getSMScode(params) {
    return HttpRequest("post", "/register/get-mobile-code", params);
  },
  //用户注册
  userRegisters(params) {
    return HttpRequest("post", "/register/add-user-from-web", params);
  },
}
export default TEST;  
