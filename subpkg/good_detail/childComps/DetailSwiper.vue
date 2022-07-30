<template>
  <view>
    <swiper indicator-active-color="#fff" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" :circular="true">
      <swiper-item v-for="(item, i) in pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
 </view>
</template>

<script>
export default {
  name: 'DetailSwiper',
  props: {
    pics: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    preview(i) {
      uni.previewImage({
        current: i,
        urls: this.pics.map(i => i.pics_big)
      })
    },
  },
 }
</script>

<style lang="scss">
  swiper {
    height: 750rpx;
  
    image {
      width: 100%;
      height: 100%;
    }
  }
</style>