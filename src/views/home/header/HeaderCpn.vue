<template>
  <!-- home头部组件 -->
  <div class="home_header">
    <!-- logo区域 -->
    <img src="@/assets/images/logo.png" />
    <span>电商后台管理系统</span>
  </div>
  <!-- 登出按钮 -->
  <el-button type="info" @click="logout">退出</el-button>
</template>

<script setup lang="ts">
// 引入路由
import router from '@/router'

// 退出功能
const logout = () => {
  // 清空 token
  window.sessionStorage.clear()
  // 跳转路由，返回登录页
  router.push('/login')
}
</script>

<style lang="less" scoped>
.home_header {
  display: flex;
  align-items: center;
  img {
    width: 60px;
    height: 60px;
  }
  span {
    margin-left: 15px;
  }
}
</style>
