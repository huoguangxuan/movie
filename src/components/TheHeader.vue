<template>
  <div class="header tit1">
    <van-icon class="back" @click="$router.back(-1)" name="arrow-left" />
    <h3 class="page-name">{{ title }}</h3>
    <div class="timer "><slot></slot></div>
  </div>
</template>
<script>
import { Icon } from "vant";
export default {
  name: "the-header",
  props: {
    title: {
      type: String,
      default: "标题"
    }
  },
  components: {
    [Icon.name]: Icon
  }
};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  height: 44px;
  align-items: center;
  background: #fff;
  .back {
    color: #333;
    font-size: 16px;
    font-weight: 500;
    // font-weight: bold;
    padding-left: 17px;
    width: 60px;
    text-align: left;
  }

  .timer {
    width: 60px;
    padding-right: 17px;
    text-align: right;
  }
  .page-name {
    flex: 1;
    text-align: center;
  }
}
</style>
