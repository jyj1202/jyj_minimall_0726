<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" open-type="" @click="getUserProfile">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState,
  } from 'vuex'

  export default {
    name: "jyj-login",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['redirectInfo'])
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      async getUserProfile() {
        const res = await uni.getUserProfile({
          desc: 'use for user login'
        })
        // console.log(res)
        if (res[0] && res[0].errMsg === 'getUserProfile:fail auth deny') return uni.showToast({
          icon: 'none',
          title: '您取消了登录授权！'
        })
        // 获取用户信息成功
        this.updateUserInfo(res[1].userInfo)
        this.getToken(res[1])
      },
      async getToken(detail) {
        const [err, res] = await uni.login()
        // console.log(err, res)
        // if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        const query = {
          encryptedData: detail.encryptedData,
          rawData: detail.rawData,
          iv: detail.iv,
          signature: detail.signature,
          code: res.code,
        }
        // console.log(query)
        const tokenres = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        // console.log(res.code, loginResult)
        console.log(tokenres)
        const loginResult = tokenres.data
        // if (loginResult.meta.status !== 200) return uni.showToast({
        //   title: '登录失败！',
        //   icon: 'none'
        // })
        const token = loginResult.message && loginResult.message.token ||
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
        console.log(token)
        this.updateToken(token)
        this.navigateBack()
      },
      navigateBack() {
        // redirectInfo 不为 null，并且导航方式为 switchTab
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          // 调用小程序提供的 uni.switchTab() API 进行页面的导航
          uni.switchTab({
            // 要导航到的页面地址
            url: this.redirectInfo.from,
            // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    },
  }
</script>

<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
