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

    <!-- 修改用户的对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="修改用户"
      width="50%"
      @close="editDialogClosed(editFormRef)"
    >
      <el-form ref="editFormRef" :model="editForm" :rules="formRules" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm!.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm!.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm!.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editUserAction(editFormRef)"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Edit, Delete, Setting } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { storeToRefs } from 'pinia'
import useUserStore from '@/stores/user'
import type { IUserlist } from '@/stores/user'

// 从user仓库中取出数据
const user = useUserStore()
const { getUserlistAction, changeUserStateAction, getUserByIdAction } = user
const { userlist, editForm } = storeToRefs(user)

// 获取用户列表
getUserlistAction()

// 监听 switch 开关状态的改变
const userStateChanged = async (userlist: IUserlist) => {
  changeUserStateAction(userlist)
}

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

// 编辑表单的验证规则对象
const formRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 3,
      max: 10,
      message: '用户名的长度在3~10个字符之间',
      trigger: 'blur'
    }
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

// 控制修改用户对话框的显示与隐藏
const editDialogVisible = ref(false)

// 修改用户的引用对象
const editFormRef = ref<FormInstance>()

// 点击编辑角色按钮，展示编辑用户的对话框
const showEditDialog = async (id: number) => {
  getUserByIdAction(id)
  console.log(111)

  editDialogVisible.value = true
}

// 点击提交按钮，添加新用户
const editUserAction = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      // 验证通过，发送请求
      editUserAction(editForm.value)
      // 隐藏添加用户的对话框
      editDialogVisible.value = false
      // 重新获取用户列表
      getUserlistAction()
    } else {
      // 验证未通过，提示用户重新输入表单内容
      ElMessage.info('请重新输入用户信息')
    }
  })
}

// 添加表单对话框关闭时，重置添加表单
const editDialogClosed = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped></style>
