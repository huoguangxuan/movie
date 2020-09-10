<template>
  <div class="myCont">
    <div class="bgBox">
      <img src="@/assets/images/background.png" alt />
    </div>
    <div class="Box">
      <div class="boxCont">
        <van-image round width="1.5rem" height="1.5rem" :src="icon.head" />
        <div class="information">
          <div class="nickname">村东头的年华</div>
          <div class="package">
            <span class="packageText">畅爽冰淇淋5g套餐129元</span>
            <span class="city">四川 成都</span>
          </div>
        </div>
      </div>
      <van-tabbar>
        <van-tabbar-item :icon="icon.lmkicon" @click.stop="$router.push('/cobrandCard')">联名卡权益</van-tabbar-item>
        <van-tabbar-item :icon="icon.yhqicon" @click.stop="$router.push('/coupon')">优惠券</van-tabbar-item>
      </van-tabbar>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="我的订单" name="1" :icon="icon.myOrder">
          <van-tabbar>
            <van-tabbar-item
              :icon="icon.payment"
              :badge="unPayNu"
              @click.stop="$router.push({ path: '/order', query: { active:1, unPayNu: unPayNu } })"
            >待付款</van-tabbar-item>
            <van-tabbar-item
              :icon="icon.used"
              :badge="unUseNum"
              @click.stop="$router.push({ path: '/order', query: { active:2, unUseNum: unUseNum } })"
            >待使用</van-tabbar-item>
          </van-tabbar>
        </van-collapse-item>
      </van-collapse>
      <van-cell title="想看的影片" :icon="icon.tickets" is-link to="/favor" />
      <van-cell title="我的影评" :icon="icon.myReviews" is-link to="/comments" />
      <van-cell title="我的收藏" :icon="icon.myCollection" is-link to="/collection" />
      <van-cell title="关于" :icon="icon.about" is-link to="/about" />
      <van-cell
        title="我的客服"
        :icon="icon.myService"
        is-link
        to="/index"
        style="border-radius: 0 0 5px 5px;"
      />
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
      activeNames: ["1"],
      unUseNum: 0,
      unPayNu: 0,
      loading: false,
      icon: {
        head: require("@/assets/images/zeroyuan.jpg"),
        lmkicon: require("@/assets/images/lmkicon.png"),
        yhqicon: require("@/assets/images/yhqicon.png"),
        myOrder: require("@/assets/images/myOrder.png"),
        payment: require("@/assets/images/payment.png"),
        used: require("@/assets/images/used.png"),
        tickets: require("@/assets/images/tickets.png"),
        myReviews: require("@/assets/images/myReviews.png"),
        myCollection: require("@/assets/images/myCollection.png"),
        about: require("@/assets/images/about.png"),
        myService: require("@/assets/images/myService.png")
      }
    };
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
          if (!res || res.code != "0000") return;
          this.unPayNu = res.data.unPayNu;
          this.unUseNum = res.data.unUseNum;
        })
        .catch(err => {
          Toast("系统异常，请稍后重试");
        });
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
  //height: calc(100vh - 1.4rem);
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
      padding: 7% 0 13% 0;
      .van-image--round {
        border: 2px solid #fff;
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
        width: 32px;
        height: 25px;
        vertical-align: inherit;
      }
    }
    .van-tabbar {
      height: 1.7rem;
      margin: 0 0 2% 0;
    }
    /deep/ .van-cell:first-child {
      border-radius: 5px 5px 0 0;
    }
    /deep/ .van-cell {
      align-items: center;
      color: #333333;
      padding: 0.2rem 0.4rem;
      font-size: 14px;
      .van-cell__left-icon {
        height: initial;
        .van-icon__image {
          width: 32px;
          height: 25px;
        }
      }
    }
    .van-collapse-item {
      .van-collapse-item__wrapper {
        .van-tabbar {
          margin: 0;
        }
      }
    }
  }
  /deep/ .van-collapse-item__content {
    padding: 1%;
  }
  /deep/ .van-info {
    background-color: #ff6024;
    right: 0.13333rem;
  }
}
</style>
