<template>
  <div class="booking">
    <div class="header font18 black">支付结果</div>
    <div class="divider"></div>
    <section class="main">
      <qrcode-vue class="qrcode" :size="size" :value="ticketUrl"></qrcode-vue>
      <h3 class="font18 black "><b> 购票成功</b></h3>
      <div class="actions">
        <van-button
          @click.stop="$router.push('/')"
          round
          class="btn"
          color="linear-gradient(to right, #F8A10E, #EE6806)"
          >返回首页</van-button
        >
        <van-button
          @click.stop="$router.push('/ticket-detail')"
          round
          class="btn"
          color="linear-gradient(to right, #F8A10E, #EE6806)"
          >查看电影票</van-button
        >
      </div>
    </section>
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";
export default {
  name: "booking",
  data: function() {
    return {
      ticketUrl: "123456",
      size: 264
    };
  },
  components: {
    QrcodeVue
  }
};
</script>
<style lang="less" scoped>
.booking {
  .header {
    padding: 14px 0px;
    background-color: #fff;
    text-align: center;
  }
  .main {
    display: flex;
    flex-direction: column;
    padding: 20px 17px;
    background-color: #fff;
    align-items: center;
    .qrcode {
      canvas {
        width: 100% !important;
        height: 100% !important;
      }
      margin-bottom: 20px;
    }
    .actions {
      margin: 20px;
      margin-bottom: 0px;
      .btn {
        width: 120px;
      }
      .btn:last-child {
        margin-left: 35px;
      }
    }
  }
}
</style>
