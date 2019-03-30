<template>
    <div class="app-goodinfo">
        <!--轮播图-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiperBox :list="rows"></swiperBox>
                </div>
            </div>
        </div>
        <!--商品信息-->
        <div class="mui-card">
            <div class="mui-card-header">{{info.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>
                        销售价格：￥{{info.price}}
                    </p>
                    购买数量：<div class="mui-numbox">
					<button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodSub">-</button>
					<input class="mui-input-numbox" type="number" value="1" v-model="val"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodAdd">+</button>
				</div>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="small" @click="addCart">加入购物车</mt-button>
            </div>
        </div>
        <!--商品参数-->
    </div>
</template>
<script>
import swiperBox from '../sub/swiper-box'
import {Toast} from 'mint-ui'
export default {
    components:{
        swiperBox
    },
    data(){
        return {
            rows:[],   //创建数组保存子组件显示数据
            info:{},
            id:this.$route.query.id,
            val:1
        }
    },
    methods:{
        getgoodsImg(){
            var url = `http://shop.applinzi.com/imageList`;
            this.axios.get(url).then((result)=>{
               this.rows = result.data.data;
            })
        },
        findgoodInfo(){
            var url = `http://shop.applinzi.com/findProduct?id=${this.id}`;
            this.axios.get(url).then((result)=>{
                this.info = result.data.data[0];
            })
        },
        goodAdd(){
            this.val++;
        },
        goodSub(){
            if(this.val > 1){
                this.val--;
            }
        },
        addCart(){
           var pid = this.id;
           var price = this.info.price;
           var uid = 1;
           var url = `http://shop.applinzi.com/addcart?pid=${pid}&price=${price}&uid=${uid}`;
           this.axios.get(url).then((result)=>{
               if(result.data.code == 1){
                   Toast("添加商品成功")
               }else{
                   Toast("请登录")
               }
           })
        }

    },
    created(){
        this.getgoodsImg();
        this.findgoodInfo();
    }
}
</script>
<style>
    
</style>