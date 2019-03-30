<template>
    <div class="app-shopCart">
        <ul class="my-ul">
            <li class="my-li" v-for="(item,i) of list">
                <div>
                    <input type="checkbox" :checked="item.cb" :data-i="i" @click="modifyItem">
                </div>
                <div>
                    <p>
                        {{item.title}}
                    </p>
                    <span>￥{{item.price}}</span>
                    <p class="del">
                        <button @click="delItem" :data-id="item.id" :data-index="i">删除</button>
                    </p>
                </div>
                <div>
                    <img :src="item.img_url">
                </div>
            </li>
        </ul>
        <div class="total">
            <div>
                <input type="checkbox" @click="selectAll" :checked="allcb">全选
                <button @click="removeItem">删除选中的商品</button>
            </div>
            <span>小计：￥99.99</span>
        </div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            list:[],
            allcb:false   //保存全选复选框的状态
        }
    },
    methods:{
        getCartList(){
            var uid = 1;
            var url = `http://shop.applinzi.com/cartList?uid=${uid}`;
            this.axios.get(url).then((result)=>{
                //判断如果没有登录显示出错消息
                if(result.data.code == -1){
                    Toast("请登录");
                    return;
                }
                var rows = result.data.data;
                //修改全局购物车数量
                this.$store.commit("updateCount",rows.length);
                for(var item of rows){
                    item.cb = false
                }
                this.list = rows;
            })
        },
        delItem(e){
            var id = e.target.dataset.id;
            var index = e.target.dataset.index;
            var url = `http://shop.applinzi.com/delCartItem?id=${id}`
            this.axios.get(url).then((result)=>{
                if(result.data.code == 1){
                    Toast("删除成功")
                    this.list.splice(index,1);
                }
            })
        },
        selectAll(e){
            var cb = e.target.checked;
            this.allcb = cb;
            for(var item of this.list){
                item.cb = cb;
            }
        },
        modifyItem(e){
            //获取下标
            var i = e.target.dataset.i;
            var checked = e.target.checked;
            this.list[i].cb = checked;

            //统计购物车中商品选中的数量 = list.length
            //将全选状态true
            var count = 0;
            for(var item of this.list){
                if(item.cb){
                    count++;
                }
            }
            if(count == this.list.length){
                this.allcb = true;
            }else{
                this.allcb = false;
            }
        },
        removeItem(){
            //创建空字符串，为了后续拼接字符串
            var html = "";
            //遍历数组中的元素。判断cb==true。保存id，拼字符串
            for(var item of this.list){
                if(item.cb){
                    html+=item.id+",";
                }
            }
            html = html.substring(0,html.length-1);
            console.log(html);
            var url = `http://shop.applinzi.com/removeItem?ids=${html}`;
            this.axios.get(url).then((result)=>{
                if(result.data.code == 1){
                    Toast("删除成功")
                    this.getCartList();
                }
            })

        }
    },
    created(){
        this.getCartList();
    }
}
</script>
<style>
    .my-ul{
        margin:0;
        padding:10px;
        list-style:none;
    }
    .my-ul .my-li{
        display:flex;
        border-bottom:1px solid #ccc;
        margin-bottom:10px;
        background:#fff;
        padding:5px 0;
    }
    .my-ul .my-li div{
        margin:0 8px;
    }
    .my-li img{
        min-width:50px;
        height:50px;
    }
    .my-ul .my-li .del{
        margin:5px 0 5px 0;
    }
    .total{
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:0 10px 0 0;
        height:40px;
        line-height:40px;
        background:#ccc;
        margin:0 10px;
        text-indent:10px;
        font-size:14px;
    }
    .total button{
        background:none;
        color:#007194;
        border:none;
        height:40px;
    }
</style>