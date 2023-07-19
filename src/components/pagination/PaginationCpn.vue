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
import { ref } from 'vue'
import useUserStore from '@/stores/user'
import { storeToRefs } from 'pinia'

// 取出user仓库的数据
const user = useUserStore()
const { getUserlistAction } = user
const { total } = storeToRefs(user)

// 定义请求用户列表的参数
const queryInfo = ref({
  // 查询内容
  query: '',
  // 查询页数
  pagenum: 1,
  // 查询每页条数
  pagesize: 2
})

// 监听pagenum改变的事件
const handleCurrentChange = (newPage: number) => {
  queryInfo.value.pagenum = newPage
  getUserlistAction(queryInfo.value)
}

// 监听 pagesize 改变的事件
const handleSizeChange = (newSize: number) => {
  queryInfo.value.pagesize = newSize
  getUserlistAction(queryInfo.value)
}
</script>

<style scoped></style>
