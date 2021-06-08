<template>
  <div id="app">
    <mt-header fixed :title="$route.meta.title" style="background-color:red" >
      <span slot="left" @click="goBack" v-show="showBack">
      <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <div class="content">  <router-view /></div>

    <!-- 底部导航  建议单独做成组件-->
    <mt-tabbar name="底部导航按钮" v-model="selected" fixed>
      <mt-tab-item id="0" @click.native="onClickTabbar(0)">
        <img
          slot="icon"
          :src="tabbarSelected[0] ? require('@/assets/img/home_fill.png') : require('@/assets/img/home.png') "
        />
        首页
      </mt-tab-item>
      <mt-tab-item id="1" @click.native="onClickTabbar(1)">
        <img
          slot="icon"
          :src="tabbarSelected[1] ? require('@/assets/img/we_fill_light.png') : require('@/assets/img/we_light.png') "
        />
        商品
      </mt-tab-item>
      <mt-tab-item id="2" @click.native="onClickTabbar(2)">
        <img
          slot="icon"
          :src="tabbarSelected[2] ? require('@/assets/img/cart_fill_light.png') : require('@/assets/img/cart_light.png') "
        />
        购物车
      </mt-tab-item>
      <mt-tab-item id="3" @click.native="onClickTabbar(3)">
        <img
          slot="icon"
          :src="tabbarSelected[3] ? require('@/assets/img/im_select.png') : require('@/assets/img/im_normal .png')"
        />
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data(){
    return {
      showBack:false,
      selected:"0",
      tabbarSelected:[true,false,false,false],  //是否选中这个底部导航标签   
    }
  },
  created(){
    console.log(this.$route.path);
    this.showBack = this.$route.path!=="/"
  },
  watch:{
    '$route.path'(newVal){
      
      this.showBack = newVal !=="/"
    }
  },
  methods:{
    goBack(){
      this.$router.back();
    },  
    onClickTabbar(index){
      //this.$toast(this.selected);
      this.tabbarSelected =[false,false,false,false]; //设置都没有被选中
      this.tabbarSelected[index] = true;
      this.selected = index.toString();
      console.log(this.selected)
      switch (this.selected) {
        case "0":    
           
          this.$router.push("/")
          break;
        case "1":
          this.$router.push("/product")
          break;          
        case "2":
          this.$router.push("/cart")
          break;
        case "3":
          this.$router.push("/login")
          break;                
        default:
          break;
      }
    }
  },

}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.mint-tabbar > .mint-tab-item.is-selected {
    background-color: transparent;
    color: #26e452;
}

.content{
  padding-top: 40px;
  padding-bottom: 60px;
  overflow-x: hidden;
}

</style>
