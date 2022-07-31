<template>
  <view class="my-container">
    <jyj-login v-if="!token"></jyj-login>
    <jyj-user-info v-else></jyj-user-info>
  </view>
</template>

<script>
  import { tabBarBadgeMixin } from '@/mixins/mixins.js'
  import { mapState } from 'vuex'
  
  export default {
    mixins: [tabBarBadgeMixin],
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('m_user', ['token']),
    },
    methods: {
      
    }
  }
</script>

<style lang="scss">
page,
.my-container {
  height: 100%;
}
</style>
