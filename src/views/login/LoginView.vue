<template>
  <!-- 登录页面 -->
  <div class="login_container">
    <div class="login_box">
      <!-- 头部区域 -->
      <div class="avatar_box">
        <img src="@/assets/img/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="ruleFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="0"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" :prefix-icon="Avatar" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" :prefix-icon="Lock" type="password" />
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button type="info" @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Avatar, Lock } from '@element-plus/icons-vue'
import { login } from '@/service/modules/login'
import { ElMessage } from 'element-plus'
// 导入路由
import router from '@/router'

// 提交表单所引用的对象
const ruleFormRef = ref<FormInstance>()

// 表单验证规则
const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入你的用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入你的密码', trigger: 'blur' }]
})

// 登录表单数据
const loginForm = reactive({
  username: 'admin',
  password: '123456'
})

// 点击登录按钮，确认表单验证是否通过
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  // 验证表单是否符合需要
  await formEl.validate(async (valid) => {
    if (valid) {
      // 验证通过，发送请求
      const { data: res } = await login(loginForm)
      // 登录失败
      if (res.meta.status !== 200) {
        // 返回登录失败的信息
        return ElMessage.error('登录失败！')
      }
      // 登录成功
      ElMessage.success('登录成功！')
      // 将 token 存储在 sessionStorage 中
      window.sessionStorage.setItem('token', res.data.token)
      // 实现路由跳转
      router.push('/home')
    } else {
      // 验证未通过，提示用户重新输入用户名和密码
      ElMessage.info('请重新输入用户名和密码！')
    }
  })
}

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #6b8770;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  float: right;
}
</style>
