<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 头部组件 -->
      <HeaderCpn />
    </el-header>
    <el-container>
      <!-- 侧边栏菜单组件 -->
      <MenuCpn />
      <!-- 内容主要区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
// 引入头部组件
import HeaderCpn from './header/HeaderCpn.vue'
// 引入侧边栏组件
import MenuCpn from './menu/MenuCpn.vue'
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
  background-color: #f2f3f5;
}
</style>
