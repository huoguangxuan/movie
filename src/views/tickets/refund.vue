<template>
  <div class="page-wrap refund-tickets">
    <van-nav-bar title="申请退票" right-text="退票规则" />
    <div class="money">
      <h4>退款金额： <span>39.9元</span></h4>
    </div>

    <div class="question-title">
      <h4>请至少选择一个退款原因</h4>
    </div>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="我不想要了" clickable @click="radio = '1'">
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell title="我定错了" clickable @click="radio = '2'">
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
        <van-cell title="临时有事去不了" clickable @click="radio = '3'">
          <template #right-icon>
            <van-radio name="3" />
          </template>
        </van-cell>
        <van-cell title="其他" clickable @click="radio = '4'">
          <template #right-icon>
            <van-radio name="4" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <button class="main-btn" @click="toResult">确定</button>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, RadioGroup, Radio, Cell, CellGroup } from "vant";

Vue.use(NavBar);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Cell);
Vue.use(CellGroup);
export default {
  name: "refundTickets",
  data() {
    return {
      radio: "1"
    };
  },
  mounted() {},
  methods: {
    toResult() {
      this.$router.push({
        path: "/refund/result"
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../styles/common.less);
@import url(../../styles/refund.less);
@import url(../../styles/vant_sf.less);
</style>
