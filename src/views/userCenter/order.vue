<template>
  <div class="myOrder">
    <div class="top">
      <van-nav-bar title="我的订单" />
      <van-search v-model="value" placeholder="搜索我的订单" @search="onSearch" />
    </div>
    <div class="myOffice">
      <van-tabs v-model="active" sticky @click="changeAct">
        <div>
          <van-tab v-for="(tab, ind) in title" :title="tab.text" :key="ind">
            <van-pull-refresh
              v-model="refreshing"
              @refresh="onRefresh"
              :head-height="50"
              success-text="刷新成功"
              style="height:calc(100vh - 5rem);padding-bottom: 1.3rem;overflow-y: scroll"
            >
              <div v-if="noData" class="noData">空空如也~</div>
              <template v-else>
                <van-list
                  v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad"
                  :error.sync="error"
                  error-text="请求失败，点击重新加载"
                >
                  <van-row
                    v-for="(item, index) in list"
                    :key="index"
                    gutter="6"
                    @click.stop="$router.push({path: '/film-detail',params: { movieId: item.sort }})"
                  >
                    <van-col span="5" style="padding:0;">
                      <img :src="item.posterUrl" class="leftImg" />
                    </van-col>
                    <van-col span="13" style="padding:0;">
                      <div v-if="type == 2">
                        <div class="van-row-movieName">
                          <div class="movieName van-ellipsis">{{ item.movieName }}</div>
                          <div class="times">
                            支付剩余时间：
                            <van-count-down :time="item.runDate" @finish="finish" />
                          </div>
                        </div>
                      </div>
                      <div v-else>
                        <div class="van-row-movieName">{{ item.movieName }}</div>
                      </div>
                      <p class>{{ item.runDate }}</p>
                      <p>{{ item.cinemaName }}</p>
                      <p>订单编号:{{ item.orderNo }}</p>
                    </van-col>
                    <van-col span="6">
                      <div v-if="type == 1">
                        <van-col span="24" v-if="item.runStatus == 0">
                          <!-- <img src="" class="rightImg" /> -->
                        </van-col>
                        <van-col span="24" v-if="item.runStatus == 1">
                          <img :src="icon.notShow" class="rightImg" />
                        </van-col>
                      </div>
                      <div v-if="type == 2" style="margin-top: 25%;">
                        <van-button
                          round
                          type="info"
                          @click.stop="$router.push({path: '/choseSeat',params: { movieId: item.sort }})"
                        >去付款</van-button>
                      </div>
                      <div v-if="type == 3" class="pay">
                        <div class="rightText">已付款</div>
                      </div>
                      <div v-if="type == 4">
                        <img :src="icon.notShow" class="rightImg" />
                      </div>
                      <div v-if="type == 5">
                        <div v-if="item.runStatus == 1" class="payMent">
                          <div class="rightText">退款中</div>
                        </div>
                        <div v-else>
                          <img :src="icon.refund" class="rightImg" />
                        </div>
                      </div>
                    </van-col>
                  </van-row>
                </van-list>
              </template>
            </van-pull-refresh>
          </van-tab>
        </div>
      </van-tabs>
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
  Card,
  List,
  Cell,
  PullRefresh,
  CountDown,
  Search
} from "vant";
import api from "@/api";
import BScroll from "better-scroll";
export default {
  name: "MyOffice",
  props: {
    unUseNum: Number
  },
  data() {
    return {
      value: "",
      refreshing: false, //下拉刷新
      check: false,
      active: 0,
      title: [
        { text: "全部" },
        { text: "待付款" },
        { text: "待使用" },
        { text: "已使用" },
        { text: "退款(售后)" }
      ],
      noData: false,
      list: [],
      loading: false,
      finished: false,
      error: false,
      icon: {
        notShow: require("@/assets/images/notShow.png"),
        refund: require("@/assets/images/refund.png")
      },
      pageSize: 10,
      type: 1,
      pageNo: 0
    };
  },
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Card.name]: Card,
    [PullRefresh.name]: PullRefresh,
    [CountDown.name]: CountDown,
    [Search.name]: Search
  },
  mounted() {
    this.$store.dispatch("changenavshow", false); //关闭下面的footer显示
    // 从个人中心跳转过来
    console.log(this.$route.query.active == true);
    if (this.$route.query.active == true) {
      if (this.$route.query.active == 1) {
        this.type = parseInt(this.$route.query.active) + 1;
        this.active = parseInt(this.$route.query.active);
      }
      if (this.$route.query.active == 2) {
        this.type = parseInt(this.$route.query.active) + 1;
        this.active = parseInt(this.$route.query.active);
      }
    }
  },
  methods: {
    getUserOrders() {
      const params = {
        type: this.type,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      api
        .getUserOrders(params)
        .then(res => {
          if (!res) return;
          let pageData = res.data.pageData;
          for (let i = 0; i < this.title.length; i++) {
            this.title[1].text = "待付款(" + res.data.totalPage + ")";
            this.title[2].text = "待使用(" + res.data.pageNo + ")";
            this.title[3].text = "已使用(" + res.data.totalPage + ")";
          }
          // 如果没有数据，显示暂无数据
          if (pageData.length == 0 || !pageData) {
            this.finished = true;
            this.noData = true;
            return;
          }
          // 累加
          if (this.pageNo == 1) {
            this.list = res.data.pageData;
          } else {
            this.list = this.list.concat(res.data.pageData);
          }
          this.loading = false;
          // 数据全部加载完成
          if (
            pageData.length < this.pageSize ||
            this.pageNo == res.data.totalPage
          ) {
            this.finished = true;
          }
        })
        .catch(err => {
          Toast("系统异常，请稍后重试");
        })
        .finally(() => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    changeAct(index, title) {
      var index = index + 1;
      if (this.type != index) {
        this.type = index;
        this.pageNo = 1;
        this.list = [];
        // this.refreshing = true;
        this.loading = true;
        this.finished = false;
        if (this.loading) {
          this.getUserOrders();
        }
      }
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.refreshing = false;
        this.pageNo = 1;
        //this.finished = false;
        this.noData = false;
        this.getUserOrders();
      }, 500);
    },
    // 上拉加载
    onLoad() {
      setTimeout(() => {
        this.pageNo++;
        this.getUserOrders();
      }, 500);
    },
    // 搜索
    onSearch(val) {
      if (!val) return;
      api
        .getUserOrders(params)
        .then(res => {
          if (!res) return;
        })
        .catch(err => {
          Toast("系统异常，请稍后重试");
        });
      // this.active=2;
      // var val = val + 1;
      // this.type = val;
      // this.getUserOrders();
    },
    finish() {
      Toast("倒计时结束");
    }
  }
};
</script>
<style lang="less" scoped>
.myOrder {
  background-color: #f4f4f4;
  overflow: hidden;
  // padding-bottom: 60px;
  //height: calc(100vh - 1.30667rem);
  height: calc(100vh);
  /deep/ .van-nav-bar__title {
    color: #333333;
    font-size: 16px;
  }
  .van-search {
    height: 1.3rem;
    .van-search__content {
      border-radius: 1000px;
    }
  }
  /deep/ .van-tabs {
    background: #f4f4f4;
  }
  /deep/ .van-tab {
    color: #333333;
    font-size: 12px;
  }
  /deep/ .van-tab--active {
    color: #ff6024;
  }
  .noData {
    color: #969799;
    font-size: 0.37333rem;
    line-height: 1rem;
    text-align: center;
    margin: 10% auto;
  }
  .van-list {
    padding-top: 10px;
  }
  .van-row {
    display: flex;
    background: #fff;
    align-items: center;
    margin: 0 0 10px 0;
    padding: 0.26667rem 0.45333rem;
    justify-content: center;
    &-movieName {
      color: #333333;
      font-size: 18px;
    }
    p {
      font-size: 12px;
      margin: 3% 0;
      color: #666666;
    }
  }
  .pay {
    text-align: center;
    .rightText {
      color: #ff1f1f;
      font-size: 14px;
    }
  }
  /deep/ .van-button--normal {
    font-size: 14px;
  }
  .payMent {
    text-align: center !important;
    .rightText {
      color: #ff1f1f;
      font-size: 14px;
    }
  }
  .van-row-movieName {
    display: flex;
    position: relative;
    width: 100%;
    align-items: center;
    .movieName {
      width: 89%;
    }
    .times {
      display: flex;
      font-size: 0.32rem;
      color: #ee6906;
      position: absolute;
      right: -50%;
      transform: translateX(-10%);
      .van-count-down {
        font-size: 0.32rem;
        color: #ee6906;
      }
    }
  }
  .van-button--info {
    border: none;
    height: 0.8rem;
    background: linear-gradient(to right, #f8a00e, #ee6906);
    box-shadow: 0px 4px 5px #ffd3c4;
  }
  .leftImg {
    width: 60px;
    height: 100px;
    border-radius: 0.08rem;
  }
  .van-col--6 {
    text-align: center;
  }
  .rightImg {
    width: 60px;
    height: 60px;
  }
  /deep/ .van-list__finished-text {
    margin-top: -10px;
  }
}
</style>
