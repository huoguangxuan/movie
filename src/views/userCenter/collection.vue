<template>
  <div class="myCollection">
    <van-nav-bar title="我的收藏"></van-nav-bar>
    <van-tabs v-model="active" sticky @click="onClick" :active="active">
      <van-tab title="影片">
        <van-pull-refresh
          v-model="refreshing"
          @refresh="onRefresh"
          :head-height="50"
          success-text="刷新成功"
          style="height:  calc(100vh - 2.4rem);overflow-y: scroll"
        >
          <div v-if="noData" class="noData">空空如也~</div>
          <template v-else>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :offset="100"
              @load="pullUp"
            >
              <ul class="tab-content">
                <li
                  class="item"
                  v-for="item in list"
                  :key="item.sort"
                  @click="$router.push({path: '/film-detail',params: { movieId: item.sort }})"
                >
                  <img class="poster" :src="item.posterUrl" alt />
                  <div class="info">
                    <h3 class="font16 black">{{item.movieName}}</h3>
                    <p class="font14 hot-score">
                      <span class="orange">{{ item.hotScore || 0 }}</span>
                      <span class="black">&nbsp;人想看</span>
                    </p>
                    <p class="font12 mtb4 van-multi-ellipsis--l2">{{ item.publicDesc }}</p>
                    <p class="font12 black van-ellipsis actorsList">
                      <span
                        v-for="(actorsList, index) in item.actors"
                        :key="index"
                        class="nameActors"
                      >{{ actorsList.name }}</span>
                    </p>
                  </div>
                  <div class="score">
                    <p class="font16">
                      评分
                      <span class="orange">{{ item.cinemaScore }}</span>
                    </p>
                    <van-button
                      class="buy-btn"
                      round
                      @click.stop="$router.push({path: '/choseSeat',params: { movieId: item.sort }})"
                      size="small"
                      color="linear-gradient(to right, #F8A10E, #EE6806)"
                    >去购票</van-button>
                  </div>
                </li>
              </ul>
            </van-list>
          </template>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="影院">
        <van-pull-refresh
          v-model="refreshing"
          @refresh="onRefresh"
          :head-height="50"
          success-text="刷新成功"
          style="height:  calc(100vh - 2.4rem);overflow-y: scroll"
        >
          <ul class="lst">
            <li v-for="(item, key) in list" :key="key" @click="toDetail(item.id)">
              <div class="txt-box">
                <p class="name">{{ item.cinemaName }}</p>
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
    this.$store.dispatch("changenavshow", false); //关闭下面的footer显示
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
  height: calc(100vh);
  /deep/.van-nav-bar__title {
    //font-weight: 900;
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
  }
  .nameActors:first-child {
    position: relative;
    margin: 0 4% 0 0;
  }
  .nameActors:first-child::after {
    position: absolute;
    right: -20%;
    top: 50%;
    transform: translateY(-55%);
    content: "|";
  }
  .noData {
    color: #969799;
    font-size: 0.37333rem;
    line-height: 1rem;
    text-align: center;
    margin: 10% auto;
  }
  .van-list {
    padding-top: 0.21333rem;
  }
  .tab-content {
    background-color: #fff;
    .item {
      padding: 0.26667rem 0.45333rem;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      border-bottom: 0.21333rem solid #f4f4f4;
      .poster {
        width: 1.6rem;
        height: 2.66667rem;
        border-radius: 0.08rem;
        margin-right: 0.21333rem;
      }
      .info {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        width: 50%;
        margin-right: 0.26667rem;
        .hot-score {
          margin: 0.08rem 0;
        }
      }
      .font14 {
        font-size: 0.37333rem;
      }
      .mtb4 {
        margin: 0.10667rem 0;
      }
      .font12 {
        font-size: 0.32rem;
      }
      .van-multi-ellipsis--l2 {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .font16 {
        font-size: 0.42667rem;
      }
      .orange {
        color: #ff7030;
      }
      .black {
        color: #333;
      }
      .score {
        -webkit-align-self: center;
        -ms-flex-item-align: center;
        align-self: center;
        text-align: center;
        .buy-btn {
          margin-top: 0.21333rem;
          padding: 0.13333rem 0.4rem;
        }
      }
      .actorsList {
        width: 90%;
        color: #333333;
        font-size: 14px;
      }
    }
  }
  // 影院
  .lst {
    padding-top: 0.21333rem;
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
