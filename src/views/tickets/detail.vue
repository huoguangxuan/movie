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
      <div class="title">取电影票</div>
      <div class="qrcode">
        <qrcode-vue :value="qrurl" :size="size"></qrcode-vue>
      </div>
      <p class="font12 black ac count">您有{{ ticketCount }}张电影票</p>
      <div class="code font14 black">取票号：{{ dealStr4 }}</div>
      <div class="actions no-win">
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
    <!-- 隐藏的部分 -->
    <van-overlay :show="show" @click="show = false">
      <!-- <div class="ticket-card" ref="imageWrapper">
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
        <div class="title">取电影票</div>
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
      </div> -->
    </van-overlay>
    <div class="divider"></div>
    <!-- 用户购买详情信息 -->
    <div class="detail">
      <div class="location">
        <span class="span-district">万达影城（通州万达店）</span>
        <span class="span-specific">新华西街58号万达广场1号楼5层</span>
      </div>
      <div class="orderfrom">
        <div class="orderfromhead">
          <span class="headleft">实付金额：￥39.9</span>
          <router-link :to="{ name: 'information' }">
            <span class="headright"
              >查看更多<img src="@/assets/images/more.png" />
            </span>
          </router-link>
        </div>
        <span class="acitem">订单号：31233123312331233123</span>
        <span class="acitem">购买时间：2020-08-08 10:22:21</span>
        <span class="acitem">手机号：13113131313</span>
        <span class="acitem">电影票由阿里影业凤凰佳影提供</span>
      </div>
      <div class="service">
        <div class="orderfromhead">
          <span class="headleft">帮助中心—咨询客服</span>
          <router-link :to="{ name: 'information' }">
            <span class="headright"
              >查看更多<img src="@/assets/images/more.png" />
            </span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <!-- 观影须知 -->
    <div class="notice">
      <div style="height:10px"></div>
      <span class="notice-title">观影须知</span>
      <span class="notice-txt"
        >1.请提前到达影院现场，找到自助取票机，打印纸质电影票，完成取票。</span
      >
      <span class="notice-txt"
        >2.如现场自助取票机无法打印电影票，请联系影院工作人员处理。</span
      >
      <span class="notice-txt">3.凭打印好的纸质电影票，检票入场观影。</span>
      <span class="notice-txt"
        >4.如果订单使用了兑换券，或购买了特殊场次，暂不支持退票和改签。</span
      >
      <span class="notice-txt"
        >5.如有开具所购电影票发票的需求，请保留好电影票根，尽量在观影当天联系影城工作人员进行开具，如遇特殊情况请及时联系影票平台人工客服咨询。</span
      >
      <span class="notice-txt"
        >6.改签、退票服务由影城决定，特殊场次及使用兑换券的场次不支持改签、退票。</span
      >
    </div>
    <!-- 退票、改签 -->
    <div class="delticket">
      <div class="retreat">
        <van-button
          class="btn"
          round
          @click.stop="
            $router.push({
              path: '/orderConfirm',
              params: {}
            })
          "
          color="linear-gradient(to right, #F8A10E, #EE6806)"
          >申请改签</van-button
        ><span class="btnbottom">未取票开场前1分钟可改签</span>
      </div>
      <div class="change">
        <van-button
          class="btn"
          round
          @click.stop="
            $router.push({
              path: '/orderConfirm',
              params: {}
            })
          "
          color="linear-gradient(to right, #F8A10E, #EE6806)"
          >申请退票</van-button
        ><span class="btnbottom">未取票开场前1分钟可退票</span>
      </div>
    </div>
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
      api
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
        useCORS: true,
        ignoreElements: function(item) {
          if (item.classList.contains("no-win")) {
            return true;
          }
          return false;
        }
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
    .title {
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      color: #333333;
      line-height: 14px;
      padding-bottom: 28px;
      padding-left: 10px;
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
  .detail {
    height: 214px;
    background-color: white;
    .location {
      padding: 0px 17px;
      height: 60px;
      border-bottom: 1px solid #ececec;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .span-district {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #333333;
        line-height: 12px;
        margin-bottom: 10px;
      }
      .span-specific {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
        line-height: 12px;
      }
    }
    .orderfrom {
      padding: 0px 17px;
      height: 120px;
      border-bottom: 1px solid #ececec;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .acitem {
        height: 22px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
      }
    }
    .service {
      padding: 0px 17px;
      height: 120px;
    }
    .orderfromhead {
      width: 341px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .headleft {
        font-family: PingFangSC-Semibold;
        font-size: 12px;
        color: #333333;
        text-align: right;
        line-height: 12px;
      }
      .headright {
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #666666;
        text-align: right;
        line-height: 11px;
      }
      img {
        width: 8px;
        height: 11.5px;
        margin-bottom: 3px;
        margin-left: 9px;
      }
    }
  }
  .notice {
    background-color: white;
    height: 300px;
    display: flex;
    flex-direction: column;
    .notice-title {
      padding: 10px 17px;
      font-family: PingFang-SC-Bold;
      font-size: 18px;
      color: #333333;
      line-height: 18px;
    }
    .notice-txt {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #666666;
      margin-top: 8px;
      padding: 0px 17px;
    }
  }
  .delticket {
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 17px;
    .retreat {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .change {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .btn {
      width: 120px;
      height: 40px;
      border-radius: 40px;
      margin-bottom: 10px;
    }
    .btnbottom {
      font-family: PingFangSC-Regular;
      font-size: 10px;
      color: #999999;
      text-align: right;
      line-height: 10px;
    }
  }
}
</style>
