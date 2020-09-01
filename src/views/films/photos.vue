<template>
  <div class="photos">
    <the-header :title="movieName" />
    <van-tabs v-model="active">
      <van-tab title="全部"></van-tab>
      <van-tab title="剧照"></van-tab>
      <van-tab title="海报"></van-tab>
      <van-tab title="工作照"></van-tab>
      <van-tab title="新闻"></van-tab>
    </van-tabs>
    <div class="photos-container">
      <van-row gutter="8">
        <van-col span="6" v-for="(photo, index) in showPhotos" :key="index">
          <van-image
            class="photo"
            fit="cover"
            @click="handleImageView(index)"
            :src="photo.photoUrl"
          />
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs, Image as VanImage, ImagePreview } from "vant";
import TheHeader from "@/components/TheHeader";
import api from "@/api";
export default {
  name: "film-photos",
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [VanImage.name]: VanImage,
    [ImagePreview.name]: ImagePreview,
    "the-header": TheHeader
  },
  data: function() {
    return {
      photos: {},
      movieName: "",
      active: 0
    };
  },
  computed: {
    showPhotos() {
      switch (this.active) {
        case 0:
          return this.photos.all || [];
        case 1:
          return this.photos.photo || [];
        case 2:
          return this.photos.poster || [];
        case 3:
          return this.photos.clothes || [];
        case 4:
          return this.photos.news || [];
        default:
          return [];
      }
    }
  },
  created() {
    this.getPhotos();
  },
  mounted() {},
  methods: {
    getPhotos() {
      const params = { movieId: "123" };
      api.films
        .getFilmDetail(params)
        .then(res => {
          this.photos = res.data.photos;
          this.movieName = res.data.movieName;
        })
        .catch();
    },
    handleImageView(i) {
      this.$nextTick(() => {
        ImagePreview({
          images: this.showPhotos.map(i => i.photoUrl),
          showIndex: true,
          loop: true,
          startPosition: i
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.photos {
  &-container {
    padding: 5px;
    .photo {
      width: 100%;
      height: 100%;
      margin-bottom: 1px;
    }
  }
}
</style>
