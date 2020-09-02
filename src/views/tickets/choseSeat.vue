<template>
  <div class="seats">
    <van-nav-bar
      title="选择座位"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <section class="seats-desc">
      <h5 class="seats-desc-film">八佰</h5>
      <p class="seats-desc-cinema">地质礼堂</p>
      <p class="seats-desc-time">今天 08月26日 20:00(国语2D)</p>
      <van-button round type="info" size="small" class="seats-desc-action"
        >切换场次</van-button
      >
    </section>
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
            <div v-else class="row" :key="row.id">
              <template v-for="(seat, index) in row.columns">
                <!-- status:0空，1可售，2不可售，3，已售 -->
                <!-- type:0普通，1情侣左，2情侣右,3黄金区域 -->
                <span
                  class="seat"
                  :class="{
                    empty: seat.status === '0',
                    fix: seat.status === '2' && seat.type === '0',
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
                  @click.prevent="clickSeat($event, seat)"
                  :key="index"
                />
              </template>
            </div>
          </template>
        </div>
      </template>
      <!--以上为座位图具名插槽 结束-->
    </seat-area>
    <section class="seats-select">
      <p class="tit">已选座位:</p>
      <div class="scroll" ref="scroll">
        <ul class="select scroll-ul" ref="scrollUl">
          <li
            class="scroll-item"
            v-for="item in selectedSeat"
            :key="'select' + item.id"
            @click="cancelSelect(item)"
          >
            {{ item.row }}排{{ item.col }}座 {{ item.price }}元
          </li>
        </ul>
      </div>
    </section>
    <div class="buy ac">
      <van-button
        @click.stop="
          $router.push({ path: '/orderConfirm', params: { movieId: 1 } })
        "
        class="buy-btn"
        color="linear-gradient(to right, #F8A10E, #EE6806)"
        >去购票</van-button
      >
    </div>
  </div>
</template>
<script>
import { NavBar, Swipe, SwipeItem } from "vant";
// import BScroll from "better-scroll";
import SeatArea from "./component/SeatArea";
import api from "@/api";
export default {
  data: function() {
    return {
      selectedSeat: [],
      seatList: [], // 座位对象list
      seatTypeList: [], // 座位类型list
      width: 0.5, // 每个座位的宽
      height: 0.5, // 每个座位的高
      seatAreaWidthRem: 10, // 座位区域横向rem最大值 用于和 seatAreaHeightRem 共同计算区域缩放比例
      selectedSeatList: [] // 已选择座位
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
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
    clickSeat(e, seat) {
      console.log(seat);
      //空或者不可选 return
      // <!-- status:0空，1可售，2不可售，3，已售 -->
      // <!-- type:0普通，1情侣左，2情侣右 -->
      if (seat.status === "1") {
        //可售
        const c_index = e.srcElement.className.indexOf("active");

        if (c_index < 0) {
          e.srcElement.className = e.srcElement.className + " active";
        } else {
          e.srcElement.className = e.srcElement.className.replace(
            " active",
            ""
          );
        }
      }
      return;
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
  &-desc {
    padding: 0px 20px 0px;
    position: relative;
    padding-bottom: 10px;
    border-bottom: 1px solid #eeeeee;
    background-color: #fff;
    &-film {
      font-size: 18px;
      padding: 10px 0px;
    }
    &-cinema,
    &-time {
      font-size: 12px;
      line-height: 24px;
    }
    &-action {
      position: absolute;
      top: 30px;
      right: 20px;
    }
  }
  &-confirm {
    position: fixed;
    bottom: 0;
  }
  &-select {
    position: fixed;
    bottom: 40px;
    height: 70px;
    padding: 10px 0px;
    border-top: 1px solid #eeeeee;
    background-color: #fff;
    width: 375px;
    overflow: hidden;
    .tit {
      font-size: 14px;
      font-weight: bold;
      margin-left: 10px;
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
          background-image: url("../../assets/images/select.png");
        }
      }
      .love-right {
        background-image: url("../../assets/images/love_right.png");
      }
      .fix {
        background-image: url("../../assets/images/fix.png");
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
