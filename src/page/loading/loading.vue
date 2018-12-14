<template>
  <div class="loading">
    <img src="./loading.gif" class="loading_img" v-if="loadingShow">
    <p class="desc">{{title}}</p>
  </div>

</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    },
    loadingShow: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style>
.loading {
  text-align: center;
  width: 100%;
  background: white;
  height: 0.8rem;
  line-height: 0.8rem;
  padding-bottom: 0.3rem;
}
.loading .loading_img {
  width: 0.4rem;
  height: 0.4rem;
}
.loading .desc {
  font-size: 0.28rem;
  display: inline-block;
  position: relative;
  top: -0.1rem;
}
</style>
