<template>
  <view class="goods-list">
    <view v-for="(goods, i) in goodList" :key="i" @click="goodsItemClick(goods)">
      <jyj-goods-item :goods="goods"></jyj-goods-item>
    </view>
  </view>
</template>

<script>
  import {
    throttle
  } from '@/utils'

  export default {
    data() {
      return {
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10
        },
        goodList: [],
        total: 0,
        onReachBottomDebounce: throttle(this.reachBottom)
      };
    },
    onLoad(option) {
      this.queryObj.query = option.query || ''
      this.queryObj.cid = option.cid || ''
      this._getGoodListData()
    },
    methods: {
      async _getGoodListData(cb) {
        // console.log('loading......')
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        cb && cb()
        if (res.meta.status !== 200) return uni.$showFailedToast()
        this.goodList = [...this.goodList, ...res.message.goods]
        this.total = res.message.total
      },
      reachBottom() {
        if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.showToast({
            icon: 'none',
            title: '数据加载完啦'
          })
        this.queryObj.pagenum += 1
        this._getGoodListData()
      },
      goodsItemClick(goods) {
        console.log('dadadad')
        uni.navigateTo({
          url: '/subpkg/good_detail/good_detail?goods_id=' + goods.goods_id
        })
      },
    },
    onPullDownRefresh() {
      this.queryObj.pagenum = 1
      this.total = 0
      this.goodList = []
      this._getGoodListData(() => {
        uni.stopPullDownRefresh()
      })
    },
    onReachBottom() {
      this.onReachBottomDebounce()
    },
  }
</script>

<style lang="scss">

</style>
