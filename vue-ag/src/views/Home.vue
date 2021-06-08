<template>
  <div class="container px-2">
    <!-- 轮播开始 -->
    <div>
      <mt-swipe :auto="4000" style="height:200px">
        <mt-swipe-item v-for="(item,i) in imgList" :key="i">
          <img :src="`${baseURL}/${item.img}`" width="100%" height="100%" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 轮播结束 -->
    <!-- 导航图标开始 -->
    <div style="width=100%;height=100px;">
      
    </div>
    <!-- 导航图标结束 -->
     <!-- 商品推荐开始 -->
    <h5 class="text-left p-2">商品推荐</h5>
    <mt-cell to="/messagelist" class="">
    <div class="row p-1 d-flex flex-warp justify-content-between">
      <div
        v-for="(item,i) of recommendedList"
        :key="i"
        style="width:30%;border-radius:5px"
        class="border m-1 p-1"
      >
        <!-- 商品图片 -->
        <div>
          <img :src="`${baseURL}/${item.pic}`" class="w-100" alt />
        </div>
        <!-- 商品名称 -->
        <div>{{item.title}}</div>
        <!-- 商品价格 -->
        <div class="font-weight-bold">￥{{item.price}}</div>
      </div>
    </div>
    </mt-cell>
    <!-- 商品推荐结束 -->
    <!-- 热门新品开始 -->
    <h5 class="text-left p-2">热门新品</h5>
    <div class="row p-3 d-flex flex-warp justify-content-between">
      <div
        v-for="(item,i) of recommendedList"
        :key="i"
        style="width:30%;border-radius:5px"
        class="border m-1 p-1"
      >
        <!-- 商品图片 -->
        <div>
          <img :src="`${baseURL}/${item.pic}`" class="w-100" alt />
        </div>
        <!-- 商品名称 -->
        <div>{{item.title}}</div>
        <!-- 商品价格 -->
        <div class="font-weight-bold">￥{{item.price}}</div>
      </div>
    </div>
    <!-- 热门新品结束 -->
  </div>
</template>

<script>
import { getCarouselList, getRecommendedList } from "@/assets/js/apis/index.js"; //导入接口
import { baseURL } from "@/assets/js/apis/product.js"; //导入接口

export default {
  data() {
    return {
      imgList: [],
      baseURL: baseURL,
      recommendedList: []
    };
  },
  created() {
    this.loadCarouselList();
    this.loadRecommendedList();
  },
  methods: {
    async loadCarouselList() {
      let result = await getCarouselList();      
      this.imgList = result;
    },
    async loadRecommendedList() {
      let result = await getRecommendedList();
      console.log(result);
      this.recommendedList = result;
    }
  },

  components: {}
};
</script>
<style scoped>
</style>