<template>
  <div class="modifyphone">
    <div class="title">
      输入手机号
    </div>
    <div class="divider"></div>
    <div class="phone">
      <van-form validate-first>
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          v-model="newPhone"
          type="tel"
          label="手机号码"
          placeholder="请输入要修改的手机号码"
          :rules="[{ pattern, message: '请输入正确的手机号码' }]"
        />
      </van-form>
    </div>
    <van-button
      class="btn"
      round
      type="info"
      native-type="submit"
      @click="submit"
      color="linear-gradient(to right, #F8A10E, #EE6806)"
      >确定</van-button
    >
  </div>
</template>

<script>
import { Button, Form, Field } from "vant";
import api from "@/api";
export default {
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field
  },
  data() {
    return {
      newPhone: "",
      pattern: /^1[3456789]\d{9}$/
    };
  },
  methods: {
    submit() {
      if (/^1[34578]\d{9}$/.test(this.newPhone)) {
        this.$router.push({
          path: "/orderConfirm",
          query: { newMobile: this.newPhone }
        });
      }
    }
  },
  mounted() {
    this.$store.dispatch("changenavshow", false);
    this.newPhone = this.$route.query.oldMobile;
  }
};
</script>

<style lang="less" scoped>
.modifyphone {
  width: 100vw;
  height: 100vh;
  .title {
    height: 44px;
    background-color: white;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #333333;
    line-height: 44px;
    text-align: center;
  }
  .phone {
    padding: 0px 17px;
    font-size: 16px;
    background-color: white;
    /deep/.van-cell__title {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      color: #333333;
    }
    /deep/.van-field__control {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      color: #333333;
    }
  }
  .btn {
    width: 100vw;
    height: 50px;
    border-radius: 50px;
    position: absolute;
    bottom: 20px;
  }
}
</style>
