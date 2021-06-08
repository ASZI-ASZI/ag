import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Product from "@/views/ag/Product.vue"
import Login from "@/views/ag/Login.vue"
import MessageList from "@/views/ag/MessageList.vue"
import Cart from "@/views/ag/Cart.vue"
import Register from "@/views/ag/Register.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "首页" }
  },

  {
    path: "/messagelist",  
    component: MessageList,
    meta: { title: "详情" }
  },

  {
    path: "/product",
    component: Product,
    meta: { title: "商品" }
  },
  {
    path: "/login", component: Login,
    meta: { title: "登录" }
  },
  {
    path: "/register", component: Register,
    meta: { title: "注册" }
  },
  {
    path: "/cart", component: Cart,
    meta: { title: "购物车" }
  }
];

const router = new VueRouter({
  //mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
