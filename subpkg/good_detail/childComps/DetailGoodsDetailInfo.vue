<template>
  <view>
    <rich-text :nodes="goods_introduce"></rich-text>
 </view>
</template>

<script>
export default {
  name: 'DetailGoodsDetailInfo',
  props: {
    goods_introduce: {
      type: String,
      default: ''
    }
  },
 }
</script>

<style scoped>
</style>