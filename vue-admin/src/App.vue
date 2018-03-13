<template>
  <div id="app">
    <!-- <router-view v-wechat-title="$route.meta.title"></router-view> -->
    <router-view></router-view>
    <!-- <index-vue></index-vue> -->
    <!-- <chat-vue></chat-vue> -->
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  name: 'app',
  methods:{

  },
  created(){
    //判断用户设备是否是移动端
    if(navigator.userAgent.match(/(iPhone|iPod|Android|ios|Windows Phone|webOS|BlackBerry|SymbianOS)/i)){
      var host  = window.location.host;
      var mUrl  = host.replace('www', 'mobile');//replace(/www/g,'mobile'))
      window.location.href = "http://"+mUrl;
    }
  }
}
</script>

<style>
@import './assets/css/reset.css';
@import './assets/css/common.css';
@import './assets/css/resetElementUi.css';
</style>
