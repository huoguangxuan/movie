<template>
  <div class="myWant">
    <van-nav-bar title="想看的影片"></van-nav-bar>
    <van-dropdown-menu class="van-dropdown-option">
      <van-dropdown-item
        v-model="value1"
        :options="option1"
        @change="switchMenu"
      />
    </van-dropdown-menu>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      style="height:  calc(100vh - 2.5rem);overflow-y: scroll"
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
    this.$store.dispatch("changenavshow", false); //关闭下面的footer显示
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
  background-color: #f4f4f4;
  height: calc(100vh);

  /deep/ .van-nav-bar__title {
    //font-weight: 900;
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
  /deep/.van-dropdown-menu__title .van-ellipsis {
    font-size: 12px;
    color: #333333;
  }
  .refresh {
    padding-top: 10px;
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
  /deep/ .van-dropdown-menu__bar {
    background: none;
    box-shadow:none;
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
}
</style>
