<template>
  <!-- 面包屑导航区域 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 卡片视图区域 -->
  <el-card>
    <!-- 添加角色按钮区域 -->
    <el-row>
      <el-col>
        <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
      </el-col>
    </el-row>

    <el-table :data="roleslist" border stripe>
      <!-- 展开列 -->
      <el-table-column type="expand">
        <template #default="scope">
          <el-row
            :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
            v-for="(item1, i1) in scope.row.children"
            :key="item1.id"
          >
            <!-- 渲染一级权限 -->
            <el-col :span="5" class="vcener">
              <el-tag size="large" closable @close="removeRightById(scope.row, item1.id)">{{
                item1.authName
              }}</el-tag>
              <el-icon><CaretRight /></el-icon>
            </el-col>
            <!-- 渲染二级权限和三级权限 -->
            <el-col :span="19">
              <el-row
                :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                v-for="(item2, i2) in item1.children"
                :key="item2.id"
              >
                <el-col :span="6" class="vcener">
                  <el-tag
                    type="success"
                    size="large"
                    closable
                    @close="removeRightById(scope.row, item2.id)"
                    >{{ item2.authName }}</el-tag
                  >
                  <el-icon><CaretRight /></el-icon>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    type="warning"
                    size="large"
                    closable
                    v-for="item3 in item2.children"
                    :key="item3.id"
                    @close="removeRightById(scope.row, item3.id)"
                    >{{ item3.authName }}</el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 索引列 -->
      <el-table-column type="index" label="#" />
      <el-table-column label="角色名称" prop="roleName" />
      <el-table-column label="角色描述" prop="roleDesc" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" :icon="Edit" @click="showEditDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" :icon="Delete" @click="removeRoleById(scope.row.id)"
            >删除</el-button
          >
          <!-- @click="showSetRightDialog(scope.row)" -->
          <el-button
            size="small"
            type="warning"
            :icon="Setting"
            @click="showSetRightDialog(scope.row)"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- 添加角色的对话框 -->
  <el-dialog
    v-model="addDialogVisible"
    title="添加角色"
    width="50%"
    @close="addDialogClosed(addFormRef)"
  >
    <el-form ref="addFormRef" :model="addForm" :rules="formRules" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="addForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="addForm.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addRoles(addFormRef)">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 编辑角色的对话框 -->
  <el-dialog
    v-model="editDialogVisible"
    title="编辑用户"
    width="50%"
    @close="editDialogClosed(editFormRef)"
  >
    <el-form ref="editFormRef" :model="editForm" :rules="formRules" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="editForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="editForm.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editRoles(editFormRef)"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 分配权限的对话框 -->
  <!-- @close="setRightDialogClosed" -->
  <el-dialog
    v-model="setRightDialogVisible"
    title="分配权限"
    width="50%"
    @close="setRightDialogClosed"
  >
    <!-- 树形控件 -->
    <el-tree
      :data="rightslist"
      :props="treeProps"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="defKeys"
      ref="treeRef"
    ></el-tree>
    <!-- 底部区域 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="allotRights">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  selectRoles,
  insertRole,
  selectRoleById,
  updateRole,
  deleteRole,
  deleteRoleRight,
  selectTreeRights,
  updateRoleRights
} from '@/service/request'
import { ArrowRight, Edit, Delete, Setting, CaretRight } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, ElTree } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

// 定义 rolelist 的类型
export interface IRoleslist {
  id: number
  roleName: string
  roleDesc: string
  children?: IRoleslist[]
}

// 所有角色的列表区域
let roleslist = ref<IRoleslist[]>([])

// 定义获取所有角色列表的方法
const getRolesList = async () => {
  const { data: res } = await selectRoles()
  if (res.meta.status !== 200) return ElMessage.error('获取角色列表失败！')
  roleslist.value = res.data
}

// 发起获取数据列表的请求
getRolesList()

// 控制添加角色的对话框的显示与隐藏
let addDialogVisible = ref(false)

// 添加角色的表单数据
const addForm = ref({
  roleName: '',
  roleDesc: ''
})

// 添加角色表单引用对象
const addFormRef = ref<FormInstance>()

// 添加角色的验证规则对象
const formRules = reactive<FormRules>({
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  roleDesc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
})

// 点击提交按钮，添加新角色
const addRoles = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      // 验证通过，发送请求
      const { data: res } = await insertRole(addForm.value)
      console.log(res)

      if (res.meta.status !== 201) return ElMessage.error('添加用户角色失败！')
      ElMessage.success('添加用户角色成功!')
      // 影藏添加用户的对话框
      addDialogVisible.value = false
      // 重新添加用户的对话框
      getRolesList()
    } else {
      // 验证未通过，提示用户重新输入表单内容
      ElMessage.info('请重新输入角色信息')
    }
  })
}

// 添加表单对话框关闭时，重置添加表单
const addDialogClosed = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 修改角色的表单数据
let editForm = ref({
  roleId: 0,
  roleName: '',
  roleDesc: ''
})

// 修改角色表单的引用对象
const editFormRef = ref<FormInstance>()

// 控制修改用户对话框的显示与隐藏
let editDialogVisible = ref(false)

// 展示修改角色的对话框
const showEditDialog = async (id: number) => {
  const { data: res } = await selectRoleById(id)
  editForm.value = res.data
  editDialogVisible.value = true
}

// 点击提交按钮，修改角色
const editRoles = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      // 验证通过，发送请求
      const { data: res } = await updateRole(editForm.value)
      console.log(res)

      if (res.meta.status !== 200) return ElMessage.error('修改用户角色失败！')
      ElMessage.success('修改用户角色成功!')
      // 影藏添加用户的对话框
      editDialogVisible.value = false
      // 重新添加用户的对话框
      getRolesList()
    } else {
      // 验证未通过，提示用户重新输入表单内容
      ElMessage.info('请重新输入角色信息')
    }
  })
}

// 修改表单对话框关闭时，重置添加表单
const editDialogClosed = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 删除角色
const removeRoleById = async (id: number) => {
  ElMessageBox.confirm('此操作将永久删除该角色, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    // 点击确认按钮
    .then(async () => {
      const { data: res } = await deleteRole(id)

      // 删除失败
      if (res.meta.status !== 200) return ElMessage.error('删除角色失败！')

      // 删除成功，弹出提示消息
      ElMessage.success('删除角色成功！')
      getRolesList()
    })
    // 点击取消按钮
    .catch(() => {
      ElMessage.info('删除角色取消')
    })
}

// 根据 id 删除对应的权限标签
const removeRightById = (role: IRoleslist, id: number) => {
  ElMessageBox.confirm('此操作将永久删除该标签, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    // 点击确认按钮
    .then(async () => {
      const { data: res } = await deleteRoleRight(role, id)
      // 删除失败
      if (res.meta.status !== 200) return ElMessage.error('删除标签失败！')

      // 删除成功，弹出提示消息
      ElMessage.success('删除标签成功！')
      getRolesList()
    })
    // 点击取消按钮
    .catch(() => {
      ElMessage.info('删除取消标签')
    })
}

// 控制分配权限的对话框的显示与隐藏
let setRightDialogVisible = ref(false)

// 当前即将分配权限的角色 id
let roleId = ref(0)

// 所有权限的数据
let rightslist = ref([])

// 树形控件的属性绑定对象
const treeProps = {
  label: 'authName',
  children: 'children'
}

// 默认选中的节点 id 值数组
let defKeys = ref<number[]>([])

// 通过递归的形式，获取角色下所有三级权限的 id，并保存到 defKeys 数组中
const getLeafKeys = (node: IRoleslist, arr: number[]) => {
  // 如果当前 node 节点不包含 children 属性，则是三级节点
  if (!node.children) {
    return arr.push(node.id)
  }
  // 不是三级节点，通过递归方式重新循环
  node.children.forEach((item) => {
    getLeafKeys(item, arr)
  })
}

// 展示分配权限的对话框
const showSetRightDialog = async (role: IRoleslist) => {
  // 获取当前节点的 id
  roleId.value = role.id
  // 发送获取树形权限列表的请求
  const { data: res } = await selectTreeRights()
  // 请求失败
  if (res.meta.status !== 200) return ElMessage.error('获取权限数据失败！')
  // 将获取到的数据权限保存到 data 中
  rightslist.value = res.data

  // 递归获取的三级节点的 Id
  getLeafKeys(role, defKeys.value)
  setRightDialogVisible.value = true
}

// 监听分配权限对话框的关闭事件
const setRightDialogClosed = () => {
  defKeys.value = []
}

// 定义树形控件的引用对象
const treeRef = ref<InstanceType<typeof ElTree>>()

// 点击确认按钮，为角色分配权限
const allotRights = async () => {
  const keys = [...treeRef.value!.getCheckedKeys(), ...treeRef.value!.getHalfCheckedKeys()]

  const idStr = keys.join(',')

  const { data: res } = await updateRoleRights(roleId.value, idStr)

  if (res.meta.status !== 200) {
    ElMessage.error('分配权限失败！')
  }

  ElMessage.success('分配权限成功！')
  getRolesList()
  setRightDialogVisible.value = false
}
</script>

<style scoped>
.el-tag {
  margin: 7px 2px 7px 20px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>
