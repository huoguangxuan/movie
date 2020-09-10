<template>
  <div class="search">
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
    <div class="hotsearch">
      <span class="search_title">热门搜索</span>
      <div class="search_content">
        <div
          class="hotsearch_text"
          v-for="(item, key) in searchLst"
          :key="key"
          @click="onSearch(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="historysearch">
      <span class="search_title">历史搜索</span>
      <div class="search_content">
        <div
          class="hotsearch_text"
          v-for="(item, key) in searchLst"
          :key="key"
          @click="onSearch(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { Search } from "vant";
export default {
  components: {
    [Search.name]: Search
  },
  data() {
    return {
      keyword: "",
      searchLst: [
        "刘德华",
        "战狼",
        "绝地武士",
        "大头儿子",
        "大头儿子",
        "大头儿子"
      ]
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
          console.log(res);
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
.search {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  .searchs {
    .van-search {
      padding-left: 17px;
      padding-right: 17px;
    }
    .van-search__content {
      width: 294px;
      background: #f6f6f6;
      border-radius: 40px;
      /deep/ .van-field__left-icon {
        margin-left: 19px;
        margin-right: 20px;
      }
    }
    .van-search__action {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #333333;
      text-align: right;
      line-height: 16px;
      padding: 0;
      margin-left: 15px;
    }
  }
  .hotsearch,
  .historysearch {
    padding: 0 17px;
    margin-top: 20px;
    .search_title {
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      font-size: 18px;
      color: #333333;
      text-align: right;
      line-height: 18px;
    }
    .search_content {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      .hotsearch_text {
        background: #f6f6f6;
        border-radius: 4px;
        width: 90px;
        height: 32px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        text-align: center;
        line-height: 32px;
        margin-right: 5px;
        margin-top: 5px;
      }
    }
  }
}
</style>
