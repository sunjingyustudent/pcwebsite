<template>
  <div>
    <section>
      <div class="center">
        <div class="child"></div>
        <p>您已申请免费体验课成功！</p>
        <span>请您留意手机，您的专属课程顾问将会在稍后联系您</span>
        <div class="WeChatCode"></div>
        <p class="exclusive">任何与VIP有关的疑问您都可以随时通过公众号向您的专属课程顾问咨询。</p>
        <!-- <button @click="back">返回当前首页</button> -->
        <router-link to="/">返回当前首页</router-link>
      </div>
    </section>
    <footer></footer>
  </div>
</template>
<script>
  import Vue from 'vue';
  import Env from '../api/env';
  export default {
    data() {
      return {

      }
    },
    components: {

    },
    methods: {

    },
    mounted() {

    }
  }

</script>
<style scoped>
  @import '../assets/css/reset.css';
  @import '../assets/css/common.css';
  @import '../assets/css/resetElementUi.css';
  @import '../assets/css/success.css';
</style>