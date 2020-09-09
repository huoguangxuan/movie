<template>
  <div class="photos">
    <the-header :title="movieName" />
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="(tab, index) in tabs" :title="tab" :key="index">
        <div class="photos-container">
          <van-row gutter="4">
            <van-col span="6" v-for="(photo, index) in showPhotos" :key="index">
              <van-image
                class="photo"
                fit="cover"
                @click="handleImageView(index)"
                :src="photo.photoUrl"
              />
            </van-col>
          </van-row></div
      ></van-tab>
    </van-tabs>
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
      active: 0,
      tabs: ["全部", "剧照", "海报", "工作照", "新闻"]
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
    this.$store.dispatch("changenavshow", false);
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
    }
  }
}
</style>
