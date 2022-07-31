export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || "{}"),
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || "{}"),
    token: uni.getStorageSync('token') || '',
    redirectInfo: null,
  }),
  mutations: {
    updateAddress(state, payload) {
      state.address = payload
      this.commit('m_user/saveAddressToStorage')
    },
    updateUserInfo(state, payload) {
      state.userinfo = payload
      this.commit('m_user/saveUserInfoToStorage')
      console.log(state.userinfo)
    },
    updateToken(state, payload) {
      state.token = payload
      this.commit('m_user/saveTokenToStorage')
    },
    updateRedirectInfo(state, payload) {
      state.redirectInfo = payload
    },
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
  },
  getters: {
    addressInfo(state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  },
}
