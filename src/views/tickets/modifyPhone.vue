<template>
  <div class="modifyphone">
    <div class="title">
      输入手机号
    </div>
    <div class="divider"></div>
    <div class="phone">
      <span class="left">手机号码</span><input type="number" />
    </div>
    <van-button
      class="btn"
      round
      @click.stop="
        $router.push({
          path: '/orderConfirm',
          params: {}
        })
      "
      color="linear-gradient(to right, #F8A10E, #EE6806)"
      >确定</van-button
    >
  </div>
</template>

<script>
import { Button } from "vant";
import api from "@/api";
export default {
  components: {
    [Button.name]: Button
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.modifyphone {
  width: 100vw;
  height: 100vh;
  .title {
    height: 44px;
    background-color: white;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #333333;
    line-height: 44px;
    text-align: center;
  }
  .phone {
    height: 50px;
    padding: 0px 17px;
    background-color: white;
    .left {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #333333;
      line-height: 50px;
      padding-right: 20px;
    }
    input {
      height: 50px;
      font-size: 16px;
    }
  }
  .btn {
    width: 100vw;
    height: 50px;
    border-radius: 50px;
    position: absolute;
    bottom: 20px;
  }
}
</style>
