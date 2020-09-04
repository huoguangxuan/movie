<template>
  <div class="cityselection">
    <div class="title">
      <span>城市选择</span>
    </div>
    <div class="searchs">
      <van-search
        v-model="value"
        @input="onSearch(value)"
        placeholder="输入城市名、拼音或字母查询"
      >
      </van-search>
    </div>
    <div class="location">
      <span class="location_title">热门搜索</span>
      <div class="location_content">
        <div class="location_text">北京</div>
      </div>
    </div>
    <div class="history">
      <span class="history_title">历史访问目的地</span>
      <div class="history_content">
        <div class="history_text">北京</div>
      </div>
    </div>
    <div class="hotcity">
      <span class="hotcity_title">热门城市</span>
      <div class="hotcity_content">
        <div class="hotcity_text">北京</div>
        <div class="hotcity_text">上海</div>
        <div class="hotcity_text">成都</div>
        <div class="hotcity_text">重庆</div>
        <div class="hotcity_text">西安</div>
        <div class="hotcity_text">杭州</div>
      </div>
    </div>
    <div class="allcity">
      <van-index-bar class="indexBar" :sticky="false" highlight-color="#AE853A">
        <van-index-anchor
          v-for="(item, index) in cityDts"
          :key="index"
          :index="item.initial"
        >
          <span class="indexWord">{{ item.initial }}</span>
          <van-cell
            @click="chooseCity(citem)"
            v-for="(citem, cindex) in item.list"
            :key="cindex"
            :title="citem.name"
          />
        </van-index-anchor>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import cityDts from "@/views/tickets/component/city.json";
import { Search, IndexBar, IndexAnchor, Cell } from "vant";
export default {
  components: {
    [Search.name]: Search,
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Cell.name]: Cell
  },
  data() {
    return {
      value: "",
      cityDts: []
    };
  },
  created() {},
  mounted() {
    this.cityDts = cityDts.city;
    this.$store.dispatch("changenavshow", false);
  },
  methods: {
    onSearch(val) {
      if (val.trim()) {
        this.showIndexBar = false;
        let res = this.cityDts.filter(i => {
          console.log(i);
          return i.name.indexOf(val) !== -1;
        });
        this.cityDts = res;
      } else {
        this.showIndexBar = true;
      }
    },
    chooseCity(citem) {
      console.log(citem);
      alert(citem.name);
    }
  }
};
</script>

<style lang="less" scoped>
.cityselection {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  .title {
    width: 100vw;
    height: 44px;
    text-align: center;
    line-height: 44px;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    border-bottom: 1px solid #ececec;
    margin-bottom: 10px;
  }
  .searchs {
    .van-search {
      height: 30px;
      margin: 10px 17px;
      background: #f6f6f6;
      border-radius: 40px;
      /deep/ .van-field__left-icon {
        margin-left: 10px;
        margin-right: 20px;
      }
    }
  }
  .location {
    padding: 0 17px;
    margin-top: 20px;
    .location_title {
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      font-size: 18px;
      color: #333333;
      text-align: right;
      line-height: 18px;
    }
    .location_content {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      .location_text {
        border: 1px solid #ff6024;
        border-radius: 4px;
        width: 90px;
        height: 32px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #ff6024;
        text-align: center;
        line-height: 32px;
        margin-right: 5px;
        margin-top: 5px;
      }
    }
  }
  .history {
    padding: 0 17px;
    margin-top: 20px;
    .history_title {
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      font-size: 18px;
      color: #333333;
      text-align: right;
      line-height: 18px;
    }
    .history_content {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      .history_text {
        border: 1px solid #cccccc;
        border-radius: 4px;
        width: 90px;
        height: 32px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        text-align: center;
        line-height: 32px;
        margin-right: 5px;
        margin-top: 5px;
      }
    }
  }
  .hotcity {
    padding: 0 17px;
    margin-top: 20px;
    .hotcity_title {
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      font-size: 18px;
      color: #333333;
      text-align: right;
      line-height: 18px;
    }
    .hotcity_content {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      .hotcity_text {
        border: 1px solid #cccccc;
        border-radius: 4px;
        width: 90px;
        height: 32px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        text-align: center;
        line-height: 32px;
        margin-right: 5px;
        margin-top: 5px;
      }
    }
  }
  .allcity {
    margin-top: 15px;
    width: 100vw;
    background-color: white;
    .van-index-anchor {
      padding: 0px 17px;
    }
  }
}
</style>
