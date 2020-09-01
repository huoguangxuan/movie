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
    <seat-area class="wrapper" ref="seatArea">
      <!--以下为座位图具名插槽 开始-->
      <template v-slot:seat-area>
        <div class="seatBox">
          <template v-for="(row, index) in seatList">
            <div class="row" @click.prevent="clickSeat(index)" :key="row.id">
              <template v-for="(seat, index) in row.columns">
                <span class="seat sold" :key="index"></span>
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
import BScroll from "better-scroll";
import SeatArea from "./component/SeatArea";
import api from "@/api";
export default {
  data: function() {
    return {
      selectedSeat: [],
      seatList: [], // 座位对象list
      seatTypeList: [], // 座位类型list
      movieName: "", // 展示用 电影名称 接口获取
      hallName: "", // 展示用 影厅名称 接口获取
      showDate: "", // 展示用 开始日期 接口获取
      showTime: "", // 展示用 开始时间 接口获取
      positionDistin: 0.25, // 每个座位偏移距离
      width: 0.25, // 每个座位的宽
      height: 0.25, // 每个座位的高
      thumbnailWidth: 0.05, // 缩略图每个座位的宽
      thumbnailHeight: 0.05, // 缩略图每个座位的高
      thumbnailPositionDistin: 0.075, // 缩略图每个座位偏移距离
      seatAreaWidthRem: 10, // 座位区域横向rem最大值 用于和 seatAreaHeightRem 共同计算区域缩放比例
      selectedSeatList: [], // 已选择座位
      maxSelect: 4, // 最大选择座位数量 改动可改变最大选择座位数
      load: false // 加载dom的控制
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    "seat-area": SeatArea
  },
  watch: {
    selectedSeat: function() {
      let width = this.propSelectedSeat.length * 1.2 + 0.6;
      this.$refs.scrollUl.style.width = width + "rem";
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.scroll, {
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
  },
  mounted() {
    // this.seatList = jsonData.seatList;
    // this.seatTypeList = jsonData.seatTypeList;
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
    clickSeat(index) {
      console.log(index);
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
  position: relative;
  width: 375px;
  height: 400px;
  overflow: hidden;
  .seatBox {
    position: absolute;
    white-space: nowrap;
    transform-origin: 0px 0px 0px;
    .seat {
      display: inline-block;
      // width: 30px;
      // height: 30px;
      // margin: 5px;
      background: red;
      background: url("../../assets/images/free.png") no-repeat;
    }
    .sold {
      background-image: url("../../assets/images/sold.png");
    }
  }
}
</style>
