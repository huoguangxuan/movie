<template>
  <div
    class="seat-area"
    :style="{
      width: seatAreaWidthRem + 'rem',
      height: seatAreaHeightRem + 'rem'
    }"
  >
    <div
      class="screen-box"
      :style="{
        top: 0 + 'rem',
        left: left + 'rem',
        transform: 'scale(' + scale + ')',
        transformOrigin: transformOrigin
      }"
    >
      <div class="screen font14 black">
        一号厅
      </div>
    </div>
    <div
      class="seat-tool"
      :style="{
        transform: 'scale(' + seatScale + ')',
        transformOrigin: transformOriginTool,
        left: 0 + 'rem',
        top: top + 'rem'
      }"
    >
      <div
        class="seat-bar"
        :style="{
          fontSize: seatToolFontSize + 'rem'
        }"
      >
        <template v-for="(item, index) in seatToolArr">
          <div
            class="seat-bar-item"
            :key="'seat-tool' + index"
            :style="{
              height: seatHeightWithScale + 'rem',
              width: seatToolWidthWithScale + 'rem',
              lineHeight: seatHeightWithScale + 'rem'
            }"
          >
            {{ item }}
          </div>
        </template>
      </div>
    </div>
    <v-touch
      class="box"
      ref="box"
      :pinch-options="{ threshold: 0.09 }"
      :pan-options="{ threshold: 0.01 }"
      :style="{
        transform: 'scale(' + scale + ')',
        transformOrigin: transformOrigin,
        width: seatAreaWidthRem + 'rem',
        height: seatAreaHeightRem + 'rem',
        top: top + 'rem',
        left: left + 'rem'
      }"
      @pinchout="pinchout"
      @pinchin="pinchin"
      @panmove="panmove"
      @panstart="panstart"
      @panend="panend"
    >
      <slot name="seat-area"></slot>
    </v-touch>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  props: {
    propSeatAreaWidthRem: Number,
    propSeatAreaHeightRem: Number,
    seatScale: Number,
    propMiddleLine: Number,
    propHorizontalLine: Number,
    propSeatToolArr: Array,
    propSeatBoxHeight: Number,
    propSeatHeight: Number
  },
  data: function() {
    return {
      scale: 1,
      top: 0,
      left: 0,
      startX: 0, // ---移动的起点X轴 单位px
      startY: 0, // ---移动的起点Y轴 单位px
      seatAreaWidthRem: this.propSeatAreaWidthRem,
      seatAreaHeightRem: this.propSeatAreaHeightRem,
      middleLine: this.propMiddleLine,
      horizontalLine: this.propHorizontalLine,
      // 触摸状态
      touchStatus: false,
      seatToolArr: this.propSeatToolArr,
      // .seatBox的高度
      seatBoxHeight: this.propSeatBoxHeight,
      seatHeight: this.propSeatHeight,
      screenRem:
        (document.body.clientWidth ||
          window.innerWidth ||
          document.documentElement.clientWidth) / 10
    };
  },
  components: {
    [Toast.name]: Toast
  },
  computed: {
    // 最大放大比例
    maxscale: function() {
      return 1 + 1 / this.seatScale;
    },
    // 左边触边吸附边界值rem
    crossleft: function() {
      let _this = this;
      return (_this.scale - 1) * _this.seatAreaWidthRem * _this.scaleXCross;
    },
    // 上边触边吸附边界值rem
    crosstop: function() {
      let _this = this;
      return (_this.scale - 1) * _this.seatAreaHeightRem * _this.scaleYCross;
    },
    // scale的倒数
    scalereciprocal: function() {
      return 1 / this.scale;
    },
    // 每个座位放大后的高度
    seatHeightWithScale: function() {
      let _this = this;
      return _this.seatHeight * _this.scale;
    },
    // seat-tool 内的字体大小
    seatToolFontSize: function() {
      let fontsize = 12 / 75;
      return fontsize * this.scale;
    },
    // seat-tool-item 的宽度
    seatToolWidthWithScale: function() {
      let _this = this;
      return 0.3 * _this.scale;
    },
    // 座位侧边栏需要偏移的长度
    seatToolMargin: function() {
      let _this = this;
      let height =
        _this.seatHeightWithScale *
        _this.yMax *
        _this.scaleYCross *
        (_this.seatScale - 1);
      return (
        _this.top +
        _this.seatHeightWithScale * _this.seatScale -
        _this.crosstop +
        height
      );
    },
    // css样式控制.box缩放中心点
    transformOrigin: function() {
      return this.scaleXCross * 100 + "%" + " " + this.scaleYCross * 100 + "%";
    },
    // css样式控制.seat-tool缩放中心点
    transformOriginTool: function() {
      return "0 " + this.scaleYCross * 100 + "%";
    },
    // 缩放.box区域 x轴的中心点
    scaleXCross: function() {
      return (this.middleLine / this.seatAreaWidthRem) * this.seatScale;
    },
    // 缩放.box区域 y轴的中心点
    scaleYCross: function() {
      return (this.horizontalLine / this.seatAreaHeightRem) * this.seatScale;
    }
  },
  watch: {
    propThumbnailAreaWidth: function(value) {
      this.thumbnailWidthRem = value;
    },
    propThumbnailAreaHeight: function(value) {
      this.thumbnailHeighthRem = value;
    },
    propYMax: function(value) {
      this.yMax = value;
    },
    propSeatScale: function(value) {
      this.seatScale = value;
    },
    propMiddleLine: function(value) {
      this.middleLine = value;
    },
    propHorizontalLine: function(value) {
      this.horizontalLine = value;
    },
    propSeatBoxHeight: function(value) {
      this.seatBoxHeight = value;
    },
    propSeatToolArr: function(value) {
      this.seatToolArr = value;
    }
  },
  mounted() {
    console.log("propSeatAreaWidthRem:", this.propSeatAreaWidthRem);
    console.log("---------------");
    console.log("propSeatAreaHeightRem:", this.propSeatAreaHeightRem);
    console.log("---------------");
    console.log("scale:", this.scale);
    console.log("---------------");

    console.log("horizontalLine:", this.horizontalLine);
    console.log("propMiddleLine:", this.propMiddleLine);
  },
  methods: {
    // 第一次点击座位改变放大比例
    changeScale: function() {
      // this.transformOrigin = x * 100 + "%" + " " + y * 100 + "%";
      if (this.maxscale === 2) {
        return;
      }
      this.scale = this.maxscale;
      // Toast(this.scale);
    },
    // changePosition: function(top, left) {
    //   if (this.maxscale === 1) {
    //     return;
    //   }
    //   let _this = this;
    //   // 0.67是上方 屏幕方向dom 部分偏移的部分 也是 .box margin-top 的50px
    //   _this.top = top * (this.scale - 1);
    //   _this.left = left * (this.scale - 1);
    // },
    pinchout() {
      // Toast("pinchout");
      let _this = this;
      if (_this.scale >= 0 && _this.scale < _this.maxscale) {
        _this.scale += 0.05;
      }
    },
    pinchin() {
      // Toast("pinchin");
      let _this = this;
      if (_this.scale > 1) {
        _this.scale -= 0.05;
      }
    },
    panmove(ev) {
      let _this = this;
      if (_this.touchStatus) {
        // 本次座位图移动横纵坐标rem的值
        _this.top = (ev.deltaY + _this.startY) / _this.screenRem;
        _this.left = (ev.deltaX + _this.startX) / _this.screenRem;
        // // .seatBox的高和缩略图的高 换算比例
        // let heightProportion =
        //   (_this.seatBoxHeight * _this.seatScale) / _this.thumbnailHeighthRem;
        // // .seatBox的宽和缩略图的宽 换算比例
        // let widthProportion = _this.seatAreaWidthRem / _this.thumbnailWidthRem;
        // // 本次缩略图移动横纵坐标rem的值
        // _this.topthumbnail =
        //   (-_this.top / heightProportion) * _this.scalereciprocal;
        // _this.leftthumbnail =
        //   (-_this.left / widthProportion) * _this.scalereciprocal;
      }
    },
    panstart() {
      // Toast("pinchstart");
      let _this = this;
      // 优化触摸性能
      _this.touchStatus = true;
      // 展示缩略图
      _this.thumbnailShow = true;
      // 获取上次记录的xy坐标作为起点
      _this.startY = _this.top * _this.screenRem;
      _this.startX = _this.left * _this.screenRem;
      // clearTimeout(_this.timer);
    },
    panend() {
      // Toast("panend");
      let _this = this;
      // 优化触摸性能
      _this.touchStatus = false;
      if (_this.scale === 1) {
        _this.top = 0;
        _this.left = 0;
        _this.topthumbnail = 0;
        _this.leftthumbnail = 0;
      } else {
        // 如果宽度度移动超过了边界值 把移动置为边界值
        // 找到边界值
        if (_this.left > _this.crossleft) {
          _this.left = _this.crossleft;
        } else if (_this.left < -_this.crossleft) {
          _this.left = -_this.crossleft;
        }
        // // 缩略图移动超过了边界值 把移动置为边界值
        // if (_this.leftthumbnail > _this.thumbnailWidthRemProportion) {
        //   _this.leftthumbnail = _this.thumbnailWidthRemProportion;
        // } else if (_this.leftthumbnail < -_this.thumbnailWidthRemProportion) {
        //   _this.leftthumbnail = -_this.thumbnailWidthRemProportion;
        // }
        // 如果高度移动超过了边界值 把移动置为边界值
        if (_this.top > _this.crosstop) {
          // Toast("top" + _this.crosstop);
          _this.top = _this.crosstop + 2;
        } else if (_this.top < -_this.crosstop) {
          _this.top = -_this.crosstop - 2;
        }
        // // 缩略图移动超过了边界值 把移动置为边界值
        // if (_this.topthumbnail > _this.thumbnailHeighthRemProportion) {
        //   _this.topthumbnail = _this.thumbnailHeighthRemProportion;
        // } else if (_this.topthumbnail < -_this.thumbnailHeighthRemProportion) {
        //   _this.topthumbnail = -_this.thumbnailHeighthRemProportion;
        // }
      }
      // _this.timer = setTimeout(() => {
      //   _this.thumbnailShow = false;
      // }, 2000);
    }
  }
};
</script>
<style lang="less">
.seat-area {
  overflow: hidden;
  position: relative;
  .box {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 0;
    background-color: green;
    // background: green;
    // transition: All 0.4s ease;
  }
}
.screen-box {
  height: 30px;
  overflow-y: hidden;
  display: flex;
  position: absolute;
  width: 100%;
  z-index: 99;
  justify-content: center;
  .screen {
    width: 180px;
    height: 70px;
    position: relative;
    text-align: center;
    border-radius: 50%;
    border: 3px solid black;
  }
}
.seat-tool {
  overflow: hidden;
  position: absolute;
  z-index: 99999;
  .seat-bar {
    display: flex;
    flex-direction: column;
    border-radius: 50px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    color: white;
    font-weight: bold;
    .seat-tool-item {
      padding: 0 0.05rem;
      font-size: 12px;
    }
  }
}
</style>
