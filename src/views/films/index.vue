<template>
  <div class="films">
    <van-tabs
      @click="handleTabChange"
      style="position:fixed;top:0;width:100%;z-index:2"
      v-model="active"
    >
      <van-tab v-for="(tab, index) in tabs" :title="tab" :key="index" st>
      </van-tab>
    </van-tabs>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      :offset="100"
      @load="loadMore"
    >
      <div class="recently" v-if="active == 1">
        <div class="recentlyhead">
          <span>近期最受期待</span>
        </div>
        <div class="recentlycontent" ref="recentlycontent">
          <!-- /* 这里是父盒子*/ -->
          <ul class="recentlycont" ref="recentlycont">
            <!-- 这里是子盒子，即滚动区域 -->
            <li
              class="cont-item"
              v-for="(item, index) in expected"
              :key="index"
            >
              <img class="img" :src="item.posterUrl" />
              <span class="recentlyname">{{ item.movieName }}</span>
              <span class="recentlyname">{{ item.runDate }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="divider" v-if="active == 1"></div>
      <div class="specific" v-if="active == 1">
        <div class="specifictime">
          <!-- 上映时间的滑动 -->
          <div class="specificbig" ref="specificbig">
            <ul class="specificmin" ref="specificmin">
              <li
                v-for="(item, index) in time"
                :key="index"
                @click="timeindex(index)"
              >
                <span class="specifictimer">{{ item.date }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <ul class="tab-content">
        <li
          class="item"
          v-for="film in filmList"
          :key="film.movieId"
          @click="
            $router.push({
              path: '/film-detail',
              params: { movieId: film.movieId }
            })
          "
        >
          <img class="poster" :src="film.posterUrl" alt />
          <div class="info1">
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
            <van-button
              class="buy-btn"
              round
              @click.stop="
                $router.push({
                  path: '/choseSeat',
                  params: { movieId: film.movieId }
                })
              "
              size="small"
              color="linear-gradient(to right, #F8A10E, #EE6806)"
              >去购票</van-button
            >
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { Tab, Tabs, Button, List, PullRefresh, Toast } from "vant";
import api from "@/api";
import BScroll from "better-scroll";
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Toast.name]: Toast
  },
  data() {
    return {
      active: 0,
      tabs: ["正在热映", "即将上映"],
      filmList: [],
      time: [],
      expected: [],
      finished: false,
      loading: false
    };
  },
  created() {
    this.initData();
    this.$store.dispatch("changenavshow", true);
  },
  mounted() {},
  methods: {
    handleTabChange() {
      if (this.active == 1) this.getMoreDatar();
    },
    initData() {
      const params = { type: 1, pageNo: 1, pageSize: 8 };
      this.getFilms(params);
    },
    getFilms(params) {
      api.films
        .getFilms(params)
        .then(res => {
          this.filmList = res.data.pageData;
          this.loading = false;
        })
        .catch(() => {
          this.refreshing = false;
        });
    },
    getMoreDatar() {
      const params = { cityId: "北京" };
      api.tickets
        .getMoreDatar(params)
        .then(res => {
          this.expected = res.data.pageData.expected.datas;
          this.length_expected = res.data.pageData.expected.datas.length;
          this.time = res.data.pageData.nearCome;
          this.length_time = res.data.pageData.nearCome.length;
          // this.verScroll();
        })
        .catch(err => {
          console.log(err);
        });
    },
    verScroll() {
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
    async loadMore() {
      this.loading = true;
      const params = {
        type: this.active,
        pageNo: this.pageNo++,
        pageSize: this.pageSize
      };
      const films = await api.films.getFilms(params);
      console.log(films);
      // this.filmList.push(...films.pageData);
      if (this.filmList.length > 30) {
        this.finished = true;
      }
    }
  }
};
</script>

<style lang="less">
.films {
  margin-top: 43px;
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
      .info1 {
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
  /deep/ .van-tab--active {
    color: #ff6024;
  }
  /deep/ .van-tabs__line {
    background-color: #ff6024;
    height: 2px;
  }
  // /deep/ .van-list__finished-text,
  // .van-list__loading {
  //   margin-bottom: 90px;
  // }
  .recently {
    background: #fff;
    padding: 0px 17px;
    height: 231px;
    .recentlyhead {
      height: 31px;
      span {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #333333;
        text-align: right;
        line-height: 31px;
      }
    }
    .recentlycontent {
      height: 200px;
      overflow: hidden;
      display: flex;
      align-items: center;
      touch-action: none;
      .recentlycont {
        display: flex;
        align-items: center;
        flex-direction: row;
        li {
          padding-right: 8px;
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
    .specifictime {
      padding: 0px 17px;
      height: 46px;
      background-color: white;
      .specificbig {
        touch-action: none;
        height: 46px;
        overflow: hidden;
        display: flex;
        align-items: center;
        .specificmin {
          height: 46px;
          display: flex;
          align-items: center;
          flex-direction: row;
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
