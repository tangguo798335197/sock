<template>
    <div class="app-comment">
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <textarea placeholder="请输入内容,最多120个文字" maxlength="120" v-model="msg"></textarea>
                    <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>
                </div>
            </div>
            <div class="mui-card-footer">
                <div class="cmt-list">
                    <div class="cmt-item" v-for="item,i of list" :key="i">
                        <div>第{{i+1}}楼  发表时间：{{item.ctime | datetimeFilter}}</div>
                        <div>{{item.content}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            list:[],
            pno:0,
            pageSize:5,
            msg:""    //textarea双向绑定的评论的内容
        }
    },
    methods:{
        getMore(){
            this.pno ++;
            var url = `http://shop.applinzi.com/getComment?nid=${this.$route.query.id}&pno=${this.pno}&pageSize=${this.pageSize}`;
            this.axios.get(url).then((result)=>{
                var rows = this.list.concat(result.data.data);
                this.list = rows;
            })
        },
        addComment(){
            var m = this.msg;
            //trim()去除字符串两端的空格
            var size = m.trim().length;
            if(size == 0){
                Toast("评论的内容不能为空");
                return;
            }
            //获取当前新闻的id
            var nid = this.$route.query.id
            //stringify将js对象转换查询字符串
            var postData = this.qs.stringify({
                nid:nid,
                content:this.msg
            })
            var url = `http://shop.applinzi.com/addComment`;
            this.axios.post(url,postData).then((result)=>{
                //console.log(result.data);
                Toast(result.data.msg);
                this.msg = "";
                this.pno = 0;
                this.list = [];
                this.getMore();
            })
        }
    },
    created(){
        this.getMore();
    }
}
</script>
<style>
    .app-comment .mui-card-footer{
        display:block;
    }
    .cmt-item{
        margin-bottom:10px;
        padding-bottom:5px;
        border-bottom:1px solid #ccc;
    }

</style>