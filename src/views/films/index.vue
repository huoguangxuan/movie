<template>
  <div class="goods">
    <van-search
      v-model="value"
      show-action
      label="地址"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <the-footer activeIndex="1" />
  </div>
</template>

<script>
import { Search, Grid, GridItem } from "vant";
import TheFooter from "@/components/TheFooter";
export default {
  components: {
    [Search.name]: Search,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    "the-footer": TheFooter
  },

  data() {
    return {
      value: ""
    };
  },

  methods: {
    onSearch() {
      this.$router.push("cart");
    }
  }
};
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
  .the-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
