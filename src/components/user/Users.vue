<template>
  <!-- 面包屑导航区域 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 卡片视图区域 -->
  <el-card>
    <!-- 搜索与添加区域 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <!-- 搜索区域 -->
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
          <template #append>
            <el-button :icon="Search" @click="getUserList" />
          </template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <!-- 添加按钮 -->
        <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
      </el-col>
    </el-row>

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
  </el-card>

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
        <el-button type="primary" @click="addUser(addFormRef)"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 修改用户的对话框 -->
  <el-dialog
    v-model="editDialogVisible"
    title="修改用户"
    width="50%"
    @close="editDialogClosed(editFormRef)"
  >
    <el-form ref="editFormRef" :model="editForm" :rules="formRules" label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="editForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editUser(editFormRef)"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 分配角色的对话框 -->
  <el-dialog
    v-model="setAllotDialogVisible"
    title="分配角色"
    width="50%"
    @close="setRoleDialogClosed()"
  >
    <div>
      <p>当前的用户：{{ userInfo.username }}</p>
      <p>当前的角色：{{ userInfo.role_name }}</p>
      <p>
        分配新角色：
        <el-select v-model="selectedRoleId" placeholder="请选择">
          <el-option
            v-for="item in roleslist"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </p>
    </div>
    <!-- 底部区域 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="setAllotDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveUserRole"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  selectUsers,
  updateUserState,
  insertUser,
  selectUserById,
  updateUser,
  deleteUserById,
  selectRoles,
  updateUserRole
} from '@/service/request'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowRight, Search, Edit, Delete, Setting } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { IRoleslist } from '../power/Roles.vue'

// 定义 userlist 的类型
export interface IUserlist {
  id: number
  username: string
  mobile: string
  type: number
  email: string
  create_time: string
  mg_state: boolean
  role_name: string
}

// 用户列表数据
let userlist = ref<IUserlist[]>([])

// 总数据条数
let total = ref(0)

// 获取表单列表的参数对象
let queryInfo = reactive({
  query: '',
  // 当前的页数
  pagenum: 1,
  // 当前每页显示多少条数据
  pagesize: 2
})

// 定义发起用户数据列表请求的方法
const getUserList = async () => {
  // 发起用户数据列表请求
  const { data: res } = await selectUsers(queryInfo)
  // 请求失败，返回错误信息
  if (res.meta.status !== 200) {
    return ElMessage.error(res.meta.msg)
  }
  // 请求成功, 将请求结果储存在 userlist 中
  userlist.value = res.data.users
  // 数据总条数
  total.value = res.data.total
}

// 发起用户数据列表请求
getUserList()

// 监听 pagesize 改变的事件
const handleSizeChange = (newSize: number) => {
  queryInfo.pagesize = newSize
  getUserList()
}

// 监听 pagenum 改变的事件
const handleCurrentChange = (newPage: number) => {
  queryInfo.pagenum = newPage
  getUserList()
}

// 监听 switch 开关状态的改变
const userStateChanged = async (userinfo: IUserlist) => {
  const { data: res } = await updateUserState(userinfo)

  if (res.meta.status !== 200) {
    userinfo.mg_state = !userinfo.mg_state
    ElMessage.error('更新用户状态失败！')
  }

  ElMessage.success('更新用户状态成功！')
}

// 添加表单的引用对象
const addFormRef = ref<FormInstance>()

// 控制添加用户对话框的显示与隐藏
let addDialogVisible = ref(false)

// 添加表单的用户数据
const addForm = reactive({
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
var validateMobile = (rule: any, value: any, callback: any) => {
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

// 点击提交按钮，添加新用户
const addUser = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      // 验证通过，发送请求
      const { data: res } = await insertUser(addForm)
      if (res.meta.status !== 201) return ElMessage.error('添加用户失败！')
      ElMessage.success('添加用户成功!')
      // 影藏添加用户的对话框
      addDialogVisible.value = false
      // 重新添加用户的对话框
      getUserList()
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

// 修改用户的引用对象
const editFormRef = ref<FormInstance>()

// 控制修改用户对话框的显示与隐藏
let editDialogVisible = ref(false)

// 修改表单的用户数据
let editForm = ref({
  id: 0,
  username: '',
  email: '',
  mobile: ''
})

// 点击编辑角色按钮，展示编辑用户的对话框
const showEditDialog = async (id: number) => {
  const { data: res } = await selectUserById(id)
  if (res.meta.status !== 200) {
    return ElMessage.error('查询用户信息失败!')
  }
  editForm.value = res.data

  editDialogVisible.value = true
}

// 点击按钮，修改用户
const editUser = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      // 验证通过，发送请求
      const { data: res } = await updateUser(editForm.value)
      console.log(res)

      if (res.meta.status !== 200) return ElMessage.error('更新用户数据失败！')
      ElMessage.success('更新用户数据成功!')
      // 影藏添加用户的对话框
      editDialogVisible.value = false
      // 重新添加用户的对话框
      getUserList()
    } else {
      // 验证未通过，提示用户重新输入表单内容
      ElMessage.info('请重新输入用户信息')
    }
  })
}

// 修改表单对话框关闭时，重置修改表单
const editDialogClosed = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 根据 id 删除对应的用户
const removeUserById = (id: number) => {
  ElMessageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    // 点击确认按钮
    .then(async () => {
      const { data: res } = await deleteUserById(id)
      // 删除失败
      if (res.meta.status !== 200) return ElMessage.error('删除用户失败！')

      // 删除成功，弹出提示消息
      ElMessage.success('删除用户成功！')
      getUserList()
    })
    // 点击取消按钮
    .catch(() => {
      ElMessage.info('删除用户取消')
    })
}

// 控制分配角色对话框的显示与隐藏
let setAllotDialogVisible = ref(false)

// 需要被分配角色的用户信息
let userInfo = reactive({
  id: 0,
  username: '',
  role_name: ''
})

// 已选中的角色Id值
let selectedRoleId = ref('')

// 所有的角色列表
const roleslist = ref<IRoleslist[]>([])

// 展示分配角色的对话框
const showAllotRoleDialog = async (userinfo: IUserlist) => {
  // 需要被分配角色的用户信息
  userInfo = userinfo
  // 展示分配角色的对话框之前，先查询所有角色信息
  const { data: res } = await selectRoles()
  if (res.meta.status !== 200) ElMessage.error('获取角色信息失败！')
  roleslist.value = res.data
  setAllotDialogVisible.value = true
}

// 分配角色对话框关闭事件
const setRoleDialogClosed = () => {
  // 清空分配角色表单内容
  userInfo.username = ''
  userInfo.role_name = ''
  selectedRoleId.value = ''
}

// 点击按钮，分配角色
const saveUserRole = async () => {
  if (!selectedRoleId.value) {
    return ElMessage.error('请选择要分配的角色！')
  }

  const { data: res } = await updateUserRole(userInfo.id, selectedRoleId.value)

  if (res.meta.status !== 200) {
    return ElMessage.error('更新角色失败！')
  }

  ElMessage.success('更新角色成功！')
  getUserList()
  setAllotDialogVisible.value = false
}
</script>

<style scoped></style>
