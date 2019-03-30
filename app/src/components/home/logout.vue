<template>
    <h3>退出登录</h3>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {}
    },
    created(){
        var url = `http://shop.applinzi.com/logout`;
        this.axios.get(url).then((result)=>{
            Toast("已退出");
        })
        this.$store.commit("updateCount",0);   //退出的时候手动把购物车的数量设置为0
    }
}
</script>
<style>
    
</style>