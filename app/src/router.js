import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/tabbar/home';
import newsList from './components/home/newsList';
import goodsList from './components/goods/goodsList';
import newsInfo from './components/home/newsInfo';
import goodsInfo from './components/goods/goodsInfo';
import login from './components/home/login';
import shopCart from './components/home/shopCart';
import logout from './components/home/logout';


Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:Home},
    {path:'/newsList',component:newsList},
    {path:'/goodsList',component:goodsList},
    {path:'/newsInfo',component:newsInfo},
    {path:'/goodsInfo',component:goodsInfo},
    {path:'/login',component:login},
    {path:'/shopCart',component:shopCart},
    {path:'/logout',component:logout}
  ]
})
