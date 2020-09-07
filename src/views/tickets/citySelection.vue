<template>
  <div class="cityselection">
    <div class="title">
      <span>城市选择</span>
    </div>
    <div class="searchs">
      <van-search v-model="value"
                  @input="onSearch(value)"
                  @clear="clear"
                  placeholder="请输入城市名进行查询">
      </van-search>
    </div>
    <div v-show="showcontent"
         class="showcontent">
      <div class="location">
        <span class="location_title">热门搜索</span>
        <div class="location_content">
          <div class="location_text"
               v-for="(item, index) in hotsearch"
               :key="index"
               @click="TenchooseCity(item)">{{item}}</div>
        </div>
      </div>
      <div class="history">
        <span class="history_title">历史访问目的地</span>
        <div class="history_content">
          <div class="history_div"
               v-for="(item, index) in searchHistoryList"
               :key="index"
               @click="TenchooseCity(item)">
            <div class="history_text">{{ item }}</div>
          </div>
        </div>
      </div>
      <div class="hotcity">
        <span class="hotcity_title">热门城市</span>
        <div class="hotcity_content">
          <div class="hotcity_text"
               v-for="(item, index) in hotcity"
               :key="index"
               @click="TenchooseCity(item)">{{item}}</div>
        </div>
      </div>
      <div class="allcity">
        <van-index-bar class="indexBar"
                       :sticky="false"
                       highlight-color="#AE853A">
          <van-index-anchor v-for="(item, index) in citydata"
                            :key="index"
                            :index="item.initial">
            <span class="indexWord">{{ item.initial }}</span>
            <van-cell @click="chooseCity(citem)"
                      v-for="(citem, cindex) in item.list"
                      :key="cindex"
                      :title="citem.name" />
          </van-index-anchor>
        </van-index-bar>
      </div>
    </div>
    <div v-show="showlist"
         class="showlist">
      <van-cell v-for="(item, index) in cityarr"
                :key="index"
                :title="item.name"
                @click="chooseCity(item)" />
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
  data () {
    return {
      value: "",
      citydata: [],
      cityarr: [],
      showcontent: true,
      showlist: false,
      //搜索历史
      searchHistoryList: [],
      hotcity: ["北京", "上海", "深圳", "广州", "成都", "武汉", "杭州", "重庆"],
      hotsearch: ["北京"]
    };
  },
  created () { },
  mounted () {
    this.citydata = cityDts.city;
    this.$store.dispatch("changenavshow", false);
    this.HistoryList();
  },
  methods: {
    onSearch (value) {
      console.log(value);
      if (value) {
        let arr = [];
        for (let i = 0; i < this.citydata.length; i++) {
          let city = JSON.parse(JSON.stringify(this.citydata[i].list));
          let res = city.filter(function (i) {
            return i.name.indexOf(value) !== -1;
          });
          for (let j = 0; j < res.length; j++) {
            arr.push(res[j]);
            this.cityarr = arr;
          }
        }
      }
      this.showcontent = false;
      this.showlist = true;
    },
    chooseCity (citem) {
      this.setlocalcity(citem.name);
      this.$router.push({
        path: "/",
        query: {
          city: citem.name
        }
      });
    },
    TenchooseCity (citem) {
      this.setlocalcity(citem);
      this.$router.push({
        path: "/",
        query: {
          city: citem
        }
      });
    },
    clear () {
      this.showcontent = true;
      this.showlist = false;
    },
    HistoryList () {
      if (localStorage.getItem("seachList") !== null) {
        this.searchHistoryList = JSON.parse(localStorage.getItem("seachList"));
      }
    },
    //加入历史搜索记录
    setlocalcity (citem) {
      citem = citem.trim();
      if (this.searchHistoryList.length > 0) {
        // 有数据的话 判断
        if (this.searchHistoryList.indexOf(citem) !== -1) {
          // 有相同的，先删除 再添加
          this.searchHistoryList.splice(
            this.searchHistoryList.indexOf(citem),
            1
          );
          this.searchHistoryList.unshift(citem);
        } else {
          // 没有相同的 添加
          this.searchHistoryList.unshift(citem);
        }
      } else {
        // 没有数据 添加
        this.searchHistoryList.unshift(citem);
      }
      if (this.searchHistoryList.length > 6) {
        // 保留六个值
        this.searchHistoryList.pop();
      }
      localStorage.setItem("seachList", JSON.stringify(this.searchHistoryList));
    }
  },
  watch: {
    value () {
      if (this.value == "") {
        this.showcontent = true;
        this.showlist = false;
      }
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
      .van-search__content {
        height: 30px;
        background: #f6f6f6;
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
      display: flex;
      flex-wrap: wrap;
      .history_div {
        margin-top: 10px;
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
  .showlist {
  }
}
</style>
