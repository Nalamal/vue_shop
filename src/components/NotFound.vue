<template>
  <div class="not-found">
    <div>
      <img src="@/assets/images/404.png" alt="" />
    </div>
    <div>
      <h2 class="title">404 (╥﹏╥)</h2>
      <h3 class="notice">抱歉，你访问的页面不存在~</h3>
      <el-button type="primary" @click="logout">返回上一页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
const logout = () => {
  router.go(-1)
}
</script>

<style scoped>
.not-found {
  width: 1000px;
  height: 600px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: space-around;
  align-items: center;
}
.title {
  font-size: 60px;
}
.notice {
  font-size: 20px;
  font-weight: 400;
  color: gray;
}
</style>
