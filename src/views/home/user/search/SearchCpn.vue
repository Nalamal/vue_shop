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
// 引入 user 全局状态管理仓库
import useUserStore from '@/stores/user'
import { ref } from 'vue'

// 定义请求用户列表的参数
const queryInfo = ref({
  // 查询内容
  query: '',
  // 查询页数
  pagenum: 1,
  // 查询每页条数
  pagesize: 2
})

// 取出user仓库的数据
const user = useUserStore()
const { getUserlistAction } = user

// 定义获取列表的方法
const getListAction = async () => {
  // 获取用户列表数据
  getUserlistAction(queryInfo.value)
}
</script>

<style scoped></style>
