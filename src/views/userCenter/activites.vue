<template>
  <div class="myCont">
    <div class="bgBox">
      <img src="https://img.yzcdn.cn/vant/ipad.jpeg" alt />
    </div>
    <div class="Box">
      <div class="boxCont">
        <van-image round width="1.5rem" height="1.5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div class="information">
          <div class="nickname">村东头的年华</div>
          <div class="package">
            <span class="packageText">畅爽冰淇淋5g套餐129元</span>
            <span class="city">四川 成都</span>
          </div>
        </div>
      </div>
      <van-tabbar>
        <van-tabbar-item icon="https://img.yzcdn.cn/vant/cat.jpeg">联名卡权益</van-tabbar-item>
        <van-tabbar-item icon="https://img.yzcdn.cn/vant/cat.jpeg">优惠券</van-tabbar-item>
      </van-tabbar>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="我的订单" name="1" icon="https://img.yzcdn.cn/vant/ipad.jpeg">
          <van-tabbar>
            <van-tabbar-item
              icon="https://img.yzcdn.cn/vant/cat.jpeg"
              :badge="unPayNu"
              @click="unPayNuTo"
            >待付款</van-tabbar-item>
            <van-tabbar-item
              icon="https://img.yzcdn.cn/vant/cat.jpeg"
              :badge="unUseNum"
              @click="unUseNumTo"
            >待使用</van-tabbar-item>
          </van-tabbar>
        </van-collapse-item>
      </van-collapse>
      <van-cell title="想看的影片" icon="https://img.yzcdn.cn/vant/ipad.jpeg" is-link to="index" />
      <van-cell title="我的影评" icon="https://img.yzcdn.cn/vant/ipad.jpeg" is-link to="index" />
      <van-cell title="我的收藏" icon="https://img.yzcdn.cn/vant/ipad.jpeg" is-link to="index" />
      <van-cell title="关于" icon="https://img.yzcdn.cn/vant/ipad.jpeg" is-link to="index" />
      <van-cell title="我的客服" icon="https://img.yzcdn.cn/vant/ipad.jpeg" is-link to="index" />
    </div>
  </div>
</template>
<script>
import {
  Toast,
  Image as VanImage,
  Tabbar,
  TabbarItem,
  Collapse,
  CollapseItem,
  Icon,
  Cell,
  CellGroup
} from "vant";
import BScroll from "better-scroll";
import api from "@/api";
export default {
  data: function() {
    return {
      selectedSeat: [],
      activeNames: ["1"],
      unUseNum: "",
      unPayNu: "",
      loading: false
    };
  },
  watch: {
    selectedSeat: function(value) {
      let width = this.propSelectedSeat.length * 1.2 + 0.6;
      this.$refs.scrollUl.style.width = width + "rem";
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.scroll, {
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
  },
  components: {
    [VanImage.name]: VanImage,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  mounted() {
    this.getBaseMessage();
  },
  methods: {
    getBaseMessage() {
      const params = {};
      api
        .getBaseMessage()
        .then(res => {
          if (!res || res == "0000") return;
          this.unPayNu = res.data.unPayNu;
          this.unUseNum = res.data.unUseNum;
        })
        .catch(err => {
          Toast("系统异常，请稍后重试");
        });
    },
    unPayNuTo() {
      Toast("待付款");
    },
    unUseNumTo() {
      Toast("去使用");
    }
  }
};
</script>
<style>
body {
  background-color: #f4f4f4;
}
</style>
<style lang="less" scoped>
.myCont {
  padding-bottom: 60px;
  height: calc(100vh - 60px);
  position: relative;
  .bgBox {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 0;
    z-index: -1;
    img {
      width: 100%;
      opacity: 1;
    }
  }
  .Box {
    width: 90%;
    margin: 0 auto;
    .boxCont {
      width: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      padding: 7% 0;
      .van-image--round {
        border: 2px solid red;
      }
      .information {
        color: #fff;
        margin: 0 0 0 5%;
        flex: 1;
        .nickname {
          font-weight: 900;
          font-size: 16px;
        }
        .package {
          font-size: 12px;
          .city {
            margin: 0 0 0 4%;
          }
        }
      }
    }
    /deep/ .van-tabbar-item {
      font-size: 10px;
    }
    .van-tabbar--fixed {
      position: inherit;
      border-radius: 5px;
      .van-tabbar-item--active {
        color: #434343;
      }
      /deep/ .van-tabbar-item__icon img {
        width: 1rem;
        height: 1rem;
      }
    }
    .van-tabbar {
      height: 1.7rem;
      margin: 0 0 6% 0;
    }
    /deep/ .van-cell {
      align-items: center;
      color: #333333;
      border-radius: 5px;
      font-size: 14px;
      .van-cell__left-icon {
        height: initial;
        .van-icon__image {
          width: 2em;
          height: 2em;
        }
      }
    }
    .van-collapse-item__wrapper {
      .van-tabbar {
        margin: 0;
      }
    }
  }
  /deep/ .van-collapse-item__content {
    padding: 1%;
  }
  /deep/ .van-info {
    background-color: #ff6024;
    font-size: 10px;
  }
}
</style>
