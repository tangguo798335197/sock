<template>
    <!--顶部导航条-->
    <div class="app-home">
        <!--轮播图-->
        <mt-swipe >
            <mt-swipe-item v-for="item of list" :key="item.id">
                <img :src="item.img_url" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <!--九宫格-->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/goodsList">
                    <img src="../../img/menu1.png" alt="">
                    <div class="mui-media-body">休闲食品</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/newsList">
                        <img src="../../img/menu9.png" alt="">
                        <div class="mui-media-body">新闻中心</div>
                    </router-link>
                 </li>
                 <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                 <router-link to="/shopCart">
                    <img src="../../img/menu8.png" alt="">
                    <div class="mui-media-body">购物车</div>
                    </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../img/menu2.png" alt="">
                    <div class="mui-media-body">进口食品</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../img/menu3.png" alt="">
                    <div class="mui-media-body">中外名酒</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../img/menu4.png" alt="">
                    <div class="mui-media-body">冷饮冻食</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../img/menu5.png" alt="">
                    <div class="mui-media-body">茶叶</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../img/menu6.png" alt="">
                    <div class="mui-media-body">生鲜水果</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../img/menu7.png" alt="">
                    <div class="mui-media-body">地方特产</div></a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                list:[]
            }
        },
        methods:{
            loadImg(){
                var url = `http://shop.applinzi.com/imageList`;
                this.axios.get(url).then((result)=>{
                    this.list = result.data.data;
                })
            }
        },
        created(){
            this.loadImg();
        }
    }
</script>

<style scoped>
    .app-home .mint-swipe{
        height: 160px;
    }
    .app-home .mint-swipe img{
        width: 100%;
        height: 100%;
    }
    .mui-content > .mui-table-view:first-child{
        margin-top:0;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell img{
        width: 60px;
        height: 60px;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell .mui-media-body{
        font-size: 16px;
    }
</style>