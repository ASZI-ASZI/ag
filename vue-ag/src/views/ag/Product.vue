<template>
  <!-- 弹性布局 -->
  <div class="row p-3 d-flex flex-warp justify-content-between">
    <div v-for="(item,i) of list " :key="i" style="border-radius:5px; width:46%" class="border">
      <div>
        <img :src="`${baseURL}/${item.pic}`" class="w-100" />
      </div>
      <div>{{item.title}}</div>

      <div>￥{{item.price}}</div>
      <div>
        <mt-button @click="addCart(item.lid)">加入购物车</mt-button>
      </div>
    </div>
    <div class="d-lex flex-warp justify-content-between col-12 ">
      <mt-button size="large" @click="loadMroe">加载更多</mt-button>
    </div>
  </div>
  
</template>

<script>
import { getProductList, baseURL } from "@/assets/js/apis/product.js";
import { addCart } from "@/assets/js/apis/cart.js";
export default {
  data() {
    return {
      list: [],
      baseURL: baseURL,
      pno: 0,
      pageSize: 2
    };
  },
  mounted() {
    //在加载完成后调用
    this.loadMroe();
  },
  methods: {
    async loadMroe() {
      this.pno++; //每次使用页码加一
      let pno = this.pno;
      let pageSize = this.pageSize;
      let params = { pno, pageSize };
      let result = await getProductList(params); //异步调用
      
      this.list = this.list.concat(result.data); //返回商品列表数据追加到数组
    },
    async addCart(lid) {
      //创建参数对象（如果有参数需要传递的话）
      let buyCount = 1;
      let params = { lid, buyCount };

      //异步调用
      let result = await addCart(params);
      if (result.code == 300) {
        this.$router.push("/login");
        return;
      }
      if (result.code == 200) {
        this.$toast("添加成功");
      } else {
        this.$messagebox("添加失败", result.msg);
      }
    }
  }
};
</script>

<style>
</style>