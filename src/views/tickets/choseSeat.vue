<template>
  <div class="seats">
    <van-nav-bar title="选择座位" left-arrow @click-left="onClickLeft" />

    <ul class="seats-types">
      <li>可选</li>
      <li>不可选</li>
      <li>已选</li>
      <li>已售</li>
      <li>已售</li>
    </ul>

    <seat-area
      class="wrapper"
      ref="seatArea"
      :seatAreaWidthRem="seatAreaWidthRem"
      :seatAreaHeightRem="seatAreaHeightRem"
      :seatScale="seatScale"
    >
      <!--以下为座位图具名插槽 开始-->
      <template v-slot:seat-area>
        <div class="seatBox" :style="{ transform: 'scale(' + seatScale + ')' }">
          <div class="screen">
            <div class="screen-num">一号厅</div>
          </div>
          <template v-for="row in seatList">
            <div
              v-if="row.columns.length < 1"
              class="empty-row"
              :style="{
                height: height + 'rem'
              }"
              :key="row.id"
            ></div>
            <div v-else class="row" :key="row.rowId">
              <template v-for="(seat, index) in row.columns">
                <!-- status:0空，1可售，2不可售，3，已售 -->
                <!-- type:0普通，1情侣左，2情侣右,3黄金区域 -->
                <span
                  class="seat"
                  :class="{
                    empty: seat.status === '0',
                    disable: seat.status === '2' && seat.type === '0',
                    sold: seat.status === '3' && seat.type === '0',
                    'sold-love-left': seat.status === '3' && seat.type === '1',
                    'sold-love-right': seat.status === '3' && seat.type === '2',
                    'fix-love-left': seat.status === '2' && seat.type === '1',
                    'fix-love-right': seat.status === '2' && seat.type === '2',
                    'love-left': seat.status === '1' && seat.type === '1',
                    'love-right': seat.status === '1' && seat.type == '2'
                  }"
                  :style="{
                    height: height + 'rem',
                    width: width + 'rem'
                  }"
                  @click.prevent="clickSeat($event, row, index)"
                  :key="seat.seatId"
                />
              </template>
            </div>
          </template>
        </div>
      </template>
      <!--以上为座位图具名插槽 结束-->
    </seat-area>
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
            {{ item.rowNum }}排{{ item.columnNum }}座<br />
            <span class="orange">{{ item.seatPrice }}元</span>
          </li>
        </ul>
      </div>
    </section>
    <div class="buy ac">
      <van-button
        @click.stop="
          $router.push({ path: '/orderConfirm', params: { movieId: 1 } })
        "
        round
        class="buy-btn"
        color="linear-gradient(to right, #F8A10E, #EE6806)"
        >去购票</van-button
      >
    </div>
  </div>
</template>
<script>
import { NavBar, Swipe, SwipeItem, Toast } from "vant";
// import BScroll from "better-scroll";
import SeatArea from "./component/SeatArea";
import api from "@/api";
export default {
  data: function() {
    return {
      seatList: [], // 座位对象list
      seatTypeList: [], // 座位类型list
      width: 0.5, // 每个座位的宽
      height: 0.5, // 每个座位的高
      seatAreaWidthRem: 10, // 座位区域横向rem最大值 用于和 seatAreaHeightRem 共同计算区域缩放比例
      selectedSeatList: [], // 已选择座位
      maxSelect: 0 //最多选座数
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Toast.name]: Toast,
    "seat-area": SeatArea
  },
  computed: {
    nowIcon: function() {
      return require("@/assets/images/free.png");
    },
    seatAreaHeightRem: function() {
      let screenRem =
        (document.body.clientWidth ||
          window.innerWidth ||
          document.documentElement.clientWidth) / 5;
      let height =
        document.documentElement.clientHeight ||
        window.innerHeight ||
        document.body.clientHeight;
      // 除了座位区域的大小
      let otherDom = 0; // 头+排期信息+座位示例 +底部快捷选择+确认按钮
      // 剩下的座位区域的大小
      return height / screenRem - otherDom;
    },
    // 取最大横坐标
    xMax: function() {
      if (this.seatList.length) {
        if (this.seatList[0].columns.length) {
          return this.seatList[0].columns.length;
        }
      }
      return 0;
    },
    // 取最大纵坐标
    yMax: function() {
      return this.seatList.length;
    },
    // class 为 seatBox 的高度值 单位为rem
    seatBoxHeight: function() {
      return this.yMax * this.height;
    },
    // class 为 seatBox 的宽度值 单位为rem
    seatBoxWidth: function() {
      return (this.xMax + 2) * this.width;
    },
    seatScale: function() {
      let seatScaleX = 1;
      let seatScaleY = 1;
      seatScaleX = this.seatAreaWidthRem / this.seatBoxWidth;
      seatScaleY = this.seatAreaHeightRem / this.seatBoxHeight;
      return seatScaleX < seatScaleY ? seatScaleX : seatScaleY;
    }
  },
  mounted() {
    this.getSeats();
  },
  methods: {
    getSeats() {
      const params = { cinemaId: "12345", showId: "1234", cityId: "北京" };
      api.tickets
        .getSeats(params)
        .then(res => {
          if (!res) return;
          this.seatList = res.data.datas.seats;
          this.seatTypeList = res.data.datas.seatStatus;
          this.maxSelect = res.data.limit;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    cancelSelect(item) {
      console.log(item);
    },
    clickSeat(e, row, index) {
      //点击选座
      // <!-- status:0空，1可售，2不可售，3，已售 -->
      // <!-- type:0普通，1情侣左，2情侣右 -->
      let seatItem = row.columns[index];
      seatItem.rowNum = row.rowNum;
      if (seatItem.status === "1") {
        //可售
        const c_index = e.srcElement.className.indexOf("active");
        c_index < 0
          ? this._selectSeat(e, row, seatItem, index)
          : this._unselectSeat(e, row, seatItem, index);
      }
      return;
    },
    _selectSeat(e, row, seatItem, index) {
      //判断是否超出最大选座数---普通
      if (this.selectedSeatList.length >= this.maxSelect) {
        Toast("最多只能选择" + this.maxSelect + "个座位哦~");
        return;
      }
      if (seatItem.type === "1" || seatItem.type === "2") {
        //判断是否超出最大选座数---情侣
        if (this.selectedSeatList.length >= this.maxSelect - 1) {
          Toast("最多只能选择" + this.maxSelect + "个座位哦~");
          return;
        }
        e.srcElement.className = e.srcElement.className + " active"; //当前选中
        const prefixStr = seatItem.type === "1" ? "next" : "previous";
        e.currentTarget[`${prefixStr}ElementSibling`].className =
          e.currentTarget[`${prefixStr}ElementSibling`].className + " active";
        if (seatItem.type === "1") {
          this.selectedSeatList.push(seatItem);
          this.selectedSeatList.push(row.columns[index + 1]);
        } else {
          this.selectedSeatList.push(row.columns[index - 1]);
          this.selectedSeatList.push(seatItem);
        }
        return;
      }
      e.srcElement.className = e.srcElement.className + " active";
      this.selectedSeatList.push(seatItem);
    },
    _unselectSeat(e, row, seatItem, index) {
      if (seatItem.type === "1" || seatItem.type === "2") {
        e.srcElement.className = e.srcElement.className.replace(" active", "");
        const prefixStr = seatItem.type === "1" ? "next" : "previous";
        console.log(e.currentTarget.previousElementSibling);
        e.currentTarget[
          `${prefixStr}ElementSibling`
        ].className = e.currentTarget[
          `${prefixStr}ElementSibling`
        ].className.replace(" active", "");
        const _index = seatItem.type === "1" ? 1 : -1;
        this.selectedSeatList = this.selectedSeatList.filter(
          i =>
            i.seatId !== seatItem.seatId &&
            i.seatId !== row.columns[index + _index].seatId
        );
        return;
      }
      e.srcElement.className = e.srcElement.className.replace(" active", "");
      this.selectedSeatList = this.selectedSeatList.filter(
        i => i.seatId !== seatItem.seatId
      );
    }
  }
};
</script>
<style lang="less" scoped>
.seats {
  background-color: #f7f8f9;
  padding-bottom: 140px;
  height: calc(100vh - 140px);
  &-types {
    margin: 0;
    background-color: #fff;
    display: flex;
    justify-content: center;
    li {
      display: inline-block;
      font-size: 12px;
      margin: 0px 10px;
      padding: 12px 0px;
    }
  }

  &-confirm {
    position: fixed;
    bottom: 0;
  }
  &-select {
    position: fixed;
    padding: 10px 0px;
    border-top: 1px solid #eeeeee;
    background-color: #fff;
    width: 375px;
    bottom: 0;
    padding-bottom: 70px;
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
      min-height: 45px;
      padding: 5px 17px 0px;
      .scroll-item {
        font-size: 12px;
        min-width: 55px;
        display: inline-block;
        text-align: center;
        padding: 10px;
        color: #333;
        border-radius: 8px;
        background-color: #f4f4f4;
        margin-right: 10px;
        line-height: 20px;
        margin-bottom: 10px;
      }
    }
  }
  .buy {
    position: fixed;
    width: 100%;
    bottom: 20px;
    &-btn {
      width: 340px;
    }
  }
}
.wrapper {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  .seatBox {
    white-space: nowrap;
    // transform-origin: 0px 0px 0px;
    .row {
      .seat {
        display: inline-block;
        background-image: url("../../assets/images/free.png");
        background-repeat: no-repeat;
        background-size: cover;
        &.active {
          background-image: url("../../assets/images/select.png");
        }
      }
      .empty {
        background-image: none;
      }
      .sold {
        background-image: url("../../assets/images/sold.png");
      }
      .love-left {
        background-image: url("../../assets/images/love_left.png");
        &.active {
          background-image: url("../../assets/images/select_love_left.png");
        }
      }
      .love-right {
        background-image: url("../../assets/images/love_right.png");
        &.active {
          background-image: url("../../assets/images/select_love_right.png");
        }
      }
      .love-left-disable {
        background-image: url("../../assets/images/love_left_disable.png");
      }
      .love-right-disable {
        background-image: url("../../assets/images/love_right_disable.png");
      }
      .love-left-sold {
        background-image: url("../../assets/images/love_left_sold.png");
      }
      .love-right-sold {
        background-image: url("../../assets/images/love_right_sold.png");
      }
      .fix {
        background-image: url("../../assets/images/fix.png");
      }
      .disable {
        background-image: url("../../assets/images/disable.png");
      }
      .select {
        background-image: url("../../assets/images/select.png");
      }
    }
    .screen {
      width: 120px;
      margin: 0px auto;
      margin-bottom: 20px;
      border-top: 25px solid #dfdfdf;
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      &-num {
        text-align: center;
        font-size: 12px;

        margin-top: -18px;
      }
    }
  }
}
</style>
