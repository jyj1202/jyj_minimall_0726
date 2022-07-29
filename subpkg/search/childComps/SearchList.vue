<template>
  <view class="sugg-list">
    <view class="sugg-item" v-for="item in searchResults" :key="item.goods_id" @click="gotoDetail(item.goods_id)">
      <view class="goods-name">{{item.goods_name}}</view>
      <uni-icons type="right" size="16"></uni-icons>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'SearchList',
    props: {
      searchResults: {
        type: Array,
        default: []
      }
    },
    methods: {
      gotoDetail(goods_id) {
        uni.navigateTo({
          url: '/subpkg/good_detail/good_detail?goods_id=' + goods_id
        })
      },
    },
  }
</script>

<style lang="scss">
  .sugg-list {
    padding: 0 5px;
  
    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;
  
      .goods-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }
</style>
