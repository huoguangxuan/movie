<template>
  <div class="flexcc flexcol welcome" style="height:100vh">
    hello world!
  </div>
</template>
<script>
// import { Dialog } from "vant";
import { mapState } from "vuex"; // createNamespacedHelpers
export default {
  data: function() {
    return {
      value: "www.baidu.com",
      size: 150,
      logoSrc: require("@/assets/logo.png"),
      show: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      // this.$store.dispatch("user/isLogin", "22:19:ac:18:24").then(() => {
      //   console.log(this.user);
      // });
    }
  }
};
</script>
<style lang="less" scoped>
.logo {
  width: 200px;
  padding: 10px;
  background: #ccc;
}
.welcome p {
  font-size: 24px;
}
</style>
