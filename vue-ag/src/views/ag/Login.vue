<template>
  <div>
    <!-- 学子商城的一些功能实现... -->
    <h3>用户登录</h3>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="uname"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" v-model="upwd"></mt-field>
    <mt-button type="primary" @click="login">登录</mt-button>
    <mt-button type="primary" @click="register" class="ml-2">注册</mt-button>
    
  </div>

</template>

<script>
import { Login } from "@/assets/js/apis/user.js";
export default {
  data() {
    return {
      uname: "dingding",
      upwd: "123456"
    };
  },
  methods: {
    register(){
      this.$router.push("/register");
    },
    async login() {
      var uname = this.uname;
      var upwd = this.upwd;
      var user = { uname, upwd };
      // console.log(user)//有
      
      var reg = /^[a-z0-9]{3,12}$/i; //正则表达式
      //验证用户名，不符合规则提示后返回
      if (!reg.test(uname)) {
        this.$messagebox("错误", "输入用户名格式不正确");
        return;
      }
      //验证用户密码，不符合规则提示后返回
      if (!reg.test(upwd)) {
        this.$messagebox("错误", "输入密码格式不正确");
        return;
      }

      // console.log(user)//有

      let result = await Login(user);


      if (result.code == 200) {
        this.$router.push("/cart");
      } else {
        this.$messagebox("错误", result.msg);
      }

      // this.$router.push("/product");
    }
  }
};
</script>

<style>
</style>