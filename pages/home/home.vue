<template>
  <view>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" :circular="true">
      <swiper-item v-for="item in swiperList" :key="item.goods_id">
        <navigator class="swiper-item" :url="'/subpkg/good_detail/good_detail?goods_id='+item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="cate">
      <view class="cate-item" v-for="(item,index) in catItemsData" :key="index" @click="cateItemClick(item)">
        <image :src="item.image_src"></image>
      </view>
    </view>
    <!-- 楼层 -->
    <view class="floor">
      <view class="floor-item" v-for="(item, index) in floorData" :key="index">
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].navigator_url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
              mode="widthFix"></image>
          </navigator>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.navigator_url">
              <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        catItemsData: [],
        floorData: []
      };
    },
    onLoad() {
      this._getSwiperData()
      this._getCatItemsData()
      this._getFloorData()
    },
    methods: {
      async _getSwiperData() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showFailedToast()
        this.swiperList = res.message
      },
      // 获取分类导航数据
      async _getCatItemsData() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showFailedToast()
        this.catItemsData = res.message
      },
      // 获取楼层导航数据
      async _getFloorData() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        console.log(res)
        if (res.meta.status !== 200) return uni.$showFailedToast()
        res.message.forEach(item => {
          item.product_list.forEach(item => {
            item.navigator_url = '/subpkg/good_list/good_list?' + item.navigator_url.split('?')[1]
          })
        })
        this.floorData = res.message
      },

      // 事件
      cateItemClick(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .cate {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    image {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-item {
    .floor-title {
      height: 60rpx;
      width: 100%;
      display: flex;
    }

    .floor-img-box {
      display: flex;
      padding-left: 10rpx;

      .right-img-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }
    }
  }
</style>
