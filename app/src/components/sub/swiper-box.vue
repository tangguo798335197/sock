<template>
    <div class="app-swipe">
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item of list" :key="item.id">
                <img :src="item.img_url" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    props:["list"],
    data(){
        return {}
    }
}
</script>
<style>
    .app-swipe .mint-swipe{
        height:180px;
    }
    .app-swipe .mint-swipe img{
        width:100%;
        height:100%;
    }
</style>