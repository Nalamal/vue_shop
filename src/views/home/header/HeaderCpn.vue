<template>
  <!-- home头部组件 -->
  <div class="home_header">
    <!-- 左部欢迎区域 -->
    <span class="left">{{ hello }}</span>
    <!-- 中间标题区域 -->
    <span class="center">电商后台管理系统</span>
    <!-- 右边用户交互区域 -->
    <div class="right">
      <el-icon><Search /></el-icon>
      <el-icon><Bell /></el-icon>
      <img src="@/assets/images/avatar.jpg" alt="用户头像" @click="logout" />
      <!-- <el-button type="info" @click="logout">退出</el-button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入路由
import router from '@/router'
import hello from '@/utils/hello'
import { Search, Bell } from '@element-plus/icons-vue'

// 退出功能
const logout = () => {
  // 清空 token
  window.localStorage.clear()
  // 跳转路由，返回登录页
  router.push('/login')
}
</script>

<style lang="less" scoped>
.home_header {
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  width: 160px;
  font-size: 20px;
  font-weight: 400;
}
.center {
  font-size: 30px;
  font-weight: 700;
}
.right {
  width: 160px;
  font-size: 25px;
  font-weight: 400;

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 58px;
    height: 58px;
    border: 1px solid black;
    border-radius: 50%;
  }
}
</style>
