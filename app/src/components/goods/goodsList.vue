<template>
    <div class="app-goodList">
        <div class="goods-item" v-for="item of list" :key="item.id">
            <img :src="item.img_url" alt="" @click="goodsInfo" :data-id="item.id">
            <h4>{{item.title}}</h4>
            <div class="info">
                <span class="now">￥{{item.price}}</span>
            </div>
            <div class="sell">
                <span>热卖中</span>
            </div>
        </div>
        <mt-button type="primary" size="large" @click="getGoods">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[],
            pno:0,
            pageSize:4
        }
    },
    methods:{
        getGoods(){
            this.pno ++;
            var url = `http://shop.applinzi.com/products?pno=${this.pno}&pageSize=${this.pageSize}`;
            this.axios.get(url).then((res)=>{
                var rows = this.list.concat(res.data.data);
                this.list = rows;
            })
        },
        goodsInfo(e){
            var id = e.target.dataset.id;
            this.$router.push("/goodsInfo?id="+id);
        }
    },
    created(){
        this.getGoods();
    }
}
</script>
<style>
      .app-goodList{
          display:flex;
          flex-wrap:wrap;
          justify-content:space-between;
          padding:4px;
      }  
      .app-goodList .goods-item{
          width:49%;
          border:1px solid #ccc;
          box-shadow:0 0 8px #ccc;
          margin:4px 0;
          padding:5px;
          display:flex;
          flex-direction:column;
          min-height:180px;
          justify-content:space-between;
      }
      .app-goodList .goods-item img{
          width:100%;
          height:120px;
      }
      .app-goodList .goods-item h4{
          font-size:15px;
          font-weight:500;
          margin-top:8px;
          line-height:20px;
      }
      .app-goodList .goods-item .now{
          color:red;
          font-size:17px;
          font-weight:bold;
      }
      .app-goodList .goods-item .sell{
          font-size:15px;
      }
</style>