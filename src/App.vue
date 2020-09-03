<template>
  <div id="app">
    <!-- 内容区域 -->
    <router-view></router-view>
    <the-footer v-if="$store.state.show"></the-footer>
  </div>
</template>
<script>
import TheFooter from "@/components/TheFooter";
export default {
  components: {
    TheFooter
  },
  data() {
    return {};
  }
};
</script>
<style lang="less">
body {
  background: #f4f4f4 !important;
}
</style>
