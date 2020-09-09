<template>
  <div class="order">
    <div class="header tit1">
      <van-icon class="back" @click="$router.back(-1)" name="arrow-left" />
      <h3 class="page-name">确认订单</h3>
      <div class="timer orange" id="countDown">{{ hottime }}</div>
    </div>
    <div class="divider"></div>
    <div class="ticket-info">
      <img class="poster" :src="order.posterUrl" alt="" />
      <div class="film-info">
        <h3 class="font18 black">{{ order.movieName }}</h3>
        <p class="p-line">{{ order.showStartTime }} （{{ order.language }}）</p>
        <p class="p-line">{{ order.cinemaName }}</p>
        <p class="p-line">
          <span>{{ order.hallCode }} | </span>
          <span v-for="seat in order.seats" :key="seat.seatId">
            {{ seat.rowNum }}排{{ seat.columnNum }}座
          </span>
        </p>
      </div>
    </div>
    <div class="features">
      <div class="the-feature">
        <div>
          <img
            class="feature-icon"
            :src="order.isRefund === '1' ? support : nosupport"
          />
          <span style="display:inline-block" class="font12 black">{{
            reFund
          }}</span>
        </div>
        <div>
          <img
            class="feature-icon"
            :src="order.isChange === '1' ? support : nosupport"
          />
          <span style="display:inline-block" class="font12 black">
            {{ reChange }}</span
          >
        </div>
      </div>
      <div class="prices black font12">
        （共{{ order.totalNum }}张）&nbsp; 原价￥{{ order.totalPrice }}
      </div>
    </div>
    <div class="divider"></div>
    <div class="coupons">
      <h3 class="tit1">本单可享优惠</h3>
      <div class="activity">
        <p class="font14 activity-name">优惠券&活动</p>
        <div class="activity-path font14">
          已选择
          <van-icon style="position:relative;top:2px" name="arrow" />{{
            discart.name
          }}
        </div>
      </div>
      <div
        class="coupon-item"
        v-for="(discount, index) in order.discounts"
        :key="index"
        @click.prevent="$event => handleCart(discount, $event)"
      >
        <span class="black font14">{{ discount.name }} </span
        ><span class="orange font14" style="margin-right:20px"
          >￥{{ `-${discount.discount}` }}</span
        >
        <van-icon class="font14 gray check" name="passed" />
      </div>
    </div>
    <div class="divider"></div>
    <div class="monyway">
      <div class="monyway-title">
        <span>选择支付方式</span>
      </div>
      <div class="monyway-content">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell @click="radio = '1'">
              <template #title>
                <div>
                  <img src="@/assets/images/wechat.png" /><span>微信</span>
                </div>
              </template>
              <template #right-icon>
                <van-radio name="1">
                  <template #icon="props">
                    <img
                      class="img-icon"
                      :src="props.checked ? activeIcon : inactiveIcon"
                    />
                  </template>
                </van-radio>
              </template>
            </van-cell>
            <van-cell clickable @click="radio = '2'">
              <template #title>
                <div>
                  <img src="@/assets/images/my.png" /><span>沃钱包</span>
                </div>
              </template>
              <template #right-icon>
                <van-radio name="2">
                  <template #icon="props">
                    <img
                      class="img-icon"
                      :src="props.checked ? activeIcon : inactiveIcon"
                    />
                  </template>
                </van-radio>
              </template>
            </van-cell>
            <van-cell clickable @click="radio = '3'">
              <template #title>
                <img src="@/assets/images/bankcard.png" /><span>银行卡</span>
              </template>
              <template #right-icon>
                <van-radio name="3">
                  <template #icon="props">
                    <img
                      class="img-icon"
                      :src="props.checked ? activeIcon : inactiveIcon"
                    />
                  </template>
                </van-radio>
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </div>
    <div class="divider"></div>
    <router-link :to="{ path: '/modifyPhone', query: { oldMobile: oldPhone } }">
      <div class="user-mobile">
        <div class="mobile-icon">
          <img class="img-url" :src="mobileUrl" alt="" />
        </div>
        <div class="mobile">
          <p class="font14 black">{{ oldPhone }}</p>
          <p class="font12">此手机号仅用于生成订单</p>
        </div>
        <div class="action">
          <van-icon class="back font14" name="arrow" />
        </div>
      </div>
    </router-link>
    <div class="divider"></div>
    <div class="attention">
      <h3 class="font18 black">购票须知</h3>
      <p>1.请提前到达影院现场，找到自助取票机，打印纸质电影票，完 成取票。</p>
      <p>2.如现场自助取票机无法打印电影票，请联系影院工作人员处理。</p>
      <p>3.凭打印好的纸质电影票，检票入场观影。</p>
      <p>4.如果订单使用了兑换券，或购买了特殊场次，暂不支持退票和 改签。</p>
      <p>
        5.如有开具所购电影票发票的需求，请保留好电影票根，尽量在
        观影当天联系影城工作人员进行开具，如遇特殊情况请及时联系
        影票平台人工客服咨询。
      </p>
      <p>
        6.改签、退票服务由影城决定，特殊场次及使用兑换卷的场次不
        支持改签、退票。
      </p>
    </div>
    <div class="divider"></div>
    <div class="buy-panel">
      <p class="orange font18">
        <strong>￥{{ payPrice }}</strong>
      </p>
      <div class="action-detail font14" @click="toggleShowDetail">
        明细
        <van-icon :name="showDetail ? 'arrow-down' : 'arrow-up'" />
      </div>
      <van-button
        class="font16"
        round
        color="linear-gradient(to right, #F8A10E, #EE6806)"
        @click="$router.push('/booking')"
        >立即付款</van-button
      >
    </div>
    <van-popup
      v-model="showDetail"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div class="popup-title font18 ac black">
        结算明细
        <van-icon @click="toggleShowDetail" class="cross font18" name="cross" />
      </div>
      <div class="popup-body">
        <div class="font16 black">电影票{{ order.totalNum }}张</div>
        <p class="content">
          <span class="font14 left-text"> 原价 </span>
          <span class="font14"> ￥{{ order.totalPrice }}</span>
        </p>
        <p class="content" v-if="discart.name">
          <span class="font14 left-text"> {{ discart.name }} </span>
          <span class="font14 orange"> ￥-{{ discart.discount }}</span>
        </p>
      </div>
    </van-popup>
  </div>
</template>
<script>
import api from "@/api";
import { Icon, Button, Popup, Radio, RadioGroup, Cell, CellGroup } from "vant";
export default {
  name: "order-confirm",
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data: function() {
    return {
      order: {},
      hottime: "",
      mobileUrl: require("@/assets/images/mobile.png"),
      showDetail: false,
      radio: "2",
      activeIcon: require("@/assets/images/pitchon.png"),
      inactiveIcon: require("@/assets/images/unselected.png"),
      oldPhone: "13109098766",
      useCart: false,
      discart: { name: "" },
      support: require("@/assets/images/support.png"),
      nosupport: require("@/assets/images/nosupport.png")
    };
  },
  computed: {
    payPrice() {
      if (this.discart.discount)
        return this.order.totalPrice - this.discart.discount;
      return this.order.totalPrice;
    },
    reChange() {
      return this.order.isChange === "1" ? "支持改签" : "不支持改签";
    },
    reFund() {
      return this.order.isRefund === "1" ? "支持退票" : "不支持退票";
    }
  },
  created() {
    this.getOrderInfo();
    this.oldPhone = this.$route.query.newMobile;
  },
  mounted() {
    this.countDown();
  },
  methods: {
    getOrderInfo() {
      const params = {
        cinemaId: "11111111111",
        movieId: "2222222222",
        showId: "333332",
        seats: [
          {
            rowId: "1",
            columnId: "1",
            rowNum: "1",
            columnNum: "1",
            type: "0",
            regionId: "234567",
            seatId: "0001"
          },
          {
            rowId: "1",
            columnId: "1",
            rowNum: "1",
            columnNum: "1",
            type: "0",
            regionId: "234567",
            seatId: "0001"
          }
        ]
      };
      api.tickets
        .getOrderInfo(params)
        .then(res => {
          console.log(res);
          this.order = res.data;
        })
        .catch();
    },
    toggleShowDetail() {
      this.showDetail = !this.showDetail;
    },
    handleCart(val, e) {
      const iconEle = e.currentTarget.lastElementChild;
      const passed =
        iconEle.className == "font14 gray check van-icon van-icon-passed";
      if (passed) {
        this.discart = val;
        document.querySelectorAll(".van-icon-checked").forEach(item => {
          item.className = "font14 gray check van-icon van-icon-passed";
        });
        iconEle.className = "font14 check van-icon green van-icon-checked";
      } else {
        this.discart = {};
        iconEle.className = "font14 gray check van-icon van-icon-passed";
      }
    },
    timeStamp(second_time) {
      if (second_time <= 0) {
        return;
      }
      var time =
        "<div><p><span>00</span>天</p><p><span>00</span>时<span>00</span>分<span>" +
        parseInt(second_time) +
        "</span>秒</p></div>";
      if (parseInt(second_time) > 60) {
        var second = parseInt(second_time) % 60;
        var min = parseInt(second_time / 60);
        time = min + "</span>分<span>" + second + "</span>秒</p>";
        if (min > 60) {
          min = parseInt(second_time / 60) % 60;
          var hour = parseInt(parseInt(second_time / 60) / 60);
          time = min + "</span>分<span>" + second + "</span>秒</p></div>";
          if (hour > 24) {
            hour = parseInt(parseInt(second_time / 60) / 60) % 24;
            var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
            time =
              "<div><p><span>" +
              day +
              "</span>天</p><p><span>" +
              hour +
              "</span>时<span>" +
              min +
              "</span>分<span>" +
              second +
              "</span>秒</p></div>";
          }
        }
      }
      return time;
    },
    countDown() {
      setInterval(() => {
        var expireTime = 1599630301000; //订单过期时候的时间戳，或者是一个其它时间，这里灵活处理
        var houtime = Number(expireTime - Date.parse(new Date())) / 1000; //秒
        // document.getElementById("countDown").innerHTML = this.timeStamp(
        //   houtime
        // );
        if (houtime <= 0) {
          return;
        }
        if (parseInt(houtime) > 60) {
          const second = parseInt(houtime) % 60;
          const min = parseInt(houtime / 60);
          this.hottime = `${min >= 10 ? "" : "0"}${min}:${
            second >= 10 ? "" : "0"
          }${second}`;
        }
        // this.hottime = houtime;
        // console.log(this.timeStamp(houtime));
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
.order {
  .header {
    display: flex;
    height: 44px;
    align-items: center;
    background: #fff;
    position: fixed;
    top: 0;
    width: 100%;
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
  .ticket-info {
    margin-top: 44px;
    display: flex;
    background-color: #fff;
    align-items: center;
    padding: 10px 17px;
    border-bottom: 1px solid #ececec;
    // flex-direction: row;

    .poster {
      margin-right: 20px;
      width: 90px;
      height: 120px;
      border-radius: 5px;
    }
    .film-info {
      flex: 1;
      .p-line {
        margin: 10px 0px;
        font-size: 12px;
      }
    }
  }
  .features {
    display: flex;
    align-items: center;
    padding: 8px 17px;
    background: #fff;
    .the-feature {
      flex: 1;
      display: flex;
      align-items: center;
      .feature-icon {
        width: 14px;
        height: 14px;
        margin-right: 5px;
        position: relative;
        top: -2px;
      }
      span {
        display: flex;
        align-items: center;
        margin-right: 12px;
        font-size: 12px;
      }
    }
  }
  .coupons {
    background-color: #fff;
    padding: 10px 17px;
    .activity {
      display: flex;
      margin-top: 15px;
      margin-bottom: 10px;
      .activity-name {
        flex: 1;
      }
    }

    .coupon-item {
      display: flex;
      padding: 13px 10px;
      background: rgba(255, 230, 166, 0.5);
      border-radius: 8px;
      border-radius: 8px;
      margin-bottom: 10px;
      align-items: center;
      .check {
        font-size: 15px;
      }
      .black {
        flex: 1;
      }
    }
    .coupon-item:last-child {
      margin-bottom: 0px;
    }
  }
  .user-mobile {
    padding: 10px 17px;
    background-color: #fff;
    display: flex;
    align-items: center;
    .mobile-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      background-image: linear-gradient(270deg, #0f7aff 0%, #73bcff 100%);
      .img-url {
        width: 14px;
        height: 20px;
      }
    }
    .mobile {
      flex: 1;
      .black {
        margin-bottom: 5px;
      }
    }
    .action {
      width: 35px;
      text-align: right;
      font-weight: 600;
    }
  }
  .monyway {
    padding: 0px 17px;
    height: 200px;
    display: flex;
    flex-direction: column;
    background-color: white;
    .monyway-title {
      padding-top: 10px;
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #333333;
      line-height: 32px;
    }
    .monyway-content {
      flex: 1;
      .van-radio-group {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .img-icon {
          width: 15px;
          height: 15px;
        }
      }
      .van-cell {
        padding: 0;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        span {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          line-height: 14px;
          margin-left: 24px;
        }
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  .attention {
    padding: 10px 17px;
    background-color: #fff;
    .black {
      margin-bottom: 15px;
    }
    p {
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 18px;
    }
  }
  .buy-panel {
    padding: 10px 17px;
    display: flex;
    width: 341px;
    align-items: center;
    background-color: #fff;
    position: fixed;
    bottom: 0px;
    z-index: 9999;
    .orange {
      flex: 1;
    }
    .action-detail {
      margin-right: 25px;
    }
    /deep/ .van-button--round {
      padding-left: 28px;
      padding-right: 28px;
    }
  }
}
.popup-title {
  padding: 15px 0px;
  border-bottom: 1px solid #ececec;
  position: relative;
  .cross {
    position: absolute;
    top: 19px;
    right: 17px;
  }
}
.popup-body {
  padding: 10px 17px;
  .black {
    margin-top: 10px;
    margin-bottom: 15px;
  }
  .content {
    display: flex;
    margin-bottom: 10px;
  }
  .left-text {
    flex: 1;
  }
}
/deep/ .van-popup--bottom {
  bottom: 63px;
}
</style>
