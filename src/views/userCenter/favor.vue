<template>
  <div class="myWant">
    <van-nav-bar title="想看的影片"></van-nav-bar>
    <van-dropdown-menu class="van-dropdown-option">
      <van-dropdown-item v-model="value1" :options="option1" @change="switchMenu" />
    </van-dropdown-menu>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      style="height:  calc(100vh - 6rem);padding-bottom: 1.6rem;overflow-y: scroll"
    >
      <div class="refresh">
        <div v-if="noData" class="noData">暂无数据</div>
        <template v-else>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :offset="100"
            @load="pullUp"
          >
            <van-row v-for="(item,index) in list" :key="index" gutter="6">
              <van-col span="6">
                <img :src="item.posterUrl" class="leftImg" />
              </van-col>
              <van-col span="12">
                <div class="van-row-movieName">{{item.movieName}}</div>
                <p>
                  <span class="number">{{item.hotScore}}</span>
                  <span>人想看</span>
                </p>
                <div class="publicDesc van-multi-ellipsis--l2">{{item.publicDesc}}</div>
                <div class="actorsList van-ellipsis">
                  <span
                    v-for="(actorsList,index) in item.actors"
                    :key="index"
                    class="nameActors"
                  >{{actorsList.name}}</span>
                </div>
              </van-col>
              <van-col span="6">
                <div class="score">
                  评分
                  <span class="scoreNumber">{{item.cinemaScore}}</span>
                </div>
                <van-button round type="info" v-if="item.runStatus==0" disabled>未上映</van-button>
                <van-button round type="info" v-else @change="goTicket">去购票</van-button>
              </van-col>
            </van-row>
          </van-list>
        </template>
      </div>
    </van-pull-refresh>
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
  DropdownMenu,
  DropdownItem
} from "vant";
import BScroll from "better-scroll";
import api from "@/api";
export default {
  data: function() {
    return {
      option1: [
        { text: "标记时间", value: 1 },
        { text: "上映时间", value: 2 }
      ],
      value1: 2,
      selectedSeat: [],
      active: 0,
      list: [],
      loading: false,
      finished: false,
      noData: false, // 如果没有数据，显示暂无数据
      refreshing: false, // 下拉的加载图案
      sortOrder: 2, //1:标记时间,2:上映时间,默认:2
      pageNo: 0, //当前页码,默认1
      pageSize: 10 //每页数据量,默认10
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
    [PullRefresh.name]: PullRefresh,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem
  },
  mounted() {
    // this.getUserOrders();
  },
  methods: {
    getUserCollects() {
      const params = {
        sortOrder: this.sortOrder,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      api
        .getUserCollect(params)
        .then(res => {
          if (!res) return;
          if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
          }
          let pageData = res.data.pageData;
          // 如果没有数据，显示暂无数据
          if (pageData.length == 0 && this.pageNo == 1) {
            this.noData = true;
            return;
          }
          //  this.pageSize = res.data.pageSize;
          //this.pageNo = res.data.pageNo;

          // 累加
          if (res.data.pageNo == 1) {
            this.list = res.data.pageData;
          } else {
            this.list = this.list.concat(res.data.pageData);
          }
          //加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (pageData.length < 10 || this.pageNo == res.data.totalPage) {
            this.finished = true;
          }
        })
        .catch(err => {
          Toast("系统异常，请稍后重试");
        });
    },
    // 下拉加载
    pullUp() {
      setTimeout(() => {
        this.pageNo++;
        this.loading = true;
        this.getUserCollects();
      }, 500);
    },
    // 上拉刷新
    onRefresh() {
      setTimeout(() => {
        this.refreshing = false;
        this.pageNo = 1;
        this.noData = false;
        // 请求信息
        this.getUserCollects();
      }, 500);
    },
    // 影院切换
    switchMenu(value) {
      this.list = [];
      this.refreshing = false;
      this.pageNo = 1;
      this.sortOrder = value;
      this.getUserCollects();
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
.myWant {
  background-color: #f7f8f9;
  padding-bottom: 60px;
  height: calc(100vh - 60px);

  /deep/ .van-nav-bar__title {
    font-weight: 900;
    color: #333333;
    overflow: initial;
    font-size: 16px;
  }
  /deep/ .van-dropdown-option {
    background: #fff;
    .van-dropdown-menu__item {
      justify-content: flex-end;
    }
    .van-dropdown-menu__title {
      margin: 0 10% 0 0;
    }
  }
  /deep/ .van-dropdown-menu__title::after {
    border-color: transparent transparent #333333 #333333;
  }
  /deep/ .van-dropdown-menu__bar {
    background: none;
    box-shadow: none;
  }
  /deep/.van-dropdown-menu__title .van-ellipsis {
    font-size: 12px;
    color: #333333;
  }
  .refresh {
    padding-top: 10px;
  }
  .number {
    color: #ff6024;
  }
  .publicDesc {
    color: #999999;
    margin: 2% 0;
    width: 90%;
    font-size: 12px;
  }
  .actorsList {
    width: 90%;
    color: #333333;
    font-size: 14px;
  }
  .featuresList {
    width: 100%;
    font-size: 12px;
    margin: 3% 0;
    &-name {
      color: #ff6b33;
      border: 1px solid #ff6b33;
      border-radius: 5px;
      margin: 0 2%;
      padding: 4px 0;
      //  width: 10%;
      text-align: center;
    }
    &-name:first-child {
      margin: 0 2% 0 0;
    }
  }
  .nameActors:first-child {
    position: relative;
    margin: 0 2% 0 0;
  }
  .nameActors:first-child::after {
    position: absolute;
    right: -20%;
    top: 50%;
    transform: translateY(-50%);
    content: "|";
  }
  .nameActors {
    margin: 0 2%;
  }
  .van-tab__pane {
    background: #f4f4f4;
  }
  .van-tab--active {
    color: #ff6024;
  }
  .noData {
    color: #969799;
    font-size: 0.37333rem;
    line-height: 1rem;
    text-align: center;
    margin: 10% auto;
  }
  .score {
    font-size: 14px;
    margin: 0 0 3% 10%;
  }
  .scoreNumber {
    color: #ff6024;
  }
  .van-row {
    display: flex;
    background: #fff;
    align-items: center;
    margin: 0 0 10px 0;
    padding: 2% 0;
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
  .van-dropdown-menu__bar {
    background: none;
  }
}
</style>
