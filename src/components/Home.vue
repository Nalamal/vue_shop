<template>
  <el-button @click="logout">退出</el-button>
</template>

<script setup lang="ts">
// 导入路由
import router from '@/router'

// 退出功能
const logout = () => {
  // 清空 token
  window.sessionStorage.clear()
  // 跳转路由，返回登录页
  router.push('/login')
}
</script>

<style scoped></style>
