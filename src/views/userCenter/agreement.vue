<template>
  <div>
    <van-nav-bar title="用户协议"></van-nav-bar>
    <div>
    </div>
  </div>
</template>
<script>
import { Cell, Toast, NavBar, Popup } from "vant";
import api from "@/api";
export default {
  data: function() {
    return {
      loading: false
    };
  },
  components: {
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell
  },
  mounted() {
    this.$store.dispatch("changenavshow", false); //关闭下面的footer显示
  },
  methods: {
  
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
</style>
