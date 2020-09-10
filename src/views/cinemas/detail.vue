<template>
  <div class="page-wrap cinemas-detail">
    <van-nav-bar title="首都电影院（西单店）" />
    <div class="place" @click="searchByHand">
      <h4>首都电影院（西单店）</h4>
      <p>西单大街11号</p>
      <img class="arrow" src="@/assets/images/icon_arrow_right.png" />
      <div class="line"></div>
      <img class="local" src="@/assets/images/icon_local.png" />
    </div>
    <!-- <div class="notice">
      <h4>请带好口罩！</h4>
    </div> -->
    <van-notice-bar left-icon="volume-o" text="请带好口罩！" />
    <div class="gallery">
      <swiper ref="mySwiper" :options="swiperOptions">
        <div class="swiper-slide" v-for="(item, key) in banners" :key="key">
          <img :src="item" />
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <h4>
        八百<span class="score-txt">评分</span><span class="score">9.2</span>
      </h4>
      <p>分钟 | 类型 | 演员</p>
    </div>
    <van-tabs v-model="active" swipe-threshold="3">
      <van-tab v-for="(item, key) in tab" :title="item" :key="key">
        <div
          class="play-lst"
          v-for="(elt, idx) in lst"
          :key="idx"
          @click="checkFilm()"
        >
          <p class="lft begin">{{ elt.begin }}</p>
          <p class="mdl leibie">{{ elt.leibie }}111</p>
          <p class="rgt price">￥{{ elt.price }}</p>
          <p class="lft end">{{ elt.end }}散场</p>
          <p class="mdl weizhi">{{ elt.weizhi }}</p>
          <p class="rgt youhui">联名卡价￥{{ elt.youhui }}</p>
        </div>
      </van-tab>
    </van-tabs>
    <van-overlay :show="showOverlay">
      <div class="overlay-wrapper" @click.stop>
        <h4>影院公告</h4>
        <van-notice-bar
          left-icon="volume-o"
          text="疫情期间，观影需要全程佩戴口罩，影厅内禁止饮食。"
        />
        <van-notice-bar
          left-icon="volume-o"
          text="支持支付宝实名认证用户购票。"
        />
        <button class="main-btn" @click="showOverlay = false">确定</button>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { NavBar, NoticeBar, Tab, Tabs, Overlay } from "vant";
import { Swiper, directive } from "vue-awesome-swiper";
// If you use Swiper 6.0.0 or higher
import "swiper/swiper-bundle.css";

export default {
  name: "cinemaDetail",
  components: {
    [NavBar.name]: NavBar,
    [NoticeBar.name]: NoticeBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Overlay.name]: Overlay,
    Swiper
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      tab: [
        "9月10日 周一",
        "9月10日 周一",
        "9月10日 周一",
        "9月10日 周一",
        "9月10日 周一",
        "9月10日 周一"
      ],
      active: 1,
      banners: [
        require("@/assets/images/movie_bg.png"),
        require("@/assets/images/movie_bg.png"),
        require("@/assets/images/movie_bg.png"),
        require("@/assets/images/movie_bg.png"),
        require("@/assets/images/movie_bg.png"),
        require("@/assets/images/movie_bg.png"),
        require("@/assets/images/movie_bg.png"),
        require("@/assets/images/movie_bg.png")
      ],
      swiperOptions: {
        autoplay: true,
        loop: true,
        slideToClickedSlide: true,
        slidesPerView: 5,
        centeredSlides: true,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        on: {
          slideChange: function() {
            console.log("改变了，activeIndex为" + this.activeIndex);
          }
        }
        // Some Swiper option/callback...
      },
      lst: [
        {
          begin: "11:22",
          leibie: "国语3D",
          price: 74,
          end: "11:22",
          weizhi: "5号厅",
          youhui: 66
        },
        {
          begin: "11:22",
          leibie: "国语3D",
          price: 74,
          end: "11:22",
          weizhi: "5号厅",
          youhui: 66
        },
        {
          begin: "11:22",
          leibie: "国语3D",
          price: 74,
          end: "11:22",
          weizhi: "5号厅",
          youhui: 66
        }
      ],
      showOverlay: false
    };
  },
  mounted() {
    this.$store.dispatch("changenavshow", false); //关闭下面的footer显示
    console.log(this.$route.query.id);
    console.log("Current Swiper instance object", this.swiper);
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  methods: {
    searchByHand(id) {
      this.$router.push({
        path: "/cinemas/map",
        query: {
          id
        }
      });
    },
    checkFilm() {
      this.showOverlay = true;
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../styles/common.less);
@import url(../../styles/cinemas_detail.less);
@import url(../../styles/vant_sf.less);
</style>
