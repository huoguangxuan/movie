<template>
  <div class="films">
    <van-tabs style="position:fixed;top:0;width:100%;z-index:2"
              v-model="active">
      <van-tab title="正在热映"
               to="/films/hotfilms"></van-tab>
      <van-tab title="即将上映"
               to="/films/thefilms"></van-tab>
    </van-tabs>
    <div class="divider"></div>
    <router-view></router-view>
  </div>
</template> 

<script>
import { Tab, Tabs } from "vant";
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data () {
    return {
      active: 0
    };
  },
  created () {
    this.active = this.$route.query.active;
  },
  mounted () { },
  methods: {},
  watch: {
    "active": function (newVal, oldVal) {
      if (this.active == 0) {
        this.$router.push("/films/hotfilms")
      }
      if (this.active == 1) {
        this.$router.push("/films/thefilms")
      }
    }
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
