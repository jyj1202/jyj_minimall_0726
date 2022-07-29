<template>
  <view class="history-box">
    <view class="history-title">
      <text>搜索历史</text>
      <uni-icons type="trash-filled" size="20" @click="cleanHistory"></uni-icons>
    </view>
    <view class="history-list">
      <uni-tag :text="item" circle="true" @click="gotoGoodsList(item)" v-for="(item, index) in historys" :key="index" class="uni-tag"></uni-tag>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'SearchHistory',
    data() {
      return {
        // history: ['dada'], // 直接使用data里的数据。出现问题？
      }
    },
    props: {
      searchHistory: {
        type: Array,
        default () {
          return []
        }
      },
    },
    computed: { // computed可以做到动态更新数据
      historys() {
        const set = new Set(this.searchHistory)
        return [...set]
      }
    },
    methods: {
      cleanHistory() {
        uni.clearStorageSync('kw')
        this.searchHistory = []
        this.$emit('cleanHistory')
      },
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/good_list/good_list?query=' + kw
        })
      }
    },
    // watch: {
    //   searchHistory(newVal) {
    //     console.log('change', newVal)
    //     const set = new Set(newVal)
    //     this.history = [...set]
    //     console.log(this.history)
    //   },
    // }
  }
</script>

<style lang="scss">
  .history-box {
    padding: 0 5px;
  
    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }
  
    .history-list {
      display: flex;
      flex-wrap: wrap;
  
      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>
