<template>
  <div class="film">
    <van-icon class="back" name="arrow-left" @click="$router.back(-1)" />
    <video-player
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      customEventName="customstatechangedeventname"
    />
    <div class="film-info">
      <div class="left">
        <h3 class="film-title">{{ film.movieName }}</h3>
        <p class="film-feature" style="margin-bottom:4px">
          {{ film.duration }} / {{ film.movieCategory }} / {{ film.origin }}
        </p>
        <p class="film-feature">{{ film.runDate }}</p>
        <div class="actions">
          <van-button
            icon="like-o"
            size="small"
            style="margin-right:14px"
            type="default"
            >想看</van-button
          >
          <van-button icon="star-o" size="small" type="default"
            >收藏</van-button
          >
        </div>
      </div>
      <div class="right">
        <img
          class="poster"
          src="https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@160w_220h_1e_1c"
          alt
        />
      </div>
    </div>
    <div class="divider"></div>
    <div class="film-story">
      <h3 class="film-title">剧情简介</h3>
      <p class="film-content" :class="{ 'van-multi-ellipsis--l3': !showMore }">
        {{ film.introduction }}
      </p>
      <div class="ac story-action" @click="toggleContent">
        <van-icon class="font16" :name="showMore ? 'arrow-up' : 'arrow-down'" />
      </div>
    </div>
    <div class="divider"></div>
    <div class="film-actors">
      <h3 class="film-title">
        <span>演职人员</span>
        <!-- <span class="font14 gray more">
          更多
          <van-icon class="more-arrow" name="arrow" />
        </span> -->
      </h3>
      <div class="wrapper" ref="wrapper">
        <ul class="actors bscroll-container" ref="scrollUl">
          <li
            class="ac item"
            v-for="item in film.celebrityMovieRoles"
            :key="item.actor.id"
          >
            <img class="avatar" :src="item.actor.avatarLogo" alt />
            <p class="font14 black">{{ item.roleType }}</p>
            <p class="font12">{{ item.actor.name }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="divider"></div>
    <div class="film-photos">
      <h3 class="film-title">
        <span>剧照</span>
        <span
          class="font14 gray more"
          @click="
            $router.push({
              path: '/film-detail/photos',
              params: { movieId: film.movieId, moreType: 'photo' }
            })
          "
        >
          更多
          <van-icon class="more-arrow" name="arrow" />
        </span>
      </h3>
      <div class="wrapper" ref="wrapper2">
        <ul class="actors bscroll-container" ref="scrollUl2">
          <li class="ac item" v-for="item in photos" :key="item.sort">
            <img class="avatar" :src="item.photoUrl" alt />
          </li>
        </ul>
      </div>
    </div>
    <div class="divider"></div>
    <div class="film-comments">
      <h3 class="film-title">影评</h3>
      <ul>
        <li class="comment">
          <div class="left">
            <img
              class="user-avatar"
              src="https://img.meituan.net/maoyanuser/63957f10ae9679c95d4ba26ad1bd29c816882.png@100w_100h_1e_1c"
            />
          </div>
          <div class="right">
            <h3 class="font14 black">村东头的年华</h3>
            <p class="font12 orange">畅爽冰淇淋5G套餐129元</p>
            <p class="comment-content font14">不错的影片，很好，很震撼</p>
            <div class="film-card">
              <img
                class="poster"
                src="https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@100w_130h_1e_1c"
                alt
              />
              <div class="info">
                <h3 class="font16 black">八佰</h3>
                <p class="font12 mtb5">147分钟 / 中国大陆</p>
                <p class="font12">战争 / 历史</p>
              </div>
              <div class="score">
                <p class="font16">
                  评分
                  <span class="orange">9.2</span>
                </p>
              </div>
            </div>
            <div class="actions ar">
              <van-button
                icon="like-o"
                class="font14"
                size="mini"
                color="#fff"
                plain
                >{{ likeCount }}</van-button
              >
              <van-button
                icon="chat-o"
                class="font14"
                size="mini"
                color="#fff"
                plain
                >{{ commentCount }}</van-button
              >
            </div>
          </div>
        </li>
        <li class="comment">
          <div class="left">
            <img
              class="user-avatar"
              src="https://img.meituan.net/maoyanuser/63957f10ae9679c95d4ba26ad1bd29c816882.png@100w_100h_1e_1c"
            />
          </div>
          <div class="right">
            <h3 class="font14 black">村东头的年华</h3>
            <p class="font12 orange">畅爽冰淇淋5G套餐129元</p>
            <p class="comment-content font14">不错的影片，很好，很震撼</p>
            <div class="film-card">
              <img
                class="poster"
                src="https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@100w_130h_1e_1c"
                alt
              />
              <div class="info">
                <h3 class="font16 black">八佰</h3>
                <p class="font12 mtb5">147分钟 / 中国大陆</p>
                <p class="font12">战争 / 历史</p>
              </div>
              <div class="score">
                <p class="font16">
                  评分
                  <span class="orange">9.2</span>
                </p>
              </div>
            </div>
            <div class="actions ar">
              <van-button
                icon="like-o"
                class="font14"
                size="mini"
                color="#fff"
                plain
                >{{ likeCount }}</van-button
              >
              <van-button
                icon="chat-o"
                class="font14"
                size="mini"
                color="#fff"
                plain
                >{{ commentCount }}</van-button
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="buy ac">
      <van-button
        @click.stop="
          $router.push({ path: '/choseSeat', params: { movieId: 1 } })
        "
        class="buy-btn"
        color="linear-gradient(to right, #F8A10E, #EE6806)"
        >去购票</van-button
      >
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import { Icon, Button } from "vant";
import api from "@/api";
export default {
  components: {
    videoPlayer,
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  data() {
    return {
      playerOptions: {
        // videojs options
        muted: true,
        autoplay: false,
        loop: false,
        preload: "auto",
        language: "zh-CN",
        fluid: true,
        aspectRatio: "16:9",
        // playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src:
              "https://vod.pipi.cn/fec9203cvodtransbj1251246104/60f55aef5285890806951237435/v.f42906.mp4"
          }
        ],
        poster:
          "https://p0.meituan.net/movie/48f2fa0329c018fae54be3744f99cbef307649.jpg@120w_80h_1e_1c",
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      film: {},
      photos: [],
      showMore: false,
      likeCount: 1229,
      commentCount: 28
    };
  },
  created() {
    this.getFilmDetail();
    this.$store.dispatch("changenavshow", false);
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    getFilmDetail() {
      const params = {
        // movieId: this.$router.params.movieId || 0
        movieId: 0
      };
      api.films
        .getFilmDetail(params)
        .then(res => {
          this.film = res.data;
          this.photos = res.data.photos.photo;
          let width = this.film.celebrityMovieRoles.length * 2.24 + 0.18;
          let width2 = this.photos.length * 5.44 + 0.18;
          this.$refs.scrollUl.style.width = width + "rem";
          this.$refs.scrollUl2.style.width = width2 + "rem";
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.wrapper, {
              scrollX: true,
              // 忽略竖直方向的滚动
              scrollY: false,
              eventPassthrough: "vertical"
            });
            this.scroll2 = new BScroll(this.$refs.wrapper2, {
              scrollX: true,
              // 忽略竖直方向的滚动
              scrollY: false,
              eventPassthrough: "vertical"
            });
          });
        })
        .catch();
    },
    toggleContent() {
      this.showMore = !this.showMore;
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.vjs-big-play-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  left: 160px;
  top: 80px;
}
.film {
  position: relative;
  .back {
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    position: absolute;
    padding: 10px;
    z-index: 99;
  }
  &-info {
    display: flex;
    margin: 10px 18px;
    .left {
      position: relative;
      flex: 1;
      .actions {
        position: absolute;
        bottom: 0;
      }
    }
    .right {
      .poster {
        width: 115px;
        height: 135px;
        border-radius: 8px;
      }
    }
  }
  &-story {
    margin: 10px 18px;
    margin-bottom: 0px;
    .story-action {
      padding: 8px 0px;
    }
  }
  &-actors {
    margin: 10px 18px;
    .wrapper {
      overflow: hidden;
    }
    .actors {
      .item {
        .avatar {
          border-radius: 2px;
          width: 80px;
          height: 100px;
        }
        display: inline-block;
        margin-right: 6px;
        .black {
          margin-top: 8px;
          margin-bottom: 6px;
        }
      }
    }
  }
  &-photos {
    margin: 10px 18px;
    .wrapper {
      overflow: hidden;
    }

    .actors {
      .item {
        .avatar {
          border-radius: 2px;
          width: 200px;
          height: 100px;
        }
        display: inline-block;
        margin-right: 6px;
        .black {
          margin-top: 8px;
          margin-bottom: 6px;
        }
      }
    }
  }
  &-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
    color: #333;
    display: flex;
    span:nth-child(1) {
      flex: 1;
    }
    .more {
      align-self: center;
      &-arrow {
        position: relative;
        top: 2px;
      }
    }
  }
  &-content {
    line-height: 24px;
    font-size: 14px;
    text-align: justify;
    text-justify: inter-ideograph; /*IE*/
  }
  &-feature {
    font-size: 12px;
  }
  &-comments {
    margin: 10px 18px;
    margin-bottom: 70px;
    .comment {
      display: flex;
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #eeeeee;
      .left {
        margin-right: 10px;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .right {
        flex: 1;
        .orange {
          margin-top: 7px;
        }
        .comment-content {
          margin-top: 9px;
          margin-bottom: 10px;
        }
        .film-card {
          padding: 5px;
          border-radius: 4px;
          background: #f4f4f4;
          display: flex;

          .info {
            flex: 1;
            display: inline-block;
            padding: 0px 10px;
          }
          .score {
            align-self: center;
            margin-right: 4px;
          }
          .poster {
            width: 50px;
            height: 65px;
            border-radius: 3px;
          }
        }
        .actions {
          padding-top: 8px;
        }
      }
    }
  }
  .bscroll-container {
    white-space: nowrap;
    overflow: hidden;
  }
}
.buy {
  position: fixed;
  width: 100%;
  bottom: 10px;
  &-btn {
    width: 340px;
  }
}
/deep/ .van-button--default {
  background-color: #ebedf0;
  border-radius: 5px;
  padding-right: 28px;
  padding-left: 28px;
}
/deep/ .van-button--plain {
  color: #666 !important;
  padding: 4px 8px;
  background-color: #fff;
}
</style>
