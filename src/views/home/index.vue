<template>
  <div class="home">
    hello world!
    <the-footer activeIndex="0" />
  </div>
</template>
<script>
// import { Dialog } from "vant";
import { mapState } from "vuex"; // createNamespacedHelpers
import TheFooter from "@/components/TheFooter";
export default {
  data: function() {
    return {
      value: "www.baidu.com",
      size: 150,
      show: false
    };
  },
  components: {
    "the-footer": TheFooter
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
.home {
  font-size: 24px;
}
</style>
