<template>
  <div class="films">
    <van-tabs
      style="position:fixed;top:0;width:100%;z-index:2"
      v-model="active"
    >
      <van-tab title="正在热映" to="/films/hotfilms"></van-tab>
      <van-tab title="即将上映" to="/films/thefilms"></van-tab>
    </van-tabs>
    <div class="divider"></div>
    <router-view></router-view>
    <the-footer activeIndex="1" />
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import TheFooter from "@/components/TheFooter";
export default {
  components: {
    "the-footer": TheFooter,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      active: "1"
    };
  }
};
</script>

<style lang="less">
.films {
  margin-top: 43px;
  .tab-content {
    background-color: #fff;
    .item {
      padding: 10px 17px;
      display: flex;
      border-bottom: 8px solid #f4f4f4;
      .poster {
        width: 60px;
        height: 100px;
        border-radius: 3px;
        margin-right: 8px;
      }
      .info {
        flex: 1;
        margin-right: 10px;
        .hot-score {
          margin: 3px 0px;
        }
      }
      .score {
        align-self: center;
        text-align: center;

        .buy-btn {
          margin-top: 8px;
          padding: 5px 15px;
        }
      }
    }
  }
  /deep/ .van-tab--active {
    color: #ff6024;
  }
  /deep/ .van-tabs__line {
    background-color: #ff6024;
    height: 2px;
  }
  /deep/ .van-list__finished-text,
  .van-list__loading {
    margin-bottom: 90px;
  }
}
</style>
