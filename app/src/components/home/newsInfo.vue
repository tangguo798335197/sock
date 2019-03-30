<template>
    <div class="app-newsInfo">
        <div class="mui-card">
            <div class="mui-card-header mui-card-media" :style="'height:40vw;background-image:url('+info.img_url+')'"></div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p style="color: #333;">{{info.title}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <a class="mui-card-link">{{info.ctime | datetimeFilter}}</a>
                <a class="mui-card-link">{{info.point}}</a>
            </div>
        </div>
        <comment></comment>
    </div>
</template>
<script>
import comment from '../sub/comment'
export default {
    components:{
        comment
    },
    data(){
        return {
            info:{}
        }
    },
    methods:{
        findnewsInfo(){
            var id = this.$route.query.id;
            var url = `http://shop.applinzi.com/findnewsInfo?id=${id}`;
            this.axios.get(url).then((result)=>{
                this.info = result.data.data[0];
            })
        }
    },
    created(){
        this.findnewsInfo();
    }
}
</script>
<style>
    
</style>