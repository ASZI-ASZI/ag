<template>
  <div class="d-flex flex-column py-3" style="fontsize:12px">
    <!-- 全选按钮 -->
    <div class="d-flex align-items-center col-3">
      <input type="checkbox" v-model="checkAll" @change="selectAll" />全选
    </div>
    <!-- 购物车内容 -->
    <div class="border d-flex align-items-center" v-for="(item,i) of list" :key="i">
      <!-- 是否选中 -->
      <div class="col-1">
        <input type="checkbox" v-model="item.cb" @change="changedCheckItem" />
      </div>
      <!-- 商品名称 -->
      <div class="col-7 text-left">{{item.title}}</div>
      <!-- 价格 -->
      <div class="col-2">￥{{item.price}}</div>
      <!-- 删除按钮 -->
      <div class="col-2">
        <mt-button @click="deleteItem(item.iid)" plain><img src="@/assets/img/Trash.png"></mt-button>
      </div>
    </div>
    <div>
      <span class="col-2">购物车数量:{{count}}</span>
        <mt-button @click="delCheckedItems" class="border-radius: 15px;">删除选中的商品</mt-button>
        <mt-button @click="delAll">清空购物车</mt-button>
    </div>
  </div>
</template>

<script>
import { listCart } from "@/assets/js/apis/cart.js"; //导入接口获取购物车列表接口
import { deleteCart } from "@/assets/js/apis/cart.js"; //导入接口获取购物车列表接口
//console.log(listCart)
export default {
  data() {
    return {
      list: [], //购物车列表数据
      checkAll: false //是否全选
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    //清空购物车
    async delAll() {
      try {
        await this.$messagebox.confirm("确定是否要清空购物车");
        this.checkAll = true;
        for (let item of this.list) {
          item.cb = true;
        }
        this.delCheckedItems();
        this.checkAll = false;
      } catch (error) {
        console.log(error);
      }
    },

    // 删除选中的商品
    delCheckedItems() {
      // 提示用户  如果没有选中的商品
      if (this.list.length == 0) {
        this.$messagebox("提示: 当前没有可以删除的商品！");
        return;
      }
      let str_iids = "";
      // 用循环
      for (let item of this.list) {
        if (item.cb) {
          //被选中
          str_iids += item.iid + ",";
        }
      }
      if (str_iids.length == 0) {
        this.$messagebox("提示", "当前没有选中的商品！");
        return;
      }
      console.log(str_iids);
      //要去掉最后那个  ","
      str_iids = str_iids.substring(0, str_iids.length-1 );

      this.deleteItem(str_iids);
    },

    async deleteItem(iid) {
      console.log(this.list);
      //功能：删除iid对应的购物车商品
      try {
        //提示：否真的删除？
        await this.$messagebox.confirm("确定是否删除指定编号的商品?" + iid);
        //接下来 选择了确认
        //console.log("你选择了confirm"); //调试输出
        //准备好参数
        let params = { iid };
        //发送请求进行异步调用
        let result = await deleteCart(params);
        console.log(result); //调试输出
        //判断返回参数代码
        if (result.code == 300) {
          //需要用户登录（用户没有登录过，用户的seesion已过期）
          this.$toast("请首先登录！");
          this.$router.push("/login");
          return;
        }
        //处理返回数据
        if (result.code == 200) {
          //提示
          this.$toast("删除成功！");
          this.loadData(); //重新加载购物车数据
        } else {
          this.$messagebox("错误", result.msg);
        }
      } catch (error) {
        console.log("你选择了Cancel:" + error); //调试输出
      }
    },

    changedCheckItem() {
      //console.log("changedCheckItem方法被调用,待实现。。。。。。。。。。。。。。");
      //处理商品前面的检测框选中与否
      //计算被选中的个数 如果个数 > 0   = 0  =购物车商品记录个数 影响全选检测框的值
      let sum = 0;
      for (let item of this.list) {
        if (item.cb == true) sum++;
      }

      //判断选中的个数是否等于全部
      if (sum == this.list.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },

    selectAll() {
      //console.log("selectAll方法被调用,待实现。。。。。。。。。。。。。。");
      //对全部选中与否 处理
      for (let item of this.list) {
        item.cb = this.checkAll; //把全选检测框的值辅给list的cb属性
      }
    },

    async loadData() {
      let result = await listCart(); //异步调用
      console.log(result); //测试用

      if (result.code == 300) {
        //需要用户登录（用户没有登录过，用户的seesion已过期）
        this.$toast("请首先登陆！");
        this.$router.push("/login");
        return;
      }

      if (result.code == 200) {
        //处理返回后的数据  保存到list  添加一个check属性
        let rows = result.data;
        for (let item of rows) {
          item.cb = false;
        }
        this.list = rows; //将添加check属性后的数组保存到list
      } else {
        this.$messagebox("获取购物车列表错误", result.msg);
      }
    }
  },
  computed: {
    count() {
      return this.list.length;
    }
  }
};
</script>