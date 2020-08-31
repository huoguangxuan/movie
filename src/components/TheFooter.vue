<template>
  <div class="footer">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/films">影片</van-tabbar-item>
      <van-tabbar-item icon="coupon-o" to="/cinemas">影院</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/userCenter">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="less" scoped>
.footer {
  width: 100vw;
  height: 49px;
}
</style>
