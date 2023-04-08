<template>
  <div>
    <h2>抱歉，您输入的路径不存在</h2>
    <h3>o(╥﹏╥)o</h3>
    <el-button type="primary" @click="logout">返回登录页</el-button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
const logout = () => {
  router.push('login')
}
</script>

<style scoped>
div {
  text-align: center;
}
</style>
