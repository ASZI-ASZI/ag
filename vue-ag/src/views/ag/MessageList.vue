<template>
  <div class="new">
    <div v-for="(item,i) in rows" :key="i" class="content">
      <!-- 1.中间标题和子标题 -->
      <li class="container-box">
        <div class="container-title ">{{item.title}}</div>
        <!-- 2.左侧1个图片 -->
        <div class="container-img">
          <img :src="require(`@/assets/img/${item.img}`)" />
        </div>
        <div class="container-subtitle">{{item.subtitle}}</div>
        <!-- 3.时间 -->
        <div class="container-time">{{item.time}}</div>
      </li>
    </div>
  </div>
</template>

<script>
//(1.1)引入json文件->js object
import list from "@/assets/json/messagelist.json";
export default {
  data() {
    return {
      rows: list.data
    };
  }
};
</script>

<style>
.new{
  padding: 0;
  margin: 0;
}
.content {
  width: 100%;
  height: 100%;
  background: #ffffff;
  position: relative;
  top: 1.9rem;
  padding-top: 10px;
}
.container-box {
  width: 100%;
  height: auto;
  background: white;
  border-bottom: 1px dotted #cccccc;
  padding-bottom: 0.3rem;
  padding-top: 10px;
}
.container-title {
  color: #505b63;
  width: 95%;
  margin: auto;
  text-align: left;
  font-size: 1rem;
  height: 1.5rem;
  line-height: 1.5rem;
}
.container-img {
  width: 95%;
  height: 18.3rem;
  margin: auto;
}
img {
  width: 100%;
  height: 100%;
}
.container-subtitle {
  width: 95%;
  margin: auto;
  line-height: 0.5rem;
  padding-top: 0.5rem;
  color: #696969;
  text-align: justify;
  font-size: 0.3rem;
}
.container-time {
  width: 95%;
  text-align: left;
  margin: auto;
  padding-top: 0.2rem;
  font-size: 0.3rem;
  color: #696969;
}
li{
  list-style: none;
}
</style>