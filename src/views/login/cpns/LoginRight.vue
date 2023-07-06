<template>
  <!-- 右侧盒子 -->
  <div class="box_right">
    <div class="title">
      <img src="@/assets/images/avatar.jpg" alt="" />
      <h2>电商后台管理系统</h2>
    </div>
    <!-- 登录表单区域 -->
    <el-form ref="ruleFormRef" :model="loginForm" :rules="rules" class="login_form">
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          :prefix-icon="Avatar"
          size="large"
          placeholder="Username: admin"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          :prefix-icon="Lock"
          size="large"
          placeholder="Password: 123456"
          show-password
        />
      </el-form-item>
      <!-- 按钮区域 -->
      <el-form-item class="btns">
        <el-button round size="large" width="185px" @click="resetForm(ruleFormRef)">
          <span class="btn">重置</span>
        </el-button>
        <el-button round type="primary" size="large" @click="submitForm(ruleFormRef)">
          <span class="btn">登录</span>
        </el-button>
      </el-form-item>
    </el-form>
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
  username: '',
  password: ''
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
      ElMessage.info('请输入正确的用户名和密码！')
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
.box_right {
  width: 500px;
  height: 400px;

  margin: auto 20px;

  background-color: #fffc;
  opacity: 1;

  border-radius: 10px;
  box-shadow: 0 0 10px #ddd;
}
.title {
  margin-top: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
    border: 5px #ddd solid;
    border-radius: 50%;
  }

  h2 {
    margin-left: 20px;
    color: #34495e;
    font-size: 40px;
  }
}
.el-form {
  padding: 30px;
}

:deep(.el-form-item__content) {
  justify-content: space-between;
}
.btn {
  width: 100px;
}
</style>
