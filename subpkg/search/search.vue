<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="inputDebounce" placeholder="请输入搜索内容" radius="18" cancelButton="none" focus="always" />
    </view>
    <search-history :searchHistory="searchHistory" @cleanHistory="cleanHistory" v-if="searchRecommend.length === 0"></search-history>
    <search-list :searchResults="searchRecommend" v-else></search-list>
  </view>
</template>

<script>
  import SearchList from './childComps/SearchList.vue'
  import SearchHistory from './childComps/SearchHistory.vue'

  import {
    debounce
  } from "@/utils";

  export default {
    data() {
      return {
        inputDebounce: debounce(function(e) {
          this.searchInput(e);
        }),
        searchRecommend: [],
        searchHistory: []
      };
    },
    components: {
      SearchList,
      SearchHistory,
    },
    onLoad() {
      // this.inputDebounce = debounce(this.searchInput)
      this.searchHistory = JSON.parse(uni.getStorageSync('kw') || [])
    },
    methods: {
      searchInput(e) {
        this._getSearchRecommend(e);
        // 往搜索历史push数据
        if (e.trim() !== '') {
          this.searchHistory.unshift(e)
          uni.setStorageSync('kw', JSON.stringify(this.searchHistory))
        }
      },
      // inputDebounce: debounce(function(e) {
      //   this.searchInput(e)
      // })
      async _getSearchRecommend(e) {
        if (e === '') {
          this.searchRecommend = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: e
        })
        if (res.meta.status !== 200) return uni.$showFailedToast()
        this.searchRecommend = res.message
      },
      cleanHistory() {
        this.searchHistory = []
      },
    },
    onUnload() {
      this.inputDebounce = null;
    },
  };
</script>

<style lang="scss">
  .search-box {
    background-color: #c00000;
  }
</style>
