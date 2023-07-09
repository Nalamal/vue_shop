<template>
  <!-- 搜索与添加区域 -->
  <div>
    <!-- 搜索与添加区域 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <!-- 搜索区域 -->
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          clearable
          @clear="getUserlistAction"
        >
          <template #append>
            <el-button :icon="Search" @click="getUserlistAction" />
          </template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <!-- 添加按钮 -->
        <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import useUserstore from '@/stores/user'

const user = useUserstore()
const { queryInfo, getUserlistAction, addDialogVisible } = user
</script>

<style scoped></style>
