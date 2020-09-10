<template>
  <div class="page-wrap cinemas-booking">
    <van-nav-bar title="影院列表" />
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" title="筛选" ref="placeselect">
        <van-tree-select
          :items="items"
          :main-active-index.sync="activeIndex"
          :active-id.sync="activeId"
          @click-item="choosePlace"
        />
      </van-dropdown-item>
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" />
    </van-dropdown-menu>
    <ul class="lst">
      <li v-for="(item, key) in lst" :key="key" @click="toDetail(item.id)">
        <div class="txt-box">
          <p class="name">{{ item.name }}</p>
          <p>
            <span class="price">{{ item.price }}</span> 元起
          </p>
        </div>
        <div class="txt-box">
          <p>{{ item.addr }}</p>
          <p>{{ item.dist }}m</p>
        </div>
        <div class="films-box">
          <div
            class="films"
            v-for="(films, index) in item.films"
            :key="index"
            @click.stop="buyTicket()"
          >
            <h6>{{ films.time }}</h6>
            <p class="type">{{ films.type }}</p>
            <p class="price">{{ films.price }}元</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {
  NavBar,
  Cell,
  DropdownMenu,
  DropdownItem,
  Tag,
  TreeSelect
} from "vant";

export default {
  name: "cinemasBooking",
  components: {
    [NavBar.name]: NavBar,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Tag.name]: Tag,
    [TreeSelect.name]: TreeSelect,
    [Cell.name]: Cell
  },
  data() {
    return {
      value1: 0,
      value2: "a",
      value3: 0,
      option1: [
        { text: "全城", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      option2: [
        { text: "品牌", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" }
      ],
      option3: [
        { text: "综合排序", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      active: 0,
      activeId: 1,
      activeIndex: 0,
      items: [
        {
          text: "全部商圈 (9)",
          children: [
            {
              text: "名字 (2)",
              id: 1
            },
            {
              text: "名字 (1)",
              id: 2
            },
            {
              text: "名字 (3)",
              id: 3
            }
          ]
        },
        { text: "分组 2" }
      ],
      lst: [
        {
          name: "影院名称",
          price: 32,
          addr: "影院地址",
          dist: 550,
          films: [
            {
              time: "9:00",
              type: "国语2D",
              price: 35.6
            },
            {
              time: "9:00",
              type: "国语2D",
              price: 35.6
            },
            {
              time: "9:00",
              type: "国语2D",
              price: 35.6
            },
            {
              time: "9:00",
              type: "国语2D",
              price: 35.6
            },
            {
              time: "9:00",
              type: "国语2D",
              price: 35.6
            },
            {
              time: "9:00",
              type: "国语2D",
              price: 35.6
            },
            {
              time: "9:00",
              type: "国语2D",
              price: 35.6
            }
          ],
          id: 1
        },
        {
          name: "影院名称",
          price: 32,
          addr: "影院地址",
          dist: 550,
          tags: ["实惠", "便宜", "廉价"],
          id: 2
        },
        {
          name: "影院名称",
          price: 32,
          addr: "影院地址",
          dist: 550,
          tags: ["实惠", "便宜", "廉价"],
          id: 3
        },
        {
          name: "影院名称",
          price: 32,
          addr: "影院地址",
          dist: 550,
          tags: ["实惠", "便宜", "廉价"],
          id: 4
        }
      ]
    };
  },
  methods: {
    toDetail(id) {
      this.$router.push({
        path: "/cinemas/detail",
        query: {
          id
        }
      });
    },
    buyTicket() {},
    choosePlace(e) {
      console.log(e);
      this.$refs.placeselect.toggle();
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../styles/common.less);
@import url(../../styles/booking.less);
@import url(../../styles/vant_sf.less);
</style>
