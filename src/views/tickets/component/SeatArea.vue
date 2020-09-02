<template>
  <div
    class="seat-area"
    :style="{
      width: seatAreaWidthRem + 'rem',
      height: seatAreaHeightRem + 'rem'
    }"
  >
    <slot name="seat-area"></slot>
  </div>
</template>
<script>
export default {
  props: {
    seatAreaWidthRem: Number,
    seatAreaHeightRem: Number,
    seatScale: Number
  },
  methods: {
    selectedSeat() {}
  }
};
</script>
<style lang="less">
.seat-area {
  // background: lightpink;
}
.seats {
  background-color: #f7f8f9;
  padding-bottom: 140px;
}
</style>
