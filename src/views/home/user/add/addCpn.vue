<template>
  <div>
    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>

    <!-- 添加用户的对话框 -->
    <el-dialog
      v-model="addDialogVisible"
      title="添加用户"
      width="50%"
      @close="addDialogClosed(addFormRef)"
    >
      <!-- 内容主体区域 -->
      <el-form ref="addFormRef" :model="addForm" :rules="formRules" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile" />
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addUserAction(addFormRef)">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

// 引入 user 全局状态管理仓库
import useUserStore from '@/stores/user'

// 添加表单的引用对象
const addFormRef = ref<FormInstance>()

// 控制添加对话框的显示与隐藏
const addDialogVisible = ref(false)

// 添加表单的用户数据
const addForm = ref({
  username: '',
  password: '',
  email: '',
  mobile: ''
})

// 定义邮箱的验证规则
const validateEmail = (rule: any, value: any, callback: any) => {
  // 验证邮箱的正则表达式
  const regEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (regEmail.test(value)) {
    // 合法的邮箱
    return callback()
  }
  callback(new Error('请输入合法的邮箱'))
}

// 验证手机号的规则
const validateMobile = (rule: any, value: any, callback: any) => {
  const regMobile =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/

  if (regMobile.test(value)) {
    // 合法的手机号
    return callback()
  }

  callback(new Error('请输入合法的手机号'))
}

// 添加表单的验证规则对象
const formRules = ref<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 3,
      max: 10,
      message: '用户名的长度在3~10个字符之间',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 10, message: '密码的长度在6~15个字符之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '请输入手机', trigger: 'blur' },
    { validator: validateMobile, trigger: 'blur' }
  ]
})

// 取出user仓库的数据
const user = useUserStore()
const { addUserlistAction, getUserlistAction } = user

// 点击提交按钮，添加新用户
const addUserAction = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      // 验证通过，发送请求
      addUserlistAction(addForm.value)
      // 隐藏添加用户的对话框
      addDialogVisible.value = false
      // 重新获取用户列表
      getUserlistAction()
    } else {
      // 验证未通过，提示用户重新输入表单内容
      ElMessage.info('请重新输入用户信息')
    }
  })
}

// 添加表单对话框关闭时，重置添加表单
const addDialogClosed = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped></style>
