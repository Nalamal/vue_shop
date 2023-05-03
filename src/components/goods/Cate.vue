<template>
  <!-- 面包屑导航区域 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 卡片视图区域 -->
  <el-card>
    <el-row>
      <el-col>
        <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
      </el-col>
    </el-row>

    <!-- 表格区域 -->
    <el-table :data="catelist" border stripe row-key="cat_id">
      <el-table-column width="50" />
      <el-table-column prop="cat_name" label="分类名称" />
      <el-table-column prop="cat_deleted" label="是否有效">
        <template #default="scope">
          <el-icon v-if="scope.row.cat_deleted === false" style="color: lightgreen"
            ><CircleCheckFilled
          /></el-icon>
          <el-icon v-else style="color: red"><CircleCloseFilled /></el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="cat_level" label="排序">
        <template #default="scope">
          <el-tag size="small" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" size="small" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning" size="small" v-else>三级</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            :icon="Edit"
            size="small"
            @click="showEditCateDialog(scope.row.cat_id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            :icon="Delete"
            size="small"
            @click="removeCateById(scope.row.cat_id)"
            >删除</el-button
          >
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

  <!-- 添加分类的对话框 -->
  <el-dialog
    v-model="addCateDialogVisible"
    title="添加分类"
    width="50%"
    @close="addCateDialogClosed(addCateFormRef)"
  >
    <!-- 内容主体区域 -->
    <el-form ref="addCateFormRef" :model="addCateForm" :rules="formRules" label-width="100px">
      <el-form-item label="分类名称:" prop="cat_name">
        <el-input v-model="addCateForm.cat_name" />
      </el-form-item>
      <el-form-item label="父级分类:">
        <el-cascader
          v-model="selectedKeys"
          :options="parentCatelist"
          :props="cascaderProps"
          @change="parentCateChanged"
          clearable
        />
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addCate(addCateFormRef)"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 编辑分类的对话框 -->
  <el-dialog
    v-model="editCateDialogVisible"
    title="编辑分类"
    width="50%"
    @close="editCateDialogClosed(editCateFormRef)"
  >
    <!-- 内容主体区域 -->
    <el-form ref="editCateFormRef" :model="editCateForm" :rules="formRules" label-width="100px">
      <el-form-item label="分类名称:" prop="cat_name">
        <el-input v-model="editCateForm.cat_name" />
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editCate(editCateFormRef)"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  ArrowRight,
  CircleCheckFilled,
  CircleCloseFilled,
  Edit,
  Delete
} from '@element-plus/icons-vue'
import {
  selectGoodsCategories,
  insertGoodsCategories,
  selectGoodsCategoriesById,
  updateGoodsCategories,
  deleteGoodsCategories
} from '@/service/request'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessageBox, ElMessage } from 'element-plus'

// 查询条件
const queryInfo = reactive({
  type: 3,
  pagenum: 1,
  pagesize: 5
})

// 定义 catelist 的类型
interface ICatelist {
  cat_id: number
  cat_name: string
  cat_pid: number
  cat_level: number
  cat_deleted: boolean
  children?: ICatelist[]
}

// 商品分类的数据列表，默认为空
let catelist = ref<ICatelist[]>([])

// 总数据条数
let total = ref(0)

// 获取商品分类的请求
const getCatelist = async () => {
  const { data: res } = await selectGoodsCategories(queryInfo)
  if (res.meta.status !== 200) {
    return ElMessage.error('获取商品分类失败！')
  }

  catelist.value = res.data.result
  total.value = res.data.total
}

// 发送获取商品分类的请求
getCatelist()

// 监听 pagesize 改变的事件
const handleSizeChange = (newSize: number) => {
  queryInfo.pagesize = newSize
  getCatelist()
}

// 监听 pagenum 改变的事件
const handleCurrentChange = (newPage: number) => {
  queryInfo.pagenum = newPage
  getCatelist()
}

// 控制添加对话框的显示与隐藏
let addCateDialogVisible = ref(false)

// 添加分类的表单数据
const addCateForm = reactive({
  // 将要添加的分类的名称
  cat_name: '',
  // 父级分类的 Id
  cat_pid: 0,
  // 分类的等级， 默认要添加的是1级分类
  cat_level: 0
})

// 添加分类的引用对象
const addCateFormRef = ref<FormInstance>()

// 添加分类表单的验证规则对象
const formRules = reactive<FormRules>({
  cat_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
})

// 选中的父级分类的Id数组
let selectedKeys = ref<number[]>([])

// 父级分类的列表
const parentCatelist = ref<ICatelist[]>([])

// 指定级联选择器的配置对象
const cascaderProps = reactive({
  // 触发方式为 hover
  expandTrigger: 'hover',
  // 可以选定
  checkStrictly: true,
  // 绑定级联选择器的数据源
  value: 'cat_id',
  label: 'cat_name',
  children: 'children'
})

// 点击按钮，展示添加分类的对话框
const showAddCateDialog = async () => {
  // 发送查询一级和二级分类列表请求
  const { data: res } = await selectGoodsCategories({ type: 2 })
  if (res.meta.status !== 200) return ElMessage.error('查询父级分类失败！')
  // 将返回的结果存储到父级分类的列表中
  parentCatelist.value = res.data
  // 打开对话框
  addCateDialogVisible.value = true
}

// 选择项发生变化触发这个函数
const parentCateChanged = () => {
  console.log(selectedKeys.value)
  // 如果 selectedKeys 数组中的 length 大于 0, 证明选中的父级分类
  // 反之，就说明没有选中任何父级分类
  if (selectedKeys.value.length > 0) {
    // 父级分类的Id
    addCateForm.cat_pid = selectedKeys.value[selectedKeys.value.length - 1]
    // 为当前分类的等级赋值
    addCateForm.cat_level = selectedKeys.value.length
  } else {
    // 父级分类的Id
    addCateForm.cat_pid = 0
    // 为当前分类的等级赋值
    addCateForm.cat_level = 0
  }
}

// 添加分类对话框关闭,重置添加表单
const addCateDialogClosed = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 点击确认按钮，提交添加分类表单
const addCate = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      // 验证通过，发送请求
      const { data: res } = await insertGoodsCategories(addCateForm)
      if (res.meta.status !== 201) return ElMessage.error('添加商品分类失败！')
      ElMessage.success('添加商品分类成功!')
      // 影藏添加用户的对话框
      addCateDialogVisible.value = false
      // 重新添加用户的对话框
      getCatelist()
    } else {
      // 验证未通过，提示用户重新输入表单内容
      ElMessage.info('请重新商品分类信息')
    }
  })
}

// 控制编辑对话框的显示与隐藏
let editCateDialogVisible = ref(false)

// 编辑分类的引用对象
const editCateFormRef = ref<FormInstance>()

// 编辑分类的表单数据
let editCateForm = ref({
  cat_id: 0,
  cat_name: '',
  cat_pid: '',
  cat_level: 0
})

// 点击编辑按钮，展开编辑分类的对话框
const showEditCateDialog = async (id: number) => {
  // 发送根据 cat_id 寻找对应商品分类信息的请求
  const { data: res } = await selectGoodsCategoriesById(id)
  if (res.meta.status !== 200) return ElMessage.error('查询分类失败！')
  editCateForm.value = res.data
  editCateDialogVisible.value = true
}

// 点击确认按钮，提交表单修改名称
const editCate = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      // 验证通过，发送请求
      const { data: res } = await updateGoodsCategories(editCateForm.value)
      if (res.meta.status !== 200) return ElMessage.error('编辑商品分类失败！')
      ElMessage.success('编辑商品分类成功!')
      // 影藏添加用户的对话框
      editCateDialogVisible.value = false
      // 重新添加用户的对话框
      getCatelist()
    } else {
      // 验证未通过，提示用户重新输入表单内容
      ElMessage.info('分类名称不能为空！')
    }
  })
}

// 修改分类对话框关闭，重置修改表单
const editCateDialogClosed = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 点击删除按钮，展开删除分类的对话框
const removeCateById = async (id: number) => {
  ElMessageBox.confirm('此操作将永久删除该分类, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    // 点击确认按钮
    .then(async () => {
      const { data: res } = await deleteGoodsCategories(id)
      // 删除失败
      if (res.meta.status !== 200) return ElMessage.error('删除商品分类失败！')

      // 删除成功，弹出提示消息
      ElMessage.success('删除商品分类成功！')
      getCatelist()
    })
    // 点击取消按钮
    .catch(() => {
      ElMessage.info('取消删除商品分类')
    })
}
</script>

<style lang="less" scoped>
:deep(.el-cascader) {
  width: 100%;
}
</style>
