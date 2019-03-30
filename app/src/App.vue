<template>
 <div class="app-container">
    <mt-header fixed title="零食吧"></mt-header>
    <router-view></router-view>
    <!--tabbar-->
    <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item mui-active" to="/home">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" to="/login">
            <span class="mui-icon mui-icon-contact"></span>
            <span class="mui-tab-label">登录</span>
        </router-link>
        <router-link class="mui-tab-item" to="/shopCart">
            <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                <span class="mui-badge">
                    {{$store.getters.optCartCount}}
                </span>
            </span>
            <span class="mui-tab-label">购物车</span>
        </router-link>
        <a class="mui-tab-item" href="javascript:;">
            <span class="mui-icon mui-icon-search"></span>
            <span class="mui-tab-label">搜索</span>
        </a>
    </nav>
 </div>
</template>

<style>
    .app-container .mint-header{
        background:#000000;
        font-size: 16px;
        height: 50px;
    }
   .app-container{
     padding-top:50px;
     padding-bottom:50px;
     overflow-x:hidden;
   }

 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;
}
.app-container .mui-bar{
        background-color: #000000;
        height: 40px;
    }
.app-container .mui-bar-tab .mui-tab-item.mui-active{
    color: ##26a2ff;
}
</style>
