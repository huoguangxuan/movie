<template>
  <div class="home">
    首页
    <van-tabs :animated="true" :duration="0.5">
      <van-tab v-for="index in 8">
        <template #title>选项 </template>
        <van-tabs>
          <van-tab v-for="index in 8" :title="'标签 ' + index">
            内容 {{ index }}
          </van-tab>
        </van-tabs>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.home {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}
</style>
