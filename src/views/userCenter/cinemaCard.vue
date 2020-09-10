<template>
  <div class="mycinemaCard">
    <van-nav-bar title="我的影城卡" @click-right="onClickRight">
      <template #right>
        <van-cell is-link>开卡记录</van-cell>
      </template>
    </van-nav-bar>
    <van-cell title="开通更多影城卡" :icon="backG.vip" is-link to="/index" />
    <div v-if="noData" class="noData">空空如也~</div>
    <div v-else style="height:calc(100vh - 4rem);padding-bottom: 1.6rem;overflow-y: scroll">
      <div class="list" v-for="(item, ind) in this.list" :key="ind">
        <div class="bgBox">
          <img v-if="item.cardStatus == 0" :src="backG.notExpired" alt />
          <img v-if="item.cardStatus == 1" :src="backG.ineffective" alt />
          <img v-if="item.cardStatus == 2" :src="backG.expired" alt />
        </div>
        <div class="listDetails">
          <div class="listDetailCont">
            <div class="validityTime" v-if="item.cardStatus == 0" style="background:#70D693;">未过期</div>
            <div class="validityTime" v-if="item.cardStatus == 1" style="background:#ff8609;">未生效</div>
            <div class="validityTime" v-if="item.cardStatus == 2" style="background:#B5B5B5;">已过期</div>
            <div class="listCont">
              <van-image round width="25px" height="25px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <div class="cinema">
                <span>{{ item.cinemaName }}</span>
                <span class="cinemaCard">{{ item.cardName }}</span>
              </div>
            </div>
            <div class="total">
              <span>已购{{ item.buyNum }}张影票</span>
              <span class="totalMoney">累计为您节省{{ item.totalSaving }}元</span>
            </div>
            <div class="time">
              <van-cell
                value="查看详情"
                is-link
                @click.stop="$router.push({ path: '/order', query: { } })"
              >
                <template #title>
                  <span class="custom-title">{{ item.expiredDate }}</span>
                </template>
              </van-cell>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  NavBar,
  Toast,
  Button,
  Tab,
  Tabs,
  List,
  Cell,
  CellGroup,
  Image as VanImage
} from "vant";
import BScroll from "better-scroll";
import api from "@/api";
export default {
  data: function() {
    return {
      list: [],
      noData: "",
      backG: {
        vip: require("@/assets/images/vip.png"),
        notExpired: require("@/assets/images/notExpired.png"),
        ineffective: require("@/assets/images/ineffective.png"),
        expired: require("@/assets/images/expired.png")
      },
      phoneNo: "1646556565"
    };
  },
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [VanImage.name]: VanImage,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  mounted() {
    this.getCinemaCard();
    this.$store.dispatch("changenavshow", false); //关闭下面的footer显示
  },
  methods: {
    onClickRight() {
      Toast("按钮");
    },
    getCinemaCard() {
      const params = {
        phoneNo: this.phoneNo
      };
      api
        .getCinemaCard(params)
        .then(res => {
          if (res.data.length == 0 || !res) {
            this.noData = true;
            return;
          } else {
            this.list.push(...res.data);
            console.log(this.list);
          }
        })
        .catch(err => {
          Toast("系统异常，请稍后重试");
        });
    },
    // 去购票
    goTicket() {
      const params = {
        cinemaId: this.cinemaId,
        operat: this.operat
      };
      api
        .getMessage(params)
        .then(res => {
          if (!res) return;
        })
        .catch(err => {
          Toast("系统异常，请稍后重试");
        });
    }
  }
};
</script>
<style lang="less" scoped>
.mycinemaCard {
  background-color: #f4f4f4;
  overflow: hidden;
  // overflow-y: scroll;
  //padding-bottom: 60px;
  height: calc(100vh);
  /deep/ .van-nav-bar__title {
    color: #333333;
    overflow: initial;
    font-size: 16px;
  }
  .van-nav-bar__right .van-cell {
    padding: 0;
    height: inherit;
    font-size: 12px;
    .van-cell__value--alone {
      color: #333333;
    }
  }
  .van-nav-bar .van-icon {
    margin-left: 0;
    color: #333333;
    min-width: 5px;
    height: 7px;
    font-size: inherit;
    line-height: 7px;
  }
  .van-cell {
    align-items: center;
    color: #333333;
    font-size: 12px;
    height: 1.2rem;
    margin: 10px 0 0 0;
    .van-cell__left-icon {
      width: 20px;
      height: 15px;
      line-height: 15px;
      .van-icon__image {
        width: 20px;
        height: 15px;
        vertical-align: inherit;
      }
    }
    .van-cell__right-icon {
      margin-left: 0;
      color: #333333;
      min-width: 0.13333rem;
      height: 0.18667rem;
      font-size: inherit;
      line-height: 0.18667rem;
    }
  }
  .list {
    width: 90%;
    margin: 10px auto;
    position: relative;
    height: 130px;
    color: #fff;
    .bgBox {
      width: 100%;
      border-radius: 5px;
      overflow: hidden;
      img {
        border-radius: 5px;
        width: 100%;
        height: 130px;
      }
    }
    .listDetails {
      z-index: 10;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .listDetailCont {
        position: relative;
        width: 100%;
        height: 130px;
        .validityTime {
          position: absolute;
          top: 0;
          right: 0;
          background: #ffb615;
          width: 75px;
          height: 25px;
          font-size: 12px;
          border-radius: 0 5px 0 0;
          text-align: center;
          line-height: 25px;
        }
        .listCont {
          width: calc(100% - 20px);
          margin: 0 auto;
          display: flex;
          align-items: center;
          padding: 3% 0 0 20px;
          font-size: 14px;
          .cinema {
            color: #fff;
            margin: 0 0 0 10px;
            flex: 1;
            .cinemaCard {
              margin-left: 10px;
            }
          }
        }
        .total {
          width: calc(100% - 55px);
          display: flex;
          align-items: center;
          margin: 3% auto;
          font-size: 12px;
          .totalMoney {
            margin-left: 20px;
          }
        }
        .time {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          .van-cell {
            color: #fff;
            background: rgba(151, 151, 151, 0.2);
            font-size: 12px;
            margin: 0 auto;
            height: 25px;
            line-height: 25px;
            border-radius: 0 0 5px 5px;
            padding: 2px 10px;
            .van-cell__value {
              font-size: 10px;
              color: #fff;
            }
            .van-cell__right-icon {
              width: 5px;
              height: 7px;
              line-height: 7px;
              font-size: 10px;
              color: #fff;
            }
          }
        }
      }
    }
  }
  .noData {
    font-size: 14px;
    text-align: center;
    margin: 7% auto;
  }
}
</style>
