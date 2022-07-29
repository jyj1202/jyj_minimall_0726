<template>
  <view>
    <jyj-search toUrl="/subpkg/search/search"></jyj-search>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: thisWindowHeight + 'px'}">
        <view class="left-scroll-view-item" v-for="(item, index) in categories" :key="item.cat_id"
          @click="leftItemClick(index)" :class="{active: index === active}">{{item.cat_name}}</view>
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y :scroll-top="scrollTop" :style="{height: thisWindowHeight + 'px'}">
        <view class="cate-level2" v-for="(item2, index2) in cateLevel2" :key="index2">
          <view class="cate-level2-title">/ {{item2.cat_name}} /</view>
          <view class="cate-level3">
            <view v-for="(item3, index3) in item2.children" :key="index3" class="cate-level3-item" @click="item3Click(item3)">
              <image :src="item3.cat_icon.replace('dev','web')"></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        thisWindowHeight: 0,
        active: 0,
        categories: [],
        cateLevel2: [],
        scrollTop: 0,
      };
    },
    onLoad() {
      this._getCategoriesData()
      const systemInfo = uni.getSystemInfoSync()
      this.thisWindowHeight = systemInfo.windowHeight - 50
    },
    methods: {
      // 获取分类数据
      async _getCategoriesData() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) return uni.$showFailedToast
        this.categories = res.message
        this.cateLevel2 = this.categories[0].children
      },
      // 事件 
      leftItemClick(index) {
        this.active = index
        this.cateLevel2 = this.categories[index].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      item3Click(item3) {
        uni.navigateTo({
          url: '/subpkg/good_list/good_list?cid=' + item3.cat_id
        })
      },
    },
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: #ffffff;
          position: relative;

          &::before {
            content: ' ';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 3px;
            height: 30px;
            background-color: #c00000;
          }
        }
      }
    }

    .cate-level2-title {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }

    .cate-level3 {
      display: flex;
      flex-wrap: wrap;

      .cate-level3-item {
        width: 33.33%;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        image {
          width: 60px;
          height: 60px;
        }

        text {
          font-size: 12px;
        }
      }
    }
  }
</style>
