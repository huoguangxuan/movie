<template>
  <div class="ticket">
    <the-header title="影票详情" />
    <div class="divider"></div>
    <div class="ticket-card" ref="imageWrapper">
      <div class="film-info">
        <div class="text">
          <h3 class="font18 black">{{ ticket.movieName }}</h3>
          <p class="p-line blood">
            {{ ticket.showStartTime }} （{{ ticket.language }}）
          </p>
          <p class="p-line">{{ ticket.cinemaName }}</p>
          <p class="p-line">
            <span>{{ ticket.hallCode }} | </span>
            <span v-for="seat in ticket.seats" :key="seat.seatId">
              {{ seat.row }}排{{ seat.column }}座
            </span>
          </p>
        </div>
        <img class="poster" :src="ticket.posterUrl" alt="" />
      </div>
      <div class="niceline">
        <div class="circle4"></div>
        <div class="border"></div>
        <div class="circle5"></div>
      </div>
      <div class="qrcode">
        <qrcode-vue :value="qrurl" :size="size"></qrcode-vue>
      </div>
      <p class="font12 black ac count">您有{{ ticketCount }}张电影票</p>
      <div class="code font14 black">取票号：{{ dealStr4 }}</div>
      <div class="actions" ref="actions">
        <div class="block" @click="saveImg">
          <p><van-icon name="down" /></p>
          <p class="font14">保存图片</p>
        </div>
        <div class="block">
          <p><van-icon name="share" /></p>
          <p class="font14">分享给好友</p>
        </div>
      </div>
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <div class="block">
          <img :src="imgUrl" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import TheHeader from "@/components/TheHeader";
import QrcodeVue from "qrcode.vue";
import { Icon, Dialog, Overlay } from "vant";
import html2canvas from "html2canvas";

import api from "@/api";
export default {
  name: "ticket-detail",
  components: {
    "the-header": TheHeader,
    QrcodeVue,
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component,
    [Overlay.name]: Overlay
  },
  data: function() {
    return {
      ticket: {},
      size: 264,
      qrurl: "123456",
      ticketCount: 0,
      ticketCode: "",
      show: false,
      imgUrl: ""
    };
  },
  computed: {
    dealStr4() {
      return this.ticketCode.replace(/(.{4})/g, "$1 "); // 每隔4个字符加空格间隔
    }
  },
  created() {
    this.getTicketInfo();
  },

  methods: {
    getTicketInfo() {
      const params = {};
      api.tickets
        .getTicketInfo(params)
        .then(res => {
          this.ticket = res.data;
          this.ticketCount = res.data.seats.length;
          this.ticketCode = res.data.ticketCode;
        })
        .catch();
    },
    saveImg() {
      console.log("开始生成图片");
      html2canvas(this.$refs.imageWrapper, {
        scale: 1,
        useCORS: true
      })
        .then(canvas => {
          let dataURL = canvas.toDataURL("image/png");
          this.imgUrl = dataURL;
          if (this.imgUrl !== "") {
            this.show = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.ticket {
  &-card {
    background-color: #fff;
    border-radius: 8px;
    margin: 0px 17px;
    padding-bottom: 20px;
    .film-info {
      padding: 10px;
      display: flex;
      .poster {
        width: 90px;
        height: 120px;
        border-radius: 5px;
      }
      .text {
        flex: 1;
        .p-line {
          margin: 10px 0px;
          font-size: 12px;
        }
      }
    }
    .count {
      margin: 8px 0px 10px 0px;
    }
    .code {
      min-width: 190px;
      max-width: 220px;
      background-color: #ccc;
      border-radius: 8px;
      padding: 10px 17px;
      text-align: center;
      margin: auto;
    }
    .niceline {
      display: flex;

      .circle4 {
        width: 10px;
        height: 20px;
        border-radius: 0px 10px 10px 0px;
        line-height: 20px;
        background: #f4f4f4;
      }
      .border {
        border-top: 1px dotted #e4e4e4;
        flex: 1;
        position: relative;
        top: 10px;
      }
      .circle5 {
        width: 10px;
        height: 20px;
        border-radius: 10px 0px 0px 10px;
        line-height: 20px;
        background: #f4f4f4;
      }
    }
    .qrcode {
      display: flex;
      justify-content: center;
      /deep/ canvas {
        border: 5px solid white;
        width: 132px !important;
        height: 132px !important;
      }
    }
    .actions {
      display: flex;
      margin-top: 20px;
      justify-content: center;
      .block {
        font-size: 18px;
        text-align: center;
        padding: 0px 20px;
      }
    }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .block {
      img {
        border-radius: 8px;
      }
    }
  }
}
</style>
