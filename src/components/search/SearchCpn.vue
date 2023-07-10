<template>
  <!-- 搜索与添加区域 -->
  <div>
    <!-- 搜索区域 -->
    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getListAction">
      <!-- 带搜索图标插槽 -->
      <template #append>
        <el-button :icon="Search" @click="getListAction" />
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
// 引入 user 全局状态管理仓库
import useUserStore from '@/stores/user'

// 取出user仓库的数据
const user = useUserStore()
const { queryInfo } = storeToRefs(user)
const { getUserlistAction } = user

// 定义获取列表的方法
const getListAction = async () => {
  // 获取用户列表数据
  getUserlistAction()
}
</script>

<style scoped></style>
