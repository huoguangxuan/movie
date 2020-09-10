<template>
  <div class="footer">
    <van-tabbar v-model="active">
      <van-tabbar-item to="/home">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.homes : icon.home" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/films">
        <span>影片</span>
        <template #icon="props">
          <img :src="props.active ? icon.ticketss : icon.tickets" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/cinemas">
        <span>影院</span>
        <template #icon="props">
          <img :src="props.active ? icon.cinemass : icon.cinemas" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/userCenter">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? icon.usercenters : icon.usercenter" />
        </template>
      </van-tabbar-item>
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
  data () {
    return {
      active: 0,
      icon: {
        homes: require("@/assets/images/home-s.png"),
        home: require("@/assets/images/home.png"),
        ticketss: require("@/assets/images/tickets-s.png"),
        tickets: require("@/assets/images/tickets.png"),
        cinemass: require("@/assets/images/cinemas-s.png"),
        cinemas: require("@/assets/images/cinemas.png"),
        usercenters: require("@/assets/images/usercenter-s.png"),
        usercenter: require("@/assets/images/usercenter.png")
      }
    };
  },
  watch: {
    "$route.path": function(newVal, oldVal) {
      switch (newVal) {
        case "/home":
          this.active = 0;
          break;
        case "/films/hotfilms":
          this.active = 1;
          break;
        case "/films/thefilms":
          this.active = 1;
          break;
        case "/cinemas":
          this.active = 2;
          break;

        case "/userCenter":
          this.active = 3;
          break;

        default:
          this.active = 0;
      }
      if (newVal == "/home") {
        this.active = 0;
      }
      if (newVal == "/films/hotfilms" || newVal == "/films/thefilms") {
        this.active = 1;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  width: 100vw;
  height: 49px;
  /deep/ .van-tabbar-item--active {
    color: #ff7030;
  }
}
</style>
