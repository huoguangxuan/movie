<template>
  <div class="seat-block">
    <div class="info-block">
      <h3 class>选座</h3>
    </div>
    <ul class="seat-type-info">
      <li>
        <img src="@/assets/images/type_free.png" alt />
        可选
      </li>
      <li>
        <img src="@/assets/images/type_disable.png" alt />
        不可选
      </li>
      <li>
        <img src="@/assets/images/type_sold.png" alt />
        已售
      </li>
      <li>
        <img src="@/assets/images/type_love.png" alt />
        情侣座
      </li>
      <li>
        <img src="@/assets/images/type_vip.png" alt />
        最佳观影区
      </li>
    </ul>
    <div class="select-block" :style="{ height: selectBlockHeight + 'rem' }">
      <div class="select-block-warp" style="visibility: visible;">
        <div
          class="hall-name-wrapper"
          :class="{ animate: panStatus }"
          :style="{
            transformOrigin: transformOrigin,
            transform: `translate3d(${translateX +
              3}rem, 0rem, 0rem) scale(${seatScale},${seatScale}) rotate3d(0, 0, 0, 0deg)`
          }"
        >
          <span class="hall-name">3号高清激光厅</span>
        </div>
        <div
          class="row-nav"
          :class="{ animate: panStatus }"
          :style="{
            transformOrigin: '0',
            transform: `translate3d(0rem, ${translateY}rem, 0rem) scale(${seatScale},${seatScale})`
          }"
        >
          <div v-for="index in rows" :key="index">{{ index }}</div>
        </div>
        <v-touch
          class="seats-block"
          ref="seatsBlock"
          :class="{ animate: panStatus }"
          :style="{
            width: seatWrapWidth + 'rem',
            transform: `translate3d(${translateX}rem, ${translateY}rem, 0rem) scale(${seatScale})`
          }"
          :pinch-options="{ threshold: 0.09 }"
          :pan-options="{ threshold: 0.01 }"
          @pinchout="pinchout"
          @pinchin="pinchin"
          @panmove="panmove"
          @panstart="panstart"
          @panend="panend"
        >
          <div class="m-line"></div>
          <div class="seats-wrap" :style="{ width: seatWrapWidth + 'rem' }">
            <div
              v-for="(seat, index) in seatList"
              class="wrap"
              :class="{
                'love left': seat.type === 'L',
                'love right': seat.type === 'R'
              }"
              :data-status="seat.status"
              :key="index"
              @click="handleSeatClick($event, seat)"
            >
              <div class="seat" :style="{ width: width + 'rem', height: height + 'rem' }"></div>
            </div>
          </div>
        </v-touch>
      </div>
    </div>
    <div class="broad-cast" @click="showAll = !showAll">
      <img class="laba-icon" style src="@/assets/images/laba.png" alt />
      <span class="font12 text">观影期间请全程佩戴口罩，感谢配合！</span>
      <van-icon name="arrow" class="font14 arrow" />
    </div>
    <div class="divider"></div>
    <!-- <p class="tit">已选座位:</p> -->
    <section class="seats-select">
      <section class="seats-select-desc">
        <h5 class="seats-select-desc-film">
          八佰
          <span class="seats-select-desc-cinema">地质礼堂</span>
        </h5>

        <p class="seats-select-desc-time">今天 08月26日 20:00(国语2D)</p>
        <p class="seats-select-desc-action orange font14">切换场次</p>
      </section>
      <!-- <p class="tit">已选座位:</p> -->
      <div class="scroll" ref="scroll">
        <ul class="select scroll-ul" ref="scrollUl">
          <li
            class="scroll-item"
            v-for="item in selectedSeatList"
            :key="'select' + item.seatId"
            @click="cancelSelect(item)"
          >
            {{ item.row }}排{{ item.column }}座
            <br />
            <span class="orange">{{ item.seatPrice }}元</span>
          </li>
        </ul>
      </div>
    </section>
    <div class="buy-block buy ac">
      <van-button
        @click.stop="
          $router.push({ path: '/orderConfirm', params: { movieId: 1 } })
        "
        round
        class="buy-btn"
        color="linear-gradient(to right, #F8A10E, #EE6806)"
      >去购票</van-button>
    </div>
    <!-- //广播弹框 -->
    <van-popup v-model="showAll" position="bottom" :style="{ height: '50%' }">
      <div class="popup-title font18 ac black">
        观影须知
        <van-icon @click="showAll = false" class="cross font18" name="cross" />
      </div>
      <div class="popup-body">
        <p class="font14">1.请全程佩戴口罩</p>
        <p class="font14">2.请不要在影厅就餐</p>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { list } from "./seatList.js";
import { Toast, Icon, Popup } from "vant";
export default {
  name: "select-seat",
  data: function () {
    return {
      showAll: false,
      rows: 9,
      cols: 12,
      seatList: list,
      selectedSeatList: [],
      maxSelect: 6,
      width: 1,
      height: 1,
      touchStatus: false,
      panStatus: false,
      seatScale: 1,
      initScale: 0,
      seatScaleX: 1,
      seatScaleY: 1,
      left: 0,
      top: 0,
      translateX: 0,
      translateY: 0,
      startX: 0, // ---移动的起点X轴 单位px
      startY: 0, // ---移动的起点Y轴 单位px
      transformOrigin: "50% 0",
      bundingLeft: 0, //边界左
      bundingRight: 0, //边界右
      bundingTop: 0, //边界上
      bundingBottom: 0, //边界下
      screenRem:
        (document.body.clientWidth ||
          window.innerWidth ||
          document.documentElement.clientWidth) / 10
    };
  },
  components: {
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Popup.name]: Popup
  },
  computed: {
    maxScale() {
      return 1;
    },
    selectBlockHeight() {
      let height =
        document.documentElement.clientHeight ||
        window.innerHeight ||
        document.body.clientHeight;
      let otherDom = (44 + 30 + 40 + 10 + 132 + 60) / 37.5;
      return height / this.screenRem - otherDom;
    },
    seatWrapWidth() {
      return this.cols;
    },
    seatWrapHeight() {
      return this.rows;
    }
  },
  created() {
    if (this.seatWrapWidth > 10) {
      this.seatScaleX = 1 - (this.seatWrapWidth - 10) / 10;
    } else {
      this.seatScaleX = 1;
    }
    if (this.seatWrapHeight > this.selectBlockHeight) {
      this.seatScaleY = 1 - (this.seatWrapHeight - this.selectBlockHeight) / 10;
    } else {
      this.seatScaleY = 1;
    }
    this.seatScale =
      this.seatScaleX < this.seatScaleY ? this.seatScaleX : this.seatScaleY;
    this.initScale = this.seatScale;
    this.translateX = (10 - this.seatWrapWidth) / 2;
    this.translateY = -(this.seatWrapHeight - this.selectBlockHeight) / 2;
  },
  methods: {
    handleSeatClick(e, seatItem) {
      this.panStatus = true;
      if (seatItem.status === "1") {
        //可售
        this.seatScale = this.maxScale;
        const c_index = e.currentTarget.className.indexOf("active");
        c_index < 0
          ? this._selectSeat(e, seatItem)
          : this._unselectSeat(e, seatItem);
      }
      console.log(this.selectedSeatList);
    },
    _selectSeat(e, seatItem) {
      //判断是否超出最大选座数---普通
      if (this.selectedSeatList.length >= this.maxSelect) {
        Toast("最多只能选择" + this.maxSelect + "个座位哦~");
        return;
      }

      if (seatItem.type === "L" || seatItem.type === "R") {
        if (this.selectedSeatList.length >= this.maxSelect - 1) {
          //情侣座
          Toast("最多只能选择" + this.maxSelect + "个座位哦~");
          return;
        }
        this._computeClass(e, seatItem, "select");
      }
      this.selectedSeatList.push(seatItem);
      e.currentTarget.className = e.currentTarget.className + " active";
    },
    _unselectSeat(e, seatItem) {
      e.currentTarget.className = e.currentTarget.className.replace(
        " active",
        ""
      );
      if (seatItem.type === "L" || seatItem.type === "R") {
        this._computeClass(e, seatItem, "unselect");
      } else {
        this.selectedSeatList = this.selectedSeatList.filter(
          i => i.seatNo !== seatItem.seatNo
        );
      }
    },
    _computeClass(e, seatItem, action) {
      const curItem = element => element.seatNo === seatItem.seatNo;
      const curIndex = this.seatList.findIndex(curItem);
      const activeIndex = seatItem.type === "L" ? curIndex + 1 : curIndex - 1;
      const prefixStr = seatItem.type === "L" ? "next" : "previous";
      if (action === "select") {
        e.currentTarget[`${prefixStr}ElementSibling`].className =
          e.currentTarget[`${prefixStr}ElementSibling`].className + " active";
        this.selectedSeatList.push(this.seatList[activeIndex]);
      } else {
        e.currentTarget[
          `${prefixStr}ElementSibling`
        ].className = e.currentTarget[
          `${prefixStr}ElementSibling`
        ].className.replace(" active", "");
        this.selectedSeatList = this.selectedSeatList.filter(
          f =>
            f.seatNo !== seatItem.seatNo &&
            f.seatNo !== this.seatList[activeIndex].seatNo
        );
      }
    },
    panmove(ev) {
      this.panStatus = false;
      this.translateX = (ev.deltaX + this.startX) / this.screenRem;
      this.translateY = (ev.deltaY + this.startY) / this.screenRem;
    },
    panstart() {
      this.touchStatus = true;
      this.startY = this.translateY * this.screenRem;
      this.startX = this.translateX * this.screenRem;
    },
    pinchout() {
      if (this.seatScale >= 0 && this.seatScale < this.maxScale) {
        this.seatScale += 0.05;
      }
    },
    pinchin() {
      Toast(this.translateX, this.translateY);
      if (this.seatScale > this.initScale) {
        this.seatScale -= 0.05;
      }
    },
    panend() {
      this.panStatus = true;
      //四个边界值的计算问题
      if (this.translateX > 1) {
        this.translateX = 1;
      } else if (this.translateX < -3) {
        this.translateX = -3;
      }
      if (this.translateY > 1) {
        this.translateY = 1;
      } else if (this.translateY < -1) {
        this.translateY = -1;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.animate {
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.seat-block {
  position: relative;
  background-color: #fff;
  .info-block {
    position: relative;
    height: 44px;
    h3 {
      font-size: 16px;
      color: #333;
      line-height: 44px;
      text-align: center;
    }
  }
  .seat-type-info {
    border-top: 1px solid #eeeeee;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    li {
      display: inline-block;
      padding: 0px 5px;
      img {
        height: 11px;
        vertical-align: middle;
        position: relative;
        top: -1px;
      }
      font-size: 11px;
    }
  }
  .hall-name-wrapper {
    position: absolute;
    z-index: 10;
  }
  .hall-name {
    display: block;
    line-height: 22px;
    width: 6rem;
    font-size: 13px;
    background: #e3e3e3;
    text-align: center;
    border-radius: 0 0 30px 30px;
    z-index: 99;
  }
  .select-block {
    background-color: #f2f1f6;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    margin-top: 0 !important;
    .row-nav {
      position: absolute;
      z-index: 2;
      width: 20px;
      font-size: 13px;
      text-align: center;
      top: 0;
      background-color: rgba(0, 0, 0, 0.05);
      pointer-events: none;
      div {
        height: 37.5px;
        line-height: 37.5px;
      }
    }
    .seats-block {
      position: absolute;
      z-index: 1;

      .m-line {
        position: absolute;
        height: 100%;
        left: 50%;
        right: 50%;
        z-index: 1;
        border-right: 1px dashed #c3c3c3;
        margin-left: -5px;
      }
      .seats-wrap {
        font-size: 0;
        .wrap {
          display: inline-block;
          .seat {
            box-sizing: border-box;
            text-align: center;
            background-size: contain;
            color: #fff;
            position: relative;
            background-repeat: no-repeat;
          }
        }
        .wrap[data-status="1"] {
          .seat {
            background-image: url("../../assets/images/free.png");
          }
          &.love {
            &.left {
              .seat {
                background-image: url("../../assets/images/love_left.png");
              }
            }
            &.right {
              .seat {
                background-image: url("../../assets/images/love_right.png");
              }
            }
          }
          &.active {
            .seat {
              background-image: url("../../assets/images/select.png");
            }
            &.love {
              &.right {
                .seat {
                  background-image: url("../../assets/images/select_love_right.png");
                }
              }
              &.left {
                .seat {
                  background-image: url("../../assets/images/select_love_left.png");
                }
              }
            }
          }
        }
        .wrap[data-status="2"] {
          .seat {
            background-image: url("../../assets/images/disable.png");
          }
        }
        .wrap[data-status="3"] {
          .seat {
            background-image: url("../../assets/images/sold.png");
          }
        }
      }
    }
  }
  .broad-cast {
    display: flex;
    height: 40px;
    align-items: center;
    padding: 0 17px;
    .laba-icon {
      width: 18px;
      margin-right: 10px;
    }
    .text {
      flex: 1;
    }
  }
  .popup-body {
    padding: 10px 17px;
    p {
      line-height: 30px;
      margin-bottom: 5px;
    }
  }
  .popup-title {
    padding: 15px 0px;
    border-bottom: 1px solid #ececec;
    position: relative;
    .cross {
      position: absolute;
      top: 19px;
      right: 17px;
    }
  }
  .seats-select {
    position: fixed;
    border-top: 1px solid #eeeeee;
    background-color: #fff;
    width: 375px;
    bottom: 65px;
    overflow: hidden;
    .tit {
      font-size: 14px;
      font-weight: bold;
      margin-left: 10px;
    }
    &-desc {
      padding: 0px 20px 0px;
      position: relative;
      background-color: #fff;
      &-film {
        font-size: 18px;
        padding: 10px 0px 0px;
      }
      &-cinema,
      &-time {
        font-size: 12px;
        line-height: 24px;
      }
      &-action {
        position: absolute;
        top: 12.5px;
        right: 20px;
      }
    }
    .scroll {
      height: 65px;
      padding: 5px 17px 0px;
      white-space: nowrap;
      .scroll-item {
        font-size: 12px;
        min-width: 55px;
        display: inline-block;
        text-align: center;
        padding: 5px;
        color: #333;
        border-radius: 8px;
        background-color: #f4f4f4;
        margin-right: 5px;
        line-height: 20px;
        margin-bottom: 5px;
      }
    }
  }
  .buy {
    position: fixed;
    width: 100%;
    bottom: 10px;
    &-btn {
      width: 340px;
    }
  }
}
</style>
