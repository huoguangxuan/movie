<template>
  <div class="films">
    <van-tabs
      style="position:fixed;top:0;width:100%;z-index:2"
      v-model="active"
    >
      <van-tab title="正在热映"></van-tab>
      <van-tab title="即将上映"></van-tab>
    </van-tabs>
    <div class="divider"></div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :head-height="110"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="tab-content">
          <li
            class="item"
            v-for="film in filmList"
            :key="film.movieId"
            @click="
              $router.push({
                path: 'film-detail',
                params: { movieId: film.movieId }
              })
            "
          >
            <img class="poster" :src="film.posterUrl" alt />
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
    </van-pull-refresh>

    <the-footer activeIndex="1" />
  </div>
</template>

<script>
import {
  Search,
  Grid,
  GridItem,
  Tab,
  Tabs,
  Button,
  List,
  PullRefresh
} from "vant";
import api from "@/api";
import TheFooter from "@/components/TheFooter";
export default {
  components: {
    [Search.name]: Search,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    "the-footer": TheFooter
  },

  data() {
    return {
      active: "1",
      filmList: [],
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  created() {
    this.getFilms();
  },
  methods: {
    getFilms() {
      const params = { type: 1 };
      api
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
    onLoad() {
      console.log(1);
      this.getFilms();
    },
    onRefresh() {
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
  /deep/ .van-tab--active {
    color: #ff6024;
  }
  /deep/ .van-tabs__line {
    background-color: #ff6024;
    height: 2px;
  }
  /deep/ .van-list__finished-text,
  .van-list__loading {
    margin-bottom: 90px;
  }
}
</style>
