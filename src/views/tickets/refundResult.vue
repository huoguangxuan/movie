<template>
  <div class="page-wrap refund-result">
    <div class="contain-box">
      <div class="status">
        <img src="@/assets/images/refund_status.png" alt="" />
        <h4 :class="{ 'status-fail': status === 1 }">申请通过，退款中</h4>
        <p>到账时间：预计7个工作日原路返回</p>
      </div>
      <van-cell title="退款金额" value-class="money" value="39.9元" />
      <van-cell title="退款账户" value="原支付账户" />
      <van-cell title="退款流程" />
      <van-steps direction="vertical" :active="0">
        <van-step>
          <h3>退款申请已提交</h3>
          <p>提交退款申请</p>
          <p>2016-07-12 12:40</p>
        </van-step>
        <van-step>
          <h3>退款处理完成</h3>
          <p>2016-07-12 12:40</p>
          <p>2016-07-11 10:00</p>
        </van-step>
      </van-steps>
    </div>
    <div class="tel">
      <h4>客服电话：<span>1000000</span></h4>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { CellGroup, Cell, Step, Steps } from "vant";

Vue.use(CellGroup);
Vue.use(Cell);
Vue.use(Step);
Vue.use(Steps);
export default {
  name: "refundResult",
  data() {
    return {
      radio: "1",
      status: 0
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
@import url(../../styles/common.less);
@import url(../../styles/refund_result.less);
@import url(../../styles/vant_sf.less);
</style>
