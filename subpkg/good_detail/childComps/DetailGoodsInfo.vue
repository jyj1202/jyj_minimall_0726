<template>
    <!-- 商品信息区域 -->
    <view class="goods-info-box" v-if="isShow">
      <!-- 商品价格 -->
      <view class="price">￥{{goods_info.goods_price}}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    goods_info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    isShow() {
      // console.log(JSON.stringify(this.goods_info) != "{}",JSON.stringify(this.goods_info))
      return JSON.stringify(this.goods_info) !== "{}"
    },
  },
 }
</script>

<style lang="scss">
  .goods-info-box {
    padding: 10px;
    padding-right: 0;
  
    .price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }
  
    .goods-info-body {
      display: flex;
      justify-content: space-between;
  
      .goods-name {
        font-size: 13px;
        padding-right: 10px;
      }
      // 收藏区域
      .favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }
  
    // 运费
    .yf {
      margin: 10px 0;
      font-size: 12px;
      color: gray;
    }
  }
</style>