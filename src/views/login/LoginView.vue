<template>
  <!-- 登录页面 -->
  <div class="login_container">
    <!-- 登录盒子 -->
    <div class="login_box">
      <!-- 左侧盒子 -->
      <LoginLeft />
      <!-- 右侧盒子 -->
      <LoginRight />
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入左侧盒子组件
import LoginLeft from './cpns/LoginLeft.vue'
// 引入右侧盒子组件
import LoginRight from './cpns/LoginRight.vue'
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #eee;
  background-image: url('@/assets/images/login_bg.svg');
  background-size: 100% 100%;
}

.login_box {
  width: 96.5%;
  height: 94%;
  background-color: #fffc;

  border-radius: 10px;

  display: flex;
  justify-content: space-around;

  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
