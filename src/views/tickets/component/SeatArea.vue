<template>
  <div>
    <div class="screen">
      <div class="screen-num">一号厅</div>
    </div>
    <slot name="seat-area"></slot>
  </div>
</template>
<script>
export default {
  methods: {
    selectedSeat() {}
  }
};
</script>
<style lang="less">
.seats {
  background-color: #f7f8f9;
  padding-bottom: 140px;
  height: calc(100vh - 140px);
  .screen {
    width: 120px;
    margin: 0 auto;
    border-top: 25px solid #dfdfdf;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    &-num {
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      margin-top: -22px;
    }
  }
}
</style>
