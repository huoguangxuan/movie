<template>
  <div class="map">
    <div class="go-back" @click="goBack">
      <van-icon name="arrow-left" size="24px" />
    </div>
    <div class="search-btn">
      <van-icon name="search" size="24px" />
    </div>
    <el-amap
      class="amap-box"
      :amap-manager="amapManager"
      :vid="'amap-vue'"
      :zoom="zoom"
      :plugin="plugin"
      :center="center"
      :events="events"
    >
      <!-- 标记 -->
      <el-amap-marker
        v-for="(marker, index) in markers"
        :position="marker"
        :key="index"
      ></el-amap-marker>
    </el-amap>
    <!-- <div class="search-box">
      <input v-model="searchKey" type="search" id="search" />
      <button @click="searchByHand">搜索</button>
      <div class="tip-box" id="searchTip"></div>
    </div> -->
    <!--
          amap-manager： 地图管理对象
          vid：地图容器节点的ID
          zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
          center： 地图中心点坐标值
          plugin：地图使用的插件
          events： 事件
        -->
    <div class="txt-box">
      <h4>首都电影院(金融街店)</h4>
      <p>我是地址</p>
      <p>我是距离和时间</p>
      <div class="btns">
        <button class="collect">
          <van-icon name="star-o" size="20px" />
          <p>收藏</p>
        </button>
        <button class="route">
          查看路线
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon, NoticeBar, Tab, Tabs } from "vant";

Vue.use(NoticeBar);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);

import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";

let amapManager = new AMapManager();
export default {
  name: "Map",
  data() {
    let self = this;
    return {
      address: null,
      searchKey: "",
      amapManager,
      markers: [
        [116.3603586, 39.91574771]
        // {
        //   position: new AMap.LngLat(116.366936, 39.921499),
        //   offset: new AMap.Pixel(-10, -10),
        //   icon: "//vdata.amap.com/icons/b18/1/2.png", // 添加 Icon 图标 URL
        //   title: "北京"
        // }
      ],
      searchOption: {
        city: "全国",
        citylimit: true
      },
      center: [116.35811627, 39.91473966],
      zoom: 17,
      lng: 0,
      lat: 0,
      loaded: false,
      events: {
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            // self.initSearch();
            self.initMarkers();
          });
        },
        // 点击获取地址的数据
        click(e) {
          // console.log(e)
          self.markers = [];
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          self.center = [lng, lat];
          self.markers.push([lng, lat]);
          // 这里通过高德 SDK 完成。
          let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                // console.log(result.regeocode.formattedAddress);
                self.address = result.regeocode.formattedAddress;
                self.searchKey = result.regeocode.formattedAddress;
                self.$nextTick();
              }
            }
          });
        }
      },
      // 一些工具插件
      plugin: [
        // {
        //   pName: 'Geocoder',
        //   events: {
        //     init (o) {
        //       console.log(o.getAddress())
        //     }
        //   }
        // },
        // 定位
        {
          pName: "Geolocation",
          events: {
            init(o) {
              // o是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  // 设置经度
                  self.lng = result.position.lng;
                  // 设置维度
                  self.lat = result.position.lat;
                  // 设置坐标
                  self.center = [self.lng, self.lat];
                  self.markers.push([self.lng, self.lat]);
                  // load
                  self.loaded = true;
                  // 页面渲染好后
                  self.$nextTick();
                }
              });
            }
          }
        },
        // 搜索
        {
          pName: "PlaceSearch",
          events: {
            // init(instance) {
            //   console.log(instance);
            // }
          }
        }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    initMarkers() {
      // let arr = [[116.366936, 39.921499]];
      // let markerLst = [];
      // arr.forEach(element => {
      //   markerLst.push({
      //     position: new AMap.LngLat(element[0], element[1]),
      //     offset: new AMap.Pixel(-10, -10),
      //     icon: "//vdata.amap.com/icons/b18/1/2.png", // 添加 Icon 图标 URL
      //     title: "北京"
      //   });
      // });
      // this.markers.push(markerLst);
    },
    initSearch() {
      let vm = this;
      let map = this.amapManager.getMap();
      AMapUI.loadUI(["misc/PoiPicker"], function(PoiPicker) {
        var poiPicker = new PoiPicker({
          input: "search",
          placeSearchOptions: {
            map: map,
            pageSize: 10
          },
          suggestContainer: "searchTip",
          searchResultsContainer: "searchTip"
        });
        vm.poiPicker = poiPicker;
        // 监听poi选中信息
        poiPicker.on("poiPicked", function(poiResult) {
          // console.log(poiResult)
          let source = poiResult.source;
          let poi = poiResult.item;
          if (source !== "search") {
            poiPicker.searchByKeyword(poi.name);
          } else {
            poiPicker.clearSearchResults();
            vm.markers = [];
            let lng = poi.location.lng;
            let lat = poi.location.lat;
            let address = poi.cityname + poi.adname + poi.name;
            vm.center = [lng, lat];
            vm.markers.push([lng, lat]);
            vm.lng = lng;
            vm.lat = lat;
            vm.address = address;
            vm.searchKey = address;
          }
        });
      });
    },
    searchByHand() {
      if (this.searchKey !== "") {
        this.poiPicker.searchByKeyword(this.searchKey);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../styles/common.less);
@import url(../../styles/cinemas_map.less);
@import url(../../styles/vant_sf.less);
</style>
