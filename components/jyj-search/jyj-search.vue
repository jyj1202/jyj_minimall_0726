<template>
  <view>
    <view class="jyj-search-container" :style="{backgroundColor: bgc}" @click="searchClick">
      <view class="jyj-search-box" :style="{borderRadius: radius + 'px'}">
        <uni-icons type="search" size="18"></uni-icons>
        <text class="placeholder">搜索</text>
      </view>
    </view>
  </view>
</template>

<script>
  
  export default {
    name: "jyj-search",
    props: {
      bgc: {
        type: String,
        default: '#c00000'
      },
      radius: {
        type: Number,
        // 单位是 px
        default: 18
      },
      toUrl: {
        type: String,
      }
    },
    methods: {
      searchClick() {
        uni.navigateTo({
          url: this.toUrl
        })
      },
    },
  }
</script>

<style lang="scss">
  .jyj-search-container {
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 50px;
  }

  .jyj-search-box {
    width: 100%;
    height: 36px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;

    .placeholder {
      margin-left: 5px;
      font-size: 15px;
    }
  }
</style>
