<template>
  <view class="goods-nav">
    <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
      @buttonClick="buttonClick" />
    <!-- 看了这个组件的源码，这个组件的高度固定是50px -->
  </view>
</template>

<script>
  import {
    mapMutations, mapGetters
  } from 'vuex'

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
    props: {
      goods_info: {
        type: Object,
      }
    },
    computed: {
      ...mapGetters('m_cart', ['goodsLength'])
    },
    methods: {
      ...mapMutations('m_cart', ['addToCart']),
      onClick(e) {
        console.log(e)
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      buttonClick(e) {
        // console.log(e)
        if (e.content.text === '加入购物车') {
          uni.showToast({
            title: `点击${e.content.text}`,
            icon: 'none'
          })
          const goods = {
            goods_id: this.goods_info.goods_id, // 商品的Id
            goods_name: this.goods_info.goods_name, // 商品的名称
            goods_price: this.goods_info.goods_price, // 商品的价格
            goods_count: 1, // 商品的数量
            goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
            goods_state: true // 商品的勾选状态
          }

          // 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
          this.addToCart(goods)
        }
      }
    },
    watch: {
      goodsLength: {
        handler: function (newVal) {
          const cartOptions = this.options.find(i => i.text === '购物车')
          if (cartOptions) {
            cartOptions.info = newVal
          }
        },
        immediate: true
      }
    },
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
