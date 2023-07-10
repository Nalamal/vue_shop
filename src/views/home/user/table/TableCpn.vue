<template>
  <div>
    <!-- 用户列表区域 -->
    <el-table :data="userlist" border stripe>
      <el-table-column type="index" />
      <el-table-column prop="username" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="mobile" label="电话" />
      <el-table-column prop="role_name" label="角色" />
      <el-table-column label="状态">
        <template #default="scope">
          <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-tooltip effect="dark" content="编辑用户" placement="top" :enterable="false">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              :icon="Edit"
              size="small"
              @click="showEditDialog(scope.row.id)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              :icon="Delete"
              size="small"
              @click="removeUserById(scope.row.id)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <!-- 分配角色按钮 -->
            <el-button
              type="warning"
              :icon="Setting"
              size="small"
              @click="showAllotRoleDialog(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { Edit, Delete, Setting } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import useUserStore from '@/stores/user'

const user = useUserStore()
const { getUserlistAction } = user
const { userlist } = storeToRefs(user)

getUserlistAction()
</script>

<style scoped></style>
