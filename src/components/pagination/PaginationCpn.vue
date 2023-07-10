<template>
  <div>
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="queryInfo.pagenum"
      v-model:page-size="queryInfo.pagesize"
      :page-sizes="[1, 2, 5, 10]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/user'
import { storeToRefs } from 'pinia'

// 取出user仓库的数据
const user = useUserStore()
const { getUserlistAction } = user
const { queryInfo, total } = storeToRefs(user)

// 监听pagenum改变的事件
const handleCurrentChange = (newPage: number) => {
  queryInfo.value.pagenum = newPage
  getUserlistAction()
}

// 监听 pagesize 改变的事件
const handleSizeChange = (newSize: number) => {
  queryInfo.value.pagesize = newSize
  getUserlistAction()
}
</script>

<style scoped></style>
