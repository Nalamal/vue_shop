<template>
  <!-- user组件 -->
  <div>
    <!-- 面包屑导航区域 -->
    <BreadCrumb first-item="用户管理" second-item="用户列表" />
    <el-card>
      <!-- 搜索与添加区域 -->
      <AddSearch />
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 引入面包屑导航组件
import BreadCrumb from '@/components/breadcrumb/BreadCrumb.vue'
// 引入添加搜索组件
import AddSearch from '@/components/add-search/AddSearch.vue'
</script>

<style scoped></style>
