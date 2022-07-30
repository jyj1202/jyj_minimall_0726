<template>
  <view class="goods-nav">
    <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
      @buttonClick="buttonClick" />
    <!-- 看了这个组件的源码，这个组件的高度固定是50px -->
  </view>
</template>

<script>
  export default {
    name: 'DetailBottomBar',
    data() {
      return {
        options: [{
          icon: 'shop',
          text: '店铺',
          infoBackgroundColor: '#007aff',
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      }
    },
    methods: {
      onClick(e) {
        console.log(e)
        uni.showToast({
          title: `点击${e.content.text}`,
          icon: 'none'
        })
      },
      buttonClick(e) {
        console.log(e)
        if (e.content.text === '加入购物车') {
          this.options[1].info++
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .goods-nav {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>
