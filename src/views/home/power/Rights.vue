<template>
  <!-- 面包屑导航区域 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 卡片视图区域 -->
  <el-card>
    <el-table :data="rightslist" border stripe>
      <el-table-column type="index" />
      <el-table-column label="权限名称" prop="authName" />
      <el-table-column label="路径" prop="path" />
      <el-table-column label="权限等级" prop="level">
        <template #default="scope">
          <el-tag v-if="scope.row.level === '0'">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { selectListRights } from '@/service/modules/power'

// 定义 rightList 的类型
interface IRightslist {
  id: number
  authName: string
  path: string
  pid: number
  level: string
}

// 权限列表
let rightslist = ref<IRightslist[]>([])

// 获取用户权限的请求
const getUserRights = async () => {
  const res = await selectListRights()
  // 请求失败
  if (res.meta.status !== 200) return ElMessage.error('获取权限列表失败！')
  rightslist.value = res.data
}

// 发送获取用户权限的请求
getUserRights()
</script>

<style scoped></style>
