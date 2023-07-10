<template>
  <!-- user组件 -->
  <div>
    <!-- 面包屑导航区域 -->
    <BreadCrumb first-item="用户管理" second-item="用户列表" />

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索区域 -->
          <SearchCpn searchName="user" :queryInfo="queryInfo" />
        </el-col>
        <el-col :span="4">
          <!-- 添加按钮 -->
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <TableCpn />

      <!-- 分页区域 -->
      <PaginationCpn />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
// 引入面包屑导航组件
import BreadCrumb from '@/components/breadcrumb/BreadCrumb.vue'
// 引入添加搜索组件
import SearchCpn from '@/components/search/SearchCpn.vue'
// 引入用户列表组件
import TableCpn from './table/TableCpn.vue'
// 引入分页组件
import PaginationCpn from '@/components/pagination/PaginationCpn.vue'

// 获取表单列表的参数对象
const queryInfo = reactive({
  query: '',
  // 当前的页数
  pagenum: 1,
  // 当前每页显示多少条数据
  pagesize: 2
})

// 控制添加表单的显示与隐藏
const addDialogVisible = ref(false)
</script>

<style scoped></style>
