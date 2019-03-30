<template>
    <div class="app-newslist">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item,i of newsList" :key="item.id">
                <router-link :to="'/newsInfo?id='+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis'>
                            <span>{{item.ctime | datetimeFilter}}</span>
                            <span>{{item.point}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
		</ul>
        <mt-button type="primary" size="large" @click="getMore" >加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            newsList:[],
            pno:1,
            pageSize:7
        }
    },
    methods:{
        loadNews(){
            var url =`http://shop.applinzi.com/newsList`;
            this.axios.get(url).then((res)=>{
                this.newsList = res.data.data;
            })
        },
        getMore(){
            this.pno++;
            var url = `http://shop.applinzi.com/newsList?pno=${this.pno}&pageSize=${this.pageSize}`;
            this.axios.get(url).then((res)=>{
                var rows = this.newsList.concat(res.data.data);
                this.newsList = rows;
            })
        }
    },
    created(){
        this.loadNews();
    }
}
</script>
<style>
    .app-newslist .mui-ellipsis{
        display:flex;
        justify-content:space-between;
        font-size:12px;
        color:#ccc;
    }
</style>