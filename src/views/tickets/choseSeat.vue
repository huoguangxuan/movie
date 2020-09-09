<template>
  <div class="seats">
    <van-nav-bar title="选择座位" left-arrow @click="onClickLeft" />

    <ul class="seats-types">
      <li>可选</li>
      <li>不可选</li>
      <li>已选</li>
      <li>已售</li>
      <li>已售</li>
    </ul>

    <seat-area
      ref="seatArea"
      :propMiddleLine="middleLine"
      :propHorizontalLine="horizontalLine"
      :propSeatAreaWidthRem="seatAreaWidthRem"
      :propSeatBoxHeight="seatBoxHeight"
      :propSeatHeight="positionDistin"
      :propSeatAreaHeightRem="seatAreaHeightRem"
      :seatScale="seatScale"
      :propSeatToolArr="seatToolArr"
    >
      <!--以下为座位图具名插槽 开始-->
      <template v-slot:seat-area>
        <div
          class="seatBox"
          :style="{
            transform: 'scale(' + seatScale + ')',
            height: seatBoxHeight + 'rem',
            width: seatBoxWidth + 'rem'
          }"
        >
          <div
            v-show="seatList.length > 0"
            class="middle-line"
            :style="{ height: seatBoxHeight + 'rem', left: middleLine + 'rem' }"
          ></div>
          <template v-for="row in seatList">
            <div
              v-if="row.columns.length < 1"
              class="empty-row"
              :style="{
                height: height + 'rem'
              }"
              :key="row.id"
            ></div>
            <div
              v-else
              class="row"
              :style="{ height: height + 'rem' }"
              :key="row.rowId"
            >
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
                  @click.prevent="clickSeat($event, row, index, seat)"
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

    <loading :load="load"></loading>
  </div>
</template>
<script>
import { NavBar, Swipe, SwipeItem, Toast } from "vant";
// import BScroll from "better-scroll";
import Loading from "@/components/Loading";
import SeatArea from "./component/SeatArea";
import api from "@/api";
export default {
  data: function() {
    return {
      seatList: [], // 座位对象list
      seatTypeList: [], // 座位类型list
      positionDistin: 0.5, // 每个座位偏移距离
      width: 0.5, // 每个座位的宽
      height: 0.5, // 每个座位的高
      seatAreaWidthRem: 10, // 座位区域横向rem最大值 用于和 seatAreaHeightRem 共同计算区域缩放比例
      selectedSeatList: [], // 已选择座位
      maxSelect: 0, //最多选座数
      load: false,
      seatToolArr: []
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Toast.name]: Toast,
    SeatArea,
    Loading
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
      let otherDom = 1; // 头+排期信息+座位示例 +底部快捷选择+确认按钮
      // 剩下的座位区域的大小
      return height / screenRem - otherDom;
    },
    // 取最大横坐标
    xMax: function() {
      let i = 0;
      for (let index in this.seatList) {
        if (this.seatList[index].columns.length > i) {
          i = this.seatList[index].columns.length;
        }
      }
      return i;
    },
    // 取最大纵坐标
    yMax: function() {
      return this.seatList.length;
    },
    // 竖中轴线
    middleLine: function() {
      return (this.xMax / 2 + 1) * this.positionDistin - 0.025;
    },
    // 横中轴线
    horizontalLine: function() {
      return (this.yMax / 2 + 1) * this.positionDistin - 0.025;
    },
    // class 为 seatBox 的高度值 单位为rem
    seatBoxHeight: function() {
      return (this.yMax + 1) * this.positionDistin;
    },
    // class 为 seatBox 的宽度值 单位为rem
    seatBoxWidth: function() {
      return (this.xMax + 1) * this.positionDistin + this.width;
    },
    seatScale: function() {
      let seatScaleX = 1;
      let seatScaleY = 1;
      seatScaleX = this.seatAreaWidthRem / this.seatBoxWidth;
      seatScaleY = this.seatAreaHeightRem / this.seatBoxHeight;
      return seatScaleX < seatScaleY ? seatScaleX : seatScaleY;
    }
  },
  created() {
    this.getSeats();
    this.$store.dispatch("changenavshow", false);
  },
  methods: {
    getSeats() {
      const params = { cinemaId: "12345", showId: "1234", cityId: "北京" };
      this.load = true;
      api.tickets
        .getSeats(params)
        .then(res => {
          if (!res) return;
          this.seatList = res.data.datas.seats;
          this.seatTypeList = res.data.datas.seatStatus;
          this.maxSelect = res.data.limit;
          this.seatToolArr = res.data.datas.seats.map(i => i.rowNum);
          setTimeout(() => {
            this.load = false;
          }, 200);
        })
        .catch(err => {
          console.log(err);
          this.load = false;
        });
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    cancelSelect(item) {
      console.log(item);
    },
    clickSeat(e, row, index, seatItem) {
      //点击选座
      // <!-- status:0空，1可售，2不可售，3，已售 -->
      // <!-- type:0普通，1情侣左，2情侣右 -->
      if (seatItem.status === "1") {
        //可售
        const c_index = e.srcElement.className.indexOf("active");
        c_index < 0
          ? this._selectSeat(e, row, index, seatItem)
          : this._unselectSeat(e, row, index, seatItem);
      }
      return;
    },
    _selectSeat(e, row, index, seat) {
      let seatItem = seat;
      seatItem.rowNum = row.rowNum;
      const alisX = (Number(index) + 1) / (row.columns.length + 2);
      // Toast(Number(index) + 2);
      if (this.selectedSeatList.length < 1 && this.$refs.seatArea.scale == 1) {
        //第一次点选座
        this.$refs.seatArea.changeScale(alisX, 0);
      }
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
          const nextSeatItem = row.columns[index + 1];
          nextSeatItem.rowNum = seatItem.rowNum;
          this.selectedSeatList.push(nextSeatItem);
        } else {
          const prevSeatItem = row.columns[index - 1];
          prevSeatItem.rowNum = seatItem.rowNum;
          this.selectedSeatList.push(prevSeatItem);
          this.selectedSeatList.push(seatItem);
        }
        return;
      }
      e.srcElement.className = e.srcElement.className + " active";
      this.selectedSeatList.push(seatItem);
      console.log(this.selectedSeatList);
    },
    _unselectSeat(e, row, index, seatItem) {
      if (seatItem.type === "1" || seatItem.type === "2") {
        e.srcElement.className = e.srcElement.className.replace(" active", "");
        const prefixStr = seatItem.type === "1" ? "next" : "previous";
        // console.log(e.currentTarget.previousElementSibling);
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

.seatBox {
  white-space: nowrap;
  // transform-origin: 0px 0px 0px;
  // background: red;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .middle-line {
    position: absolute;
    border-right: 0.05rem rgba(0, 0, 0, 0.2) dashed;
    z-index: -1;
  }
  .row {
    .seat {
      display: inline-block;
      background-image: url("../../assets/images/free.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      overflow: hidden;
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
}
</style>
