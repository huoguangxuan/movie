<template>
  <div>
    <van-nav-bar title="我的订单" left-text left-arrow />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-tabs v-model="active">
        <van-tab title="全部">
          <div v-if="noData" class="noData">暂无数据</div>
          <template v-else>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="pullUp">
              <van-row v-for="item in list" :key="item.id" gutter="6">
                <van-col span="6">
                  <img :src="item.posterUrl" class="leftImg" />
                </van-col>
                <van-col span="12">
                  <div class="van-row-movieName">{{item.movieName}}</div>
                  <p class>{{item.runDate}}</p>
                  <p>{{item.cinemaName}}</p>
                  <p>订单编号:{{item.orderNo}}</p>
                </van-col>
                <van-col span="6">
                  <van-button round type="info" v-if="item.runStatus==1">已放映</van-button>
                  <van-button round type="info" v-else>未放映</van-button>
                </van-col>
              </van-row>
            </van-list>
          </template>
        </van-tab>
        <van-tab title="待付款">内容 2</van-tab>
        <van-tab title="待使用">内容 3</van-tab>
        <van-tab title="待评价">内容 4</van-tab>
        <van-tab title="退款">内容 4</van-tab>
      </van-tabs>
    </van-pull-refresh>
  </div>
</template>
<script>
import { NavBar, Toast, Button, Tab, Tabs, Card, List, Cell, PullRefresh } from "vant";
import BScroll from "better-scroll";
import api from "@/api";
export default {
  data: function() {
    return {
      selectedSeat: [],
      active: 0,
      list: [],
      loading: false,
      finished: false,
      load: false, // 加载dom的控制,
      noData: false, // 如果没有数据，显示暂无数据
      isLoading: false, // 下拉的加载图案
      type: 1,//订单显示tab类型:1,全部,2,未使用,3,未付款,4,已使用,5,退款.默认1
      page: 1,//当前页码,默认1
      pageSize: 5//每页数据量,默认10
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
    [List.name]: List,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Card.name]: Card,
    [PullRefresh.name]: PullRefresh
  },
  mounted() {
    this.getUserOrder();
  },
  methods: {
    getUserOrder() {
      const params = {
        type: '北京',
        pageNo: '34',
        pageSize: '46554'
      };
      console.log(params)
      api
        .getUserOrders(params)
        .then(res => {
          if (!res) return;
          console.log(res);
          this.list = res.data.pageData;
          // this.page++;
          // // 如果没有数据，显示暂无数据
          // if (this.list.length === 0 && this.page === 1) {
          //   this.noData = true
          // }
          // //加载状态结束
          // this.loading = false;
          // // 数据全部加载完成
          // if (res.data.pageData.length < 10) {
          //   this.finished = true;
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 下拉加载
    pullUp () {
      setTimeout(() => {
        this.getUserOrder()
        this.loading = true
      }, 500)
    },
    onRefresh () {
      setTimeout(() => {
        // 重新初始化这些属性
        this.isLoading = false
        this.list = []
        this.page = 1
        this.loading = false
        this.finished = false
        this.noData = false
        // 请求信息
        this.getUserOrder()
      }, 500)
    },
    clickSeat(index) {
      console.log(index);
    }
  }
};
</script>
<style lang="less" scoped>
.van-tab--active {
  color: #ff6024;
}
.noData{
  color: #969799;
  font-size: 0.37333rem;
  line-height: 1rem;
  text-align: center;
  margin: 10% auto;
}
.van-row {
  display: flex;
  align-items: center;
  justify-content: center;
  &-movieName {
    font-weight: 900;
    color: #333333;
    font-size: 18px;
  }
  p {
    font-size: 12px;
  }
}
.van-button--info {
  border: none;
  height: 0.8rem;
  background: linear-gradient(to right, #f8a00e, #ee6906);
  box-shadow: 0px 4px 5px #ffd3c4;
}
.leftImg {
  width: 100%;
}
</style>
