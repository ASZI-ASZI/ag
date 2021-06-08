<template>
  <div>
    <div class>
      <mt-field label="账号" v-model="regForm.uname" type="text" placeholder="请输入账号" />
      <mt-field label="密码" v-model="regForm.upwd" type="password" placeholder="请输入密码" />
      <mt-field
        label="手机"
        v-model="regForm.phone"
        type="password"
        ref="pwdConfirm"
        placeholder="请输入手机号"
      />
      <mt-field label="邮箱" v-model="regForm.email" type="email" placeholder="请输入邮箱" />
      <div class="content-padded">
        <mt-button @click="register" size="large">注册</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Register } from "@/assets/js/apis/user.js";
export default {
  data() {
    return {
      regForm: {
        uname: "dingding2",
        upwd: "123456",
        phone: "1398765432",
        email: "123@wweii.com"
      }
    };
  },
  methods: {
    async register() {
      if (this.regForm.uname === "") {
        this.$toast("账号不能为空");
        return;
      } else if (this.regForm.upwd === "") {
        this.$toast("密码不能为空");
        return;
      } else if (this.regForm.phone === "") {
        this.$toast("手机号不能为空");
        return;
      } else if (this.regForm.email === "") {
        this.$toast("邮箱不能为空");
        return;
      }
      // this.$indicator.open({
      //   text: "注册中"
      // });
      let user = {...this.regForm };
      console.log(user);
      let result =  await Register(user)
      console.log(result);
      if(result.code==200){
        this.$router.push("/Login");
      }else{
        this.$messagebox("错误", result.msg);
      }


      


      // this.$indicator.close();


    }
  }
};
</script>

<style >
</style>

