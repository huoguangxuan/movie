<template>
  <div class="search-result">
    <div class="searchs">
      <van-search
        v-model="keyword"
        show-action
        placeholder="搜索影片、影院..."
        @search="onSearch(keyword)"
      >
        <template #action>
          <div @click="onSearch(keyword)">搜索</div>
        </template>
      </van-search>
    </div>
    <div class="film-box">
      <h4>电影</h4>
      <ul class="film-content">
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
      <p class="to-more">
        查看全部搜索结果<img src="@/assets/images/mores.png" />
      </p>
    </div>
    <div class="cinemas-box">
      <h4>影院</h4>
      <ul class="cinemas-content">
        <li
          v-for="(item, key) in cinemaList"
          :key="key"
          @click="toDetail(item.cinemaId)"
        >
          <div class="txt-box">
            <p class="name">{{ item.cinemaName }}</p>
            <p>
              <span class="price">{{ item.minPrice }}</span> 元起
            </p>
          </div>
          <div class="txt-box">
            <p>{{ item.address }}</p>
            <p>{{ item.distance }}m</p>
          </div>
          <div class="tags">
            <van-tag
              plain
              type="warning"
              v-for="(tag, index) in item.features"
              :key="index"
              >{{ tag }}</van-tag
            >
          </div>
        </li>
      </ul>
      <p class="to-more">
        查看全部搜索结果<img src="@/assets/images/mores.png" />
      </p>
    </div>
    <div class="info-box">
      <h4>资讯</h4>
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
          <div class="informationcontent">
            <div class="exampel">
              <ul>
                <li class="exone">
                  <span class="title">八佰将于8月20日全国上映</span>
                  <span class="text"
                    ><span class="spanstart"
                      >八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映。八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映。</span
                    ><span class="spanend"
                      >查看详情<img src="@/assets/images/mores.png"/></span
                  ></span>
                  <span class="time"
                    ><span>消息来源：中国联通</span
                    ><span>2020-08-12</span></span
                  >
                </li>
                <li class="extwo">
                  <img
                    src="https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c"
                  />
                </li>
              </ul>
            </div>
            <div class="exampel">
              <ul>
                <li class="exone">
                  <span class="title"
                    >八佰将于8月20日全国上映八佰将于8月20日全国上映</span
                  >
                  <span class="text"
                    ><span class="spanstart"
                      >于8月20日全国上映八佰将于上映八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映。</span
                    ><span class="spanend"
                      >查看详情<img src="@/assets/images/mores.png"/></span
                  ></span>
                  <span class="time"
                    ><span>消息来源：中国联通</span
                    ><span>2020-08-12</span></span
                  >
                </li>
                <li class="extwo">
                  <img
                    src="https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c"
                  />
                </li>
              </ul>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { Search, Tag, List } from "vant";
export default {
  name: "HomeSearchResult",
  components: {
    [Search.name]: Search,
    [Tag.name]: Tag,
    [List.name]: List
  },
  data() {
    return {
      keyword: "",
      filmList: [],
      cinemaList: []
    };
  },
  mounted() {
    this.getSearchResul();
  },
  methods: {
    onSearch(keyword) {
      if (!keyword) return;
      this.$router.push({
        path: "/homesearch/result",
        query: {
          keyword: this.keyword || keyword
        }
      });
    },
    getSearchResul() {
      const params = { type: 1 };
      api.films
        .getSearchResul(params)
        .then(res => {
          this.filmList = res.data.movies.pageData;
          this.cinemaList = res.data.cinemas.pageData;
        })
        .catch(() => {
          this.refreshing = false;
          this.loading = false;
        });
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
@import url(../../styles/common.less);
@import url(../../styles/search_result.less);
@import url(../../styles/vant_sf.less);
</style>
