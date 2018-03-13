/*
* 路由配置
*/
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

//路由入口
const Index = r => require.ensure([], () => r(require('../pages/index.vue')), 'Index');//入口
const Success = r => require.ensure([], () => r(require('../pages/success.vue')), 'Success');//入口

export default new Router({
  mode: 'history',
  routes: [
    //入口
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        // title: 'pc组件库(vue)'
      }
    },
    {
      path: '/success',
      name: 'success',
      component: Success,
      meta: {
        // title: 'pc组件库(vue)'
      }
    },
  ]
});
