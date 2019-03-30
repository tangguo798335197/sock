<template>
    <div class="app-login">
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <form>
                        用户名
                        <input type="text" name="uname" placeholder="请输入用户名" v-model="uname">
                        密码
                        <input type="password" name="upwd" placeholder="请输入密码" v-model="upwd">
                        <input type="button" value="登录" @click="buttonLogin">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            uname:"",
            upwd:""
        }
    },
    methods:{
        buttonLogin(){
            var uname = this.uname;
            var upwd = this.upwd;
            var reg = /^[a-z0-9]{3,12}$/i;
            if(!reg.test(uname)){
                Toast("用户名格式不正确");
                return;
            }
            var url = `http://shop.applinzi.com/login?uname=${uname}&upwd=${upwd}`;
            this.axios.get(url).then((result)=>{
                if(result.data.code == 1){
                    this.$router.push("/home")
                }else{
                    Toast("用户名或密码有误")
                };
                //登录之后立即更新购物车的数量
                var url = `http://shop.applinzi.com/cartList`
                this.axios.get(url).then((result)=>{
                    var rows = result.data.data;
                    //修改全局购物车数量
                    this.$store.commit("updateCount",rows.length);
                })
            })
        }
    }
}
</script>
<style>
    .app-login form{
        padding:15px;
    }
    .app-login form input{
        margin:5px 0 15px 0;
    }
</style>