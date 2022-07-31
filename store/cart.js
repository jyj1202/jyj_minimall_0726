export default {
  namespaced: true,
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  }),
  mutations: {
    addToCart(state, payload) {
      const findGoods = state.cart.find(i => i.goods_id === payload.goods_id) 
      if (findGoods) {
        findGoods.goods_count++
      } else {
        state.cart.push(payload)
      }
      this.commit('m_cart/saveToStorage')
      // console.log(state.cart)
    },
    updateGoodsState(state, payload) {
      const goods = state.cart.find(i => i.goods_id === payload.goods_id)
      if (goods) {
        goods.goods_state = payload.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    updateAllGoodsState(state, payload) {
      state.cart.forEach(i => i.goods_state = payload)
      this.commit('m_cart/saveToStorage')
    },
    updateGoodsCount(state, payload) {
      const goods = state.cart.find(i => i.goods_id === payload.goods_id)
      if (goods) {
        goods.goods_count = payload.goods_count
        this.commit('m_cart/saveToStorage')
      }
      // console.log(state.cart)
    },
    removeGoods(state, payload) {
      state.cart = state.cart.filter(i => i.goods_id !== payload)
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
  },
  getters: {
    goodsLength(state) {
      let total = 0
      state.cart.forEach(goods => total += goods.goods_count)
      return total
    },
    checkedGoodsLength(state) {
      return state.cart.filter(i => i.goods_state).reduce((pre, current) => pre + current.goods_count, 0)
    },
    totalPrice(state) {
      return state.cart.filter(i => i.goods_state === true).reduce((pre, current) => { return pre + current.goods_count * current.goods_price}, 0).toFixed(2) 
    },
  },
}
