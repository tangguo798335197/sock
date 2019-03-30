import Vue from 'vue'
import App from './App.vue'
import router from './router'


//引入vuex
import Vuex from 'vuex'
//注册Vuex组件
Vue.use(Vuex);
//创建store
var store = new Vuex.Store({
  state:{
    //cartCount:0 
    cartCount:sessionStorage.getItem("cartCount")||0  //共享数据：购物车中商品数量
  },
  mutations:{
    //购物车中数据加1  点击商品详情[加入购物车]
    increment(state){
      state.cartCount++;
    },
    //显示购物车列表时
    updateCount(state,count){
      //原来的购物车数量加等于count
      state.cartCount=count;
      sessionStorage.setItem("cartCount",count)
    }
  },
  getters:{
    //获取购物车中数量方法
    optCartCount:function(state){
      return state.cartCount;
    }
  }
})
//将store对象添加vue实例成为一个属性


//引入mint-ui的样式文件
import'mint-ui/lib/style.css'

Vue.config.productionTip = false

import axios from 'axios'
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios;

import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'

//引入mint-ui的组件header
import {Header,Swipe,SwipeItem,Button} from 'mint-ui'
//注册header组件
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button);

//解决post请求的参数转成字符串
import qs from 'qs'
Vue.prototype.qs = qs;


//日期的过滤器
Vue.filter("datetimeFilter",(val)=>{
  var time = new Date(val);
  var y = time.getFullYear();
  var m = time.getMonth() +1;
  var d = time.getDate();
  var h = time.getHours();
  var mi = time.getMinutes();
  var s = time.getSeconds();
  m<10&&(m="0"+m);   //相当于if语句
  d<10&&(d= "0"+d);
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
})

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
