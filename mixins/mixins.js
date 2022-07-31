import {
    mapGetters
  } from 'vuex'

  export const tabBarBadgeMixin = {
    onShow() {
      // 在页面刚展示的时候，设置数字徽标
      this.setBadge()
    },
    computed: {
      ...mapGetters('m_cart', ['goodsLength']),
    },
    methods: {
      setBadge() {
        uni.setTabBarBadge({
          index: 2,
          text: this.goodsLength + ''
        })
      },
    },
    watch: {
      goodsLength() {
        this.setBadge()
      },
    }
  }
