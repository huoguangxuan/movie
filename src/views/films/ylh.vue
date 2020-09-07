<template>
  <div class="films">
    <van-tabs v-model="active">
      <!-- 热映 -->
      <van-tab title="正在热映">
        <div class="divider"></div>
        <div class="reying">
          <van-pull-refresh v-model="refreshing"
                            @refresh="onRefresh"
                            :head-height="110"
                            success-text="刷新成功">
            <van-list v-model="loading"
                      :finished="finished"
                      finished-text="没有更多了"
                      @load="onLoad">
              <ul class="tab-content">
                <li class="item"
                    v-for="film in filmList"
                    :key="film.movieId"
                    @click="
                    $router.push({
                      path: '/film-detail',
                      params: { movieId: film.movieId }
                    })
                  ">
                  <img class="poster"
                       :src="film.posterUrl"
                       alt />
                  <div class="info">
                    <h3 class="font16 black">八佰</h3>
                    <p class="font14 hot-score">
                      <span class="orange">{{ film.hotScore || 0 }}</span>
                      <span class="black">&nbsp;人想看</span>
                    </p>
                    <p class="font12 mtb4 van-multi-ellipsis--l2">
                      {{ film.introduction }}
                    </p>
                    <p class="font12 black van-multi-ellipsis--l2">
                      {{ film.actor }}
                    </p>
                  </div>
                  <div class="score">
                    <p class="font16">
                      评分
                      <span class="orange">9.2</span>
                    </p>
                    <van-button class="buy-btn"
                                round
                                @click.stop="
                        $router.push({
                          path: '/choseSeat',
                          params: { movieId: film.movieId }
                        })
                      "
                                size="small"
                                color="linear-gradient(to right, #F8A10E, #EE6806)">去购票</van-button>
                  </div>
                </li>
              </ul>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
      <!-- 即将上映 -->
      <van-tab title="即将上映">
        <div class="divider"></div>
        <div class="shangying">
          <div class="recently">
            <div class="recentlyhead">
              <span>近期最受期待</span>
            </div>
            <div class="recentlycontent"
                 ref="recentlycontent">
              <!-- /* 这里是父盒子*/ -->
              <ul class="recentlycont"
                  ref="recentlycont">
                <!-- 这里是子盒子，即滚动区域 -->
                <li class="cont-item"
                    v-for="(item, index) in expected"
                    :key="index">
                  <img class="img"
                       :src="item.posterUrl" />
                  <span class="recentlyname">{{ item.movieName }}</span>
                  <span class="recentlyname">{{ item.runDate }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="specific">
            <div class="specifictime">
              <!-- 上映时间的滑动 -->
              <div class="specificbig"
                   ref="specificbig">
                <ul class="specificmin"
                    ref="specificmin">
                  <li v-for="(item, index) in time"
                      :key="index"
                      @click="timeindex(index)">
                    <span class="specifictimer">{{ item.date }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="specificcontent"
                 v-for="(item, index) in time"
                 :key="index"
                 v-show="num == index">
              <div class="specificitem">
                <van-list v-model="loading"
                          :finished="finished"
                          finished-text="没有更多了"
                          @load="onLoad">
                  <ul class="tab-content">
                    <li class="item"
                        v-for="ite in item.datas"
                        :key="ite.movieId"
                        @click="
                        $router.push({
                          path: '/film-detail',
                          params: { movieId: ite.movieId }
                        })
                      ">
                      <img class="poster"
                           :src="ite.posterUrl"
                           alt />
                      <div class="info">
                        <h3 class="font16 black">{{ ite.movieName }}</h3>
                        <p class="font14 hot-score">
                          <span class="orange">{{ ite.hotScore || 0 }}</span>
                          <span class="black">&nbsp;人想看</span>
                        </p>
                        <p class="font12 mtb4 van-multi-ellipsis--l2">
                          {{ ite.introduction }}
                        </p>
                        <p class="font12 black van-multi-ellipsis--l2">
                          {{ ite.actor }}
                        </p>
                      </div>
                      <div class="score">
                        <van-button class="buy-btn"
                                    round
                                    @click.stop="
                            $router.push({
                              path: '/choseSeat',
                              params: { movieId: ite.movieId }
                            })
                          "
                                    size="small"
                                    color="linear-gradient(to right, #76BEFF , #0E79FF)">想看</van-button>
                      </div>
                    </li>
                  </ul>
                </van-list>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import api from "@/api";
import BScroll from "better-scroll";
import {
  Tab,
  Tabs,
  Search,
  Grid,
  GridItem,
  Button,
  List,
  PullRefresh
} from "vant";
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Search.name]: Search,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Button.name]: Button,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  data () {
    return {
      active: 0,
      filmList: [],
      loading: false,
      finished: false,
      refreshing: false,
      expected: [],
      length_expected: "",
      time: "",
      num: 0
    };
  },
  mounted () {
    this.getMoreDatar();
    this.getFilms();
  },
  methods: {
    //即将上映更多页接口
    getMoreDatar () {
      const params = { cityId: "北京" };
      api.tickets
        .getMoreDatar(params)
        .then(res => {
          console.log(res);
          this.expected = res.data.pageData.expected.datas;
          this.length_expected = res.data.pageData.expected.datas.length;
          this.time = res.data.pageData.nearCome;
          this.length_time = res.data.pageData.nearCome.length;
          this.verScroll();
        })
        .catch(err => {
          console.log(err);
        });
    },
    verScroll () {
      let width_expected = this.length_expected * 110 * 2 + 20;
      let width_time = this.length_time * 110 * 2 + 20;
      this.$refs.recentlycont.style.width = width_expected + "px";
      this.$refs.specificmin.style.width = width_time + "px";
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.recentlycontent, {
            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
          this.scroll = new BScroll(this.$refs.specificbig, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh(); //如果dom结构发生改变调用该方法
        }
      });
    },
    timeindex (index) {
      this.num = index;
    },
    getFilms () {
      const params = { type: 1 };
      api.films
        .getFilms(params)
        .then(res => {
          this.filmList = res.data.pageData;
          setTimeout(() => {
            this.refreshing = false;
            this.loading = false;
            this.finished = true;
          }, 1000);
        })
        .catch(() => {
          this.refreshing = false;
          this.loading = false;
        });
    },
    onLoad () {
      this.getFilms();
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      // this.onLoad();
      this.getFilms();
    }
  }
};
</script>

<style lang="less" scoped>
.films {
  /deep/ .van-tab--active {
    color: #ff6024;
  }
  /deep/ .van-tabs__line {
    background-color: #ff6024;
    height: 2px;
  }
  .tab-content {
    background-color: #fff;
    .item {
      padding: 10px 17px;
      display: flex;
      border-bottom: 8px solid #f4f4f4;
      .poster {
        width: 60px;
        height: 100px;
        border-radius: 3px;
        margin-right: 8px;
      }
      .info {
        flex: 1;
        margin-right: 10px;
        .hot-score {
          margin: 3px 0px;
        }
      }
      .score {
        align-self: center;
        text-align: center;

        .buy-btn {
          margin-top: 8px;
          padding: 5px 15px;
        }
      }
    }
  }
  .recently {
    height: 231px;
    background-color: white;
    margin-bottom: 8px;
    .recentlyhead {
      height: 31px;
      margin: 0px 17px;
      span {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #333333;
        text-align: right;
        line-height: 31px;
      }
    }
    .recentlycontent {
      width: 100vw;
      height: 200px;
      overflow: hidden;
      display: flex;
      align-items: center;
      touch-action: none;
      .recentlycont {
        width: 750px;
        display: flex;
        align-items: center;
        flex-direction: row;
        padding-left: 9px;
        li {
          padding-left: 8px;
          width: 100px;
          display: flex;
          flex-direction: column;
          .recentlyname {
            width: 100px;
            font-family: PingFang-SC-Bold;
            font-size: 16px;
            color: #333333;
            text-align: left;
            line-height: 16px;
            margin-top: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        img {
          width: 100px;
          height: 130px;
        }
      }
    }
  }
  .specific {
    width: 100vw;
    .specifictime {
      width: 100vw;
      height: 46px;
      background-color: white;
      .specificbig {
        touch-action: none;
        width: 100vw;
        height: 46px;
        overflow: hidden;
        display: flex;
        align-items: center;
        .specificmin {
          width: 750px;
          height: 46px;
          display: flex;
          align-items: center;
          flex-direction: row;
          padding-left: 17px;
          li {
            width: 100px;
            height: 46px;
            display: flex;
            align-items: center;
            span {
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #333333;
              line-height: 16px;
            }
          }
        }
      }
    }
    .specificcontent {
      width: 100vw;
      .item {
        .poster {
          width: 75px;
          height: 100px;
        }
        .buy-btn {
          width: 70px;
          height: 30px;
        }
      }
    }
  }
}
</style>
