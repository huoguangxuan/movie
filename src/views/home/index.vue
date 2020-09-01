<template>
  <div class="home">
    <!-- 搜索导航栏 -->
    <div class="search">
      <div class="searchcontent">
        <router-link :to="{ name: 'search' }">
          <div class="searchto">
            <img src="@/assets/images/searchglass.png" />
            <span class="searchtext">搜索影片、影院...</span>
          </div>
        </router-link>
        <div class="searchsite">
          <span>北京</span>
          <img src="@/assets/images/pull.png" />
        </div>
      </div>
    </div>
    <!-- banner位 -->
    <div class="banner">
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        style="width:341px;border-radius: 12px;"
      >
        <van-swipe-item v-for="(item, index) in banner" :key="index"
          ><img :src="item.imageUrl"
        /></van-swipe-item>
      </van-swipe>
    </div>
    <!-- 精选活动位 -->
    <div class="liveactivity">
      <div class="livecontent">
        <div class="liveleft">
          <img src="@/assets/images/liveactivity.png" />
        </div>
        <div class="liveright">
          <span class="exclusive">万达影票X联通专享</span>
          <van-button round type="info">限时兑换</van-button>
        </div>
      </div>
    </div>
    <!-- 正在热映/即将上映 -->
    <div class="film">
      <div class="filmhead">
        <span class="headleft">
          <span @click="num = 1" :class="{ active: num == 1 }" class="spanleft"
            >正在热映</span
          >
          <img class="long" src="@/assets/images/long.png" />
          <span @click="num = 2" :class="{ active: num == 2 }" class="spanright"
            >即将上映</span
          >
        </span>
        <router-link :to="{ name: num == 1 ? 'films' : 'films' }">
          <span class="headright">
            更多<img class="more" src="@/assets/images/more.png" />
          </span>
        </router-link>
      </div>
      <!-- 滑动正在热映 -->
      <div class="filmcontent" ref="filmcontent" v-show="num == 1">
        <!-- /* 这里是父盒子*/ -->
        <ul class="filmcont" ref="filmcont">
          <!-- 这里是子盒子，即滚动区域 -->
          <li class="cont-item" v-for="(item, index) in fail" :key="index">
            <img class="img" :src="item.playBillUrl" />
            <span class="filmname">{{ item.name }}</span>
            <router-link :to="{ name: 'booking' }">
              <van-button round type="info">购票</van-button>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 滑动即将上映 -->
      <div class="filmcontent" ref="comingcontent" v-show="num == 2">
        <!-- /* 这里是父盒子*/ -->
        <ul class="filmcont" ref="comingcont">
          <!-- 这里是子盒子，即滚动区域 -->
          <li class="cont-item" v-for="(item, index) in coming" :key="index">
            <img class="img" :src="item.playBillUrl" />
            <span class="filmname">{{ item.name }}</span>
            <span class="filmname">{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 热门活动 -->
    <div class="activities">
      <div class="activihead">
        <span class="headleft">热门活动</span>
        <router-link :to="{ name: 'activity' }">
          <span class="headright"
            >更多<img src="@/assets/images/more.png"
          /></span>
        </router-link>
      </div>
      <div class="wrapper" ref="wrapper">
        <!-- /* 这里是父盒子*/ -->
        <ul class="cont" ref="cont">
          <!-- 这里是子盒子，即滚动区域 -->
          <li class="cont-item" v-for="(item, index) in activi" :key="index">
            <img class="img" :src="item.photoUrl" />
          </li>
        </ul>
      </div>
    </div>
    <!-- 精选资讯 -->
    <div class="information">
      <div class="informationhead">
        <span class="headleft">精选资讯</span>
        <router-link :to="{ name: 'information' }">
          <span class="headright"
            >更多<img src="@/assets/images/more.png" />
          </span>
        </router-link>
      </div>
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
                ><span>消息来源：中国联通</span><span>2020-08-12</span></span
              >
            </li>
            <li class="extwo">
              <img src="https://img.yzcdn.cn/vant/apple-1.jpg" />
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
                ><span>消息来源：中国联通</span><span>2020-08-12</span></span
              >
            </li>
            <li class="extwo">
              <img src="https://img.yzcdn.cn/vant/apple-1.jpg" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from "@/components/TheFooter";
import BScroll from "better-scroll";
import api from "@/api";
import { Swipe, SwipeItem, Button } from "vant";
export default {
  components: {
    TheFooter,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Button.name]: Button
  },
  data() {
    return {
      activi: [],
      banner: [],
      fail: [],
      coming: [],
      length_activi: "",
      length_fail: "",
      length_coming: "",
      num: 1
    };
  },
  created() {},
  mounted() {
    this.getHomeData();
    this.$nextTick(() => {
      let timer = setTimeout(() => {
        // 其实我也不想写这个定时器的，这相当于又嵌套了一层$nextTick，但是不这么写会失败
        if (timer) {
          clearTimeout(timer);
          this.verScroll();
        }
      }, 0);
    });
  },
  methods: {
    //首页banner，热映，即将上映，热门活动的数据接口
    getHomeData() {
      const params = { cityId: "北京" };
      api
        .getHomeData(params)
        .then(res => {
          console.log(res);
          this.banner = res.data.banner;
          this.activi = res.data.activity.data;
          this.fail = res.data.showing.data;
          this.coming = res.data.coming.data;
          this.length_activi = res.data.activity.data.length;
          this.length_fail = res.data.showing.data.length;
          this.length_coming = res.data.coming.data.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    verScroll() {
      let width_active = this.length_activi * 110; // 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
      let width_fail = this.length_fail * 110;
      let width_coming = this.length_coming * 110;
      this.$refs.cont.style.width = width_active + "px"; // 修改滚动区域的宽度
      this.$refs.filmcont.style.width = width_fail + "px";
      this.$refs.comingcont.style.width = width_coming + "px";
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
          this.scroll = new BScroll(this.$refs.filmcontent, {
            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
          this.scroll = new BScroll(this.$refs.comingcontent, {
            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh(); //如果dom结构发生改变调用该方法
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  margin: 0;
  padding: 0;
  width: 100vw;
  background: #ffffff;
}
//搜索
.search {
  width: 100vw;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  .searchcontent {
    width: 341px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .searchto {
      width: 282px;
      height: 35px;
      background: #f6f6f6;
      border-radius: 35px;
      display: flex;
      align-items: center;
      img {
        width: 16px;
        height: 16px;
        margin-left: 20px;
        margin-right: 22px;
      }
      .searchtext {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
        text-align: right;
        line-height: 12px;
      }
    }
    .searchsite {
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        color: #333333;
        text-align: right;
        line-height: 12px;
      }
      img {
        width: 22px;
        height: 14px;
      }
    }
  }
}
//轮播图
.banner {
  width: 100vw;
  height: 185px;
  display: flex;
  justify-content: center;
  align-items: center;
  /deep/ .my-swipe .van-swipe-item {
    width: 341px;
    height: 150px;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    img {
      width: 341px;
      height: 150px;
    }
  }
}
//精选活动
.liveactivity {
  width: 100vw;
  height: 65px;
  margin-bottom: 20px;
  .livecontent {
    height: 65px;
    margin: 0px 17px;
    background: #f6f6f6;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    .liveleft {
      width: 100px;
      height: 65px;
      background-color: blue;
      border-radius: 8px 0px 0px 8px;
      img {
        width: 40px;
        height: 15px;
        margin-top: -16px;
      }
    }
    .liveright {
      width: 241px;
      height: 65px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .exclusive {
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #333333;
        line-height: 16px;
        margin-left: 8px;
        font-weight: bold;
      }
      .van-button {
        width: 78px;
        height: 36px;
        line-height: 36px;
        margin-right: 8px;
        background: #ff6024;
        box-shadow: 0 2px 12px 0 rgba(255, 96, 36, 0.7);
        border-radius: 30px;
        border: none;
        border-style: none;
        font-family: PingFangSC-Regular;
        font-size: 10px;
        color: #ffffff;
      }
    }
  }
}
//热门电影//即将上映
.film {
  width: 100vw;
  height: 249px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .filmhead {
    width: 341px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .headleft {
      font-family: PingFangSC-Semibold;
      font-size: 18px;
      color: #333333;
      text-align: right;
      line-height: 18px;
      .long {
        width: 1px;
        height: 15px;
        padding-right: 10px;
        padding-left: 10px;
      }
      span {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #666666;
        line-height: 18px;
      }
      .active {
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #333333;
        line-height: 18px;
      }
    }
    .headright {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666666;
      text-align: right;
      line-height: 14px;
    }
    .more {
      width: 8px;
      height: 11.5px;
      margin-bottom: 3px;
      margin-left: 9px;
    }
  }
  //热映/即将上映共用样式
  .filmcontent {
    width: 100vw;
    height: 231px;
    overflow: hidden;
    display: flex;
    align-items: center;
    touch-action: none;
    .filmcont {
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
        // align-items: center;
        .filmname {
          width: 100px;
          font-family: PingFang-SC-Bold;
          font-size: 16px;
          color: #333333;
          text-align: left;
          line-height: 16px;
          margin-top: 10px;
        }
        .van-button {
          width: 70px;
          height: 30px;
          background: #ff6024;
          box-shadow: 0 2px 12px 0 rgba(255, 96, 36, 0.7);
          border-radius: 30spx;
          margin-top: 10px;
          border: none;
          border-style: none;
        }
      }
      img {
        width: 100px;
        height: 130px;
      }
    }
  }
}
//热门活动
.activities {
  width: 100vw;
  height: 183.5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .activihead {
    width: 341px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .headleft {
      font-family: PingFangSC-Semibold;
      font-size: 18px;
      color: #333333;
      text-align: right;
      line-height: 18px;
    }
    .headright {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666666;
      text-align: right;
      line-height: 14px;
    }
    img {
      width: 8px;
      height: 11.5px;
      margin-bottom: 3px;
      margin-left: 9px;
    }
  }
  //活动的横向滑动样式
  .wrapper {
    touch-action: none;
    width: 100vw;
    height: 165.5px;
    overflow: hidden;
    display: flex;
    align-items: center;
    .cont {
      width: 750px;
      height: 130px;
      display: flex;
      align-items: center;
      flex-direction: row;
      padding-left: 9px;
      li {
        padding-left: 8px;
        width: 100px;
        height: 130px;
      }
      img {
        width: 100px;
        height: 130px;
      }
    }
  }
}
//精选资讯
.information {
  width: 100vw;
  background-image: linear-gradient(180deg, #ffffff 0%, #f4f4f4 43%);
  display: flex;
  align-items: center;
  flex-direction: column;
  .informationhead {
    width: 341px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .headleft {
      font-family: PingFangSC-Semibold;
      font-size: 18px;
      color: #333333;
      text-align: right;
      line-height: 18px;
    }
    .headright {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666666;
      text-align: right;
      line-height: 14px;
    }
    img {
      width: 8px;
      height: 11.5px;
      margin-bottom: 3px;
      margin-left: 9px;
    }
  }
  .informationcontent {
    width: 100vw;
    .exampel {
      width: 100vw;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15px;
      background-color: white;
      ul {
        width: 341px;
        height: 140px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .exone {
        width: 228px;
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-family: PingFang-SC-Bold;
          font-size: 14px;
          color: #333333;
          line-height: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .text {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #999999;
          line-height: 20px;
          .spanstart {
            overflow: hidden;
            -webkit-line-clamp: 3;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
          .spanend {
            float: right;
            padding-right: 4px;
            font-family: PingFangSC-Regular;
            font-size: 10px;
            color: #ff7030;
            line-height: 10px;
            img {
              width: 12px;
              height: 12px;
              margin-bottom: 2px;
              margin-left: 2px;
            }
          }
        }
        .time {
          font-family: PingFangSC-Regular;
          font-size: 10px;
          color: #666666;
          line-height: 10px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      }
      .extwo {
        width: 85px;
        height: 120px;
        img {
          width: 85px;
          height: 120px;
        }
      }
    }
  }
}
</style>
