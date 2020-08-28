<template>
  <van-grid :column-num="4" :border="false" ref="theFooter" class="the-footer">
    <van-grid-item
      icon="home-o"
      text="首页"
      :class="{ active: activeIndex == 0 }"
      to="/"
    />
    <van-grid-item
      icon="search"
      :class="{ active: activeIndex == 1 }"
      text="影片"
      to="/films"
    />
    <van-grid-item
      icon="home-o"
      text="影院"
      :class="{ active: activeIndex == 2 }"
      to="/cinemas"
    />
    <van-grid-item
      icon="search"
      :class="{ active: activeIndex == 3 }"
      text="我的"
      to="/choseSeat"
    />
  </van-grid>
</template>
<script>
import { Grid, GridItem } from "vant";
export default {
  name: "the-footer",
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  props: {
    activeIndex: String,
    default: function() {
      return "0";
    }
  },
  mounted() {
    // console.log(this.activeIndex);
    // console.log(this.$refs["theFooter"].children[this.activeIndex]);
  }
};
</script>
<style lang="less" scoped>
.the-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  .active {
    color: orangered;
    /deep/.van-grid-item__text {
      color: orangered;
    }
  }
}
</style>
