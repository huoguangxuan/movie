<template>
  <div>cinemasDetail</div>
</template>
<script>
export default {
  name: "cinemaDetail",
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route.query.id);
  }
};
</script>
