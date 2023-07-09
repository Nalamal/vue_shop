<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 头部组件 -->
      <HomeHeader />
    </el-header>
    <el-container>
      <!-- 侧边栏菜单组件 -->
      <HomeMenu />
      <!-- 内容主要区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
// 引入头部组件
import HomeHeader from './cpns/header/HomeHeader.vue'
// 引入侧边栏组件
import HomeMenu from './cpns/menu/HomeMenu.vue'
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  color: #373d41;
  font-size: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-main {
  background-color: #eaedf1;
}
</style>
