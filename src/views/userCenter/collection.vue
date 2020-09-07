<template>
  <div class="myCollection">
    <van-nav-bar title="我的收藏"></van-nav-bar>
    <van-tabs v-model="active" sticky @click="onClick" :active="active">
      <van-tab title="影片">
        <van-pull-refresh
          v-model="refreshing"
          @refresh="onRefresh"
          style="height:  calc(100vh - 6rem);padding-bottom: 1.6rem;overflow-y: scroll"
        >
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
        </van-pull-refresh>
      </van-tab>
      <van-tab title="影院">
        <van-pull-refresh
          v-model="refreshing"
          @refresh="onRefresh"
          style="height:  calc(100vh - 6rem);padding-bottom: 1.6rem;overflow-y: scroll"
        >
          <ul class="lst">
            <li v-for="(item, key) in list" :key="key" @click="toDetail(item.id)">
              <div class="txt-box">
                <p class="name">{{ item.cinemaName}}</p>
                <p>
                  <span class="price">{{ item.price }}</span> 元起
                </p>
              </div>
              <div class="txt-box">
                <p>{{ item.address }}</p>
                <p>{{ item.dist }}m</p>
              </div>
              <div class="tags">
                <van-tag
                  plain
                  type="warning"
                  v-for="(tag, index) in item.features"
                  :key="index"
                >{{ tag }}</van-tag>
              </div>
            </li>
          </ul>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import {
  NavBar,
  Toast,
  Tag,
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
      active: 0,
      active1: "true",
      list: [],
      loading: false,
      finished: false,
      noData: false, // 如果没有数据，显示暂无数据
      refreshing: false, // 下拉的加载图案
      type: 1, //1,电影,2,影院.默认1
      pageNo: 0, //当前页码
      pageSize: 10 //每页数据量,默认10
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
    [DropdownMenu.name]: DropdownMenu,
    [Tag.name]: Tag
  },
  mounted() {
    // this.getUserOrders();
  },
  methods: {
    getUserCollects() {
      const params = {
        type: this.type,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      api
        .getUserCollect(params)
        .then(res => {
          if (!res) return;
          let pageData = res.data.pageData;
          // 如果没有数据，显示暂无数据
          if (pageData.length == 0 && this.pageNo == 1) {
            this.noData = true;
            return;
          }
          if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
          }
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
    // 上拉加载
    pullUp() {
      setTimeout(() => {
        this.pageNo++;
        this.loading = true;
        this.getUserCollects();
      }, 500);
    },
    // 下拉刷新
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
    onClick(name, title, e) {
      console.log(!this.active == name);
      var name = name + 1;
      // this.list = [];
      // this.refreshing = false;
      this.pageNo = 1;
      this.type = name;
      this.getUserCollects();
    },
    // 影院跳转
    toDetail(id) {
      this.$router.push({
        path: "/cinemas/detail",
        query: {
          id
        }
      });
    },
    // 去购票
    goTicket() {
      this.$router.push({
        path: "/cinemas/detail",
        query: {
          id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.myCollection {
  background-color: #f4f4f4;
  padding-bottom: 60px;
  height: calc(100vh - 60px);
  /deep/.van-nav-bar__title {
    font-weight: 900;
    color: #333333;
    overflow: initial;
    font-size: 16px;
  }
  /deep/ .van-tabs {
    .van-tab {
      color: #333333;
      font-size: 12px;
    }
    .van-tab--active {
      color: #ff6024;
    }
    .van-tabs__content {
      padding-top: 10px;
    }
    .van-dropdown-menu__title::after {
      border-color: transparent transparent #333333 #333333;
    }
    .van-dropdown-menu__bar {
      background: none;
      box-shadow: none;
    }
    .van-dropdown-menu__title .van-ellipsis {
      font-size: 12px;
      color: #333333;
    }
  }
  .van-pull-refresh {
    background: #f4f4f4;
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
    // border-right: 0.02667rem solid #333333;
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
  // 影院
  .lst {
    overflow: hidden;
    li {
      height: 88px;
      background: #ffffff;
      padding: 2% 17px;
      margin: 0 0 0.26667rem 0;
      .txt-box {
        min-height: 30px;
        display: flex;
        justify-content: space-between;
        p {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #666666;
          line-height: 24px;
          &.name {
            font-family: PingFangSC-Semibold;
            font-size: 16px;
            color: #333333;
            line-height: 32px;
          }

          & .price {
            font-family: PingFangSC-Semibold;
            font-size: 16px;
            color: #ff6024;
            line-height: 32px;
          }
        }
      }

      .tags {
        height: 30px;
        display: flex;
        align-items: center;
        .van-tag--warning.van-tag--plain {
          margin: 0 1%;
        }
        .van-tag--warning.van-tag--plain:first-child {
          margin: 0 1% 0 0;
        }
      }
    }
  }
}
</style>
