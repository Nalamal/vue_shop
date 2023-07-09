<template>
  <div class="breadcrumb">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ props.firstItem }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ props.secondItem }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'

// 接收父组件传递过来的值
const props = defineProps({
  // 一级菜单名
  firstItem: String,
  // 二级菜单名
  secondItem: String
})
</script>

<style scoped></style>
