<template>
  <div>
    <van-nav-bar title="关于"></van-nav-bar>
    <van-image
      width="90"
      height="90"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
    />
    <div class="lianTong">联通手机营业厅</div>
    <div>
      <van-cell is-link @click="showPopup">隐私权政策</van-cell>
      <van-popup v-model="show">内容</van-popup>
      <van-cell is-link @click="showPopup1">用户协议</van-cell>
      <van-popup v-model="show1">内容</van-popup>
    </div>
  </div>
</template>
<script>
import { Cell, Image as VanImage, Toast, NavBar, Popup } from "vant";
import api from "@/api";
export default {
  data: function() {
    return {
      loading: false,
      show: false,
      show1: false
    };
  },
  components: {
    [VanImage.name]: VanImage,
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell
  },
  mounted() {
    this.$store.dispatch("changenavshow", false); //关闭下面的footer显示
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    showPopup1() {
      this.show1 = true;
    }
  }
};
</script>
<style>
.hairlines {
  background: #f4f4f4 !important;
}
#app {
  background: #f4f4f4 !important;
}
</style>
<style lang="less" scoped>
/deep/ .van-nav-bar__title {
  color: #333333;
  font-size: 16px;
}
.van-image {
  display: block;
  margin: 20% auto 2%;
  /deep/ &__img {
    border-radius: 10px;
  }
}
.lianTong {
  color: #333333;
  text-align: center;
  margin: 0 0 10% 0;
  font-size: 16px;
}
.van-cell__value--alone {
  color: #333333;
  font-size: 14px;
}
</style>
