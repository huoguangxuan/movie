<template>
  <div class="home">
    <!-- 搜索导航栏 -->
    <div class="search">
      <van-search show-action placeholder="搜索影片、影院...">
        <template #action>
          <div>搜索</div>
        </template>
      </van-search>
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
    <!-- 正在热映/即将上映 -->
    <div class="film"></div>
    <!-- 热门活动 -->
    <div class="activities">
      <div class="activihead">
        <span class="headleft">热门活动</span>
        <span class="headright"
          >更多<img src="@/assets/images/more.png" />
        </span>
      </div>
      <div class="activicontent"></div>
    </div>
    <!-- 精选资讯 -->
    <div class="information">
      <div class="informationhead">
        <span class="headleft">精选资讯</span>
        <span class="headright"
          >更多<img src="@/assets/images/more.png" />
        </span>
      </div>
      <div class="informationcontent">
        <div class="exampel">
          <ul>
            <li class="exone">
              <span class="title">八佰将于8月20日全国上映</span>
              <span class="text"
                >八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映</span
              >
              <span class="time">八佰将于8月20日全国上映</span>
            </li>
            <li class="extwo">
              <img src="https://img.yzcdn.cn/vant/apple-1.jpg" />
            </li>
          </ul>
        </div>
        <div class="exampel">
          <ul>
            <li class="exone">
              <span class="title">八佰将于8月20日全国上映</span>
              <span class="text"
                >八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映八佰将于8月20日全国上映</span
              >
              <span class="time">八佰将于8月20日全国上映</span>
            </li>
            <li class="extwo">
              <img src="https://img.yzcdn.cn/vant/apple-1.jpg" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { Tab, Tabs, Search, Swipe, SwipeItem } from "vant";
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      activi: [],
      banner: []
    };
  },
  created() {},
  mounted() {
    this.getHomeData();
  },
  methods: {
    //首页banner，热映，即将上映，热门活动的数据接口
    getHomeData() {
      const params = { cityId: "北京" };
      api
        .getHomeData(params)
        .then(res => {
          console.log(res);
          this.activi = res.data.activity.data;
          this.banner = res.data.banner;
        })
        .catch(err => {
          console.log(err);
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
.search {
  width: 100vw;
  height: 44px;
  .van-search--show-action {
    height: 44px;
  }
}
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
.film {
  width: 100vw;
  height: 249px;
  background-color: royalblue;
}
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
  .activicontent {
    width: 100vw;
    height: 165.5px;
  }
}
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
        }
        .text {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #999999;
          line-height: 12px;
        }
        .time {
          font-family: PingFangSC-Regular;
          font-size: 10px;
          color: #666666;
          line-height: 10px;
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
