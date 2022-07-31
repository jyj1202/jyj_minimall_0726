<template>
  <view class="detail-container">
    <detail-swiper :pics="goods_info.pics"></detail-swiper>
    <detail-goods-info :goods_info="goods_info"></detail-goods-info>
    <detail-goods-detail-info :goods_introduce="goods_info.goods_introduce"></detail-goods-detail-info>
    <detail-bottom-bar :goods_info="goods_info"></detail-bottom-bar>
  </view>
</template>

<script>
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailGoodsDetailInfo from './childComps/DetailGoodsDetailInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar'
  
  export default {
    data() {
      return {
        goods_info: {}
      };
    },
    components: {
      DetailSwiper,
      DetailGoodsInfo,
      DetailGoodsDetailInfo,
      DetailBottomBar,
    },
    onLoad(option) {
      const goods_id = option.goods_id
      this._getDetailData(goods_id)
    },
    methods: {
      async _getDetailData(goods_id) {
        const {data: res} = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        if (res.meta.status !== 200) return uni.$showFailedToast()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block" ')
        this.goods_info = res.message
        // console.log(typeof this.goods_info.goods_introduce) // html结构,需使用富文本渲染
      }
    }
  }
</script>

<style lang="scss">
.detail-container {
  padding-bottom: 50px;
}
</style>
