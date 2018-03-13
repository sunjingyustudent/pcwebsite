/*
* 全局环境配置
* localhost／ development／ pre／ production *
* @api 后台api地址
* @link 全局链接地址
* @share 全局分享默认配置
*/
const CONFIG = {
  // 本地环境
  localhost: {
    //聊天系统
    // api: 'http://vipsales-chat.dev.pnlyy.com',
    // 官网
    api: 'http://web.dev.pnlyy.com/v1',
    link: {
      index:  'http://localhost:8080'
    }
  },
  // DEV环境
  development: {
    // api: 'http://vipsales-chat.dev.pnlyy.com',
    api: 'http://web.dev.pnlyy.com/v1',
    link: {
      index:  'http://www.dev.peilian.com'
    }
  },
  // PRE环境
  pre: {
    // api: 'http://vipsales-chat.pre.pnlyy.com',
    api: 'http://webapi.pre.pnlyy.com/v1',
    link: {
      index:  'http://www.pre.peilian.com'
    }
  },
  // PRD环境
  production: {
    api: ' http://webapi.pnlyy.com/v1',
    link: {
      index:  'http://www.peilian.com'
    }
  }
};

//检测环境
let host = window.location.host;
if(host.indexOf('dev.peilian.com')>-1){
  global.APIMSG = CONFIG.development;
}else if(host.indexOf('pre.peilian.com')>-1){
  global.APIMSG = CONFIG.pre;
}else if(host.indexOf('peilian.com')>-1){
  global.APIMSG = CONFIG.production;
}else{
  global.APIMSG = CONFIG.localhost;
}

export default global.APIMSG;
