<template>
  <!-- 面包屑导航区域 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>分类参数</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 卡片视图区域 -->
  <el-card>
    <!-- 警告区域 -->
    <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon />

    <!-- 选择商品分类区域 -->
    <el-row class="cat_opt">
      <el-col>
        <span>选择商品分类：</span>
        <!-- 选择商品分类的级联选择 -->
        <el-cascader
          v-model="selectedCateKeys"
          :options="catelist"
          :props="cascaderProps"
          @change="handleChange"
        ></el-cascader>
      </el-col>
    </el-row>

    <!-- tab 页签区域 -->
    <el-tabs v-model="activeName" @tab-change="handleTabChange">
      <!-- 添加动态参数的面板 -->
      <el-tab-pane label="动态参数" name="many">
        <!-- 添加参数的按钮 -->
        <el-button
          type="primary"
          size="small"
          :disabled="isBtnDisabled"
          @click="addDialogVisible = true"
          >添加参数</el-button
        >
        <!-- 动态参数表格 -->
        <el-table :data="manyTableData" border stripe>
          <!-- 展开行 -->
          <el-table-column type="expand">
            <template #default="scope">
              <!-- 循环渲染 tag 标签 -->
              <el-tag v-for="(item, i) in scope.row.attr_vals" :key="i" closable>
                {{ item }}
              </el-tag>
              <!-- 输入的文本框 -->
              <el-input
                v-if="scope.row.inputVisible"
                ref="InputRef"
                v-model="scope.row.inputValue"
                class="input-new-tag"
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
              />
              <!-- 添加按钮 -->
              <el-button v-else size="small" @click="showInput(scope.row)"> + New Tag </el-button>
            </template>
          </el-table-column>
          <!-- 索引列 -->
          <el-table-column type="index"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                size="small"
                type="primary"
                :icon="Edit"
                @click="showEditDialog(scope.row.attr_id)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                :icon="Delete"
                @click="removeParams(scope.row.attr_id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 添加静态属性的面板 -->
      <el-tab-pane label="静态属性" name="only">
        <!-- 添加属性的按钮 -->
        <el-button
          type="primary"
          size="small"
          :disabled="isBtnDisabled"
          @click="addDialogVisible = true"
          >添加属性</el-button
        >
        <!-- 静态属性表格 -->
        <el-table :data="onlyTableData" border stripe>
          <!-- 展开行 -->
          <el-table-column type="expand">
            <template #default="scope">
              <!-- 循环渲染 tag 标签 -->
              <el-tag v-for="(item, i) in scope.row.attr_vals" :key="i" closable>
                {{ item }}
              </el-tag>
              <!-- 输入的文本框 -->
              <el-input
                v-if="scope.row.inputVisible"
                ref="InputRef"
                v-model="scope.row.inputValue"
                class="input-new-tag"
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
              />
              <!-- 添加按钮 -->
              <el-button v-else size="small" @click="showInput(scope.row)"> + New Tag </el-button>
            </template>
          </el-table-column>
          <!-- 索引列 -->
          <el-table-column type="index"></el-table-column>
          <el-table-column label="属性名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                size="small"
                type="primary"
                :icon="Edit"
                @click="showEditDialog(scope.row.attr_id)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                :icon="Delete"
                @click="removeParams(scope.row.attr_id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>

  <!-- 添加参数的对话框 -->
  <el-dialog
    v-model="addDialogVisible"
    :title="'添加' + titleText"
    width="50%"
    @close="addDialogClosed(addFormRef)"
  >
    <el-form ref="addFormRef" :model="addForm" :rules="formRules" label-width="100px">
      <el-form-item :label="titleText" prop="attr_name">
        <el-input v-model="addForm.attr_name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addParams(addFormRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 修改参数的对话框 -->
  <el-dialog
    v-model="editDialogVisible"
    :title="'修改' + titleText"
    width="50%"
    @close="editDialogClosed(editFormRef)"
  >
    <el-form ref="editFormRef" :model="editForm" :rules="formRules" label-width="100px">
      <el-form-item :label="titleText" prop="attr_name">
        <el-input v-model="editForm.attr_name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editParams(editFormRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick } from 'vue'
import {
  selectGoodsCategories,
  selectCategoriesArributes,
  insertCategoriesArributes,
  selectCategoriesArributeById,
  updateCategoriesArribute,
  deleteCategoriesArribute
} from '@/service/request'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules, ElInput } from 'element-plus'
import { ArrowRight, Edit, Delete } from '@element-plus/icons-vue'

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

// 获取商品分类的请求
const getCatelist = async () => {
  const { data: res } = await selectGoodsCategories()
  if (res.meta.status !== 200) {
    return ElMessage.error('获取商品分类失败！')
  }
  catelist.value = res.data
}

// 发送获取商品分类的请求
getCatelist()

// 指定级联选择器的配置对象
const cascaderProps = reactive({
  // 触发方式为 hover
  expandTrigger: 'hover',
  // 绑定级联选择器的数据源
  label: 'cat_name',
  value: 'cat_id',
  children: 'children'
})

// 级联选择框的双向绑定到的数组
let selectedCateKeys = ref<number[]>([])

// 被激活的页签名称
let activeName = ref('many')

// 级联选择器选中项变化，会触发这个函数
const handleChange = () => {
  getParamsData()
}

// tab 页签点击事件的处理函数
const handleTabChange = () => {
  getParamsData()
}

// 动态参数的数据
let manyTableData = ref([])

// 静态属性的数据
let onlyTableData = ref([])

// 当前所选中的三级分类的Id
let cateId = computed(() => {
  if (selectedCateKeys.value.length === 3) {
    return selectedCateKeys.value[2]
  }
  return null
})

// 获取参数的列表数据
const getParamsData = async () => {
  // 根据所选分类的Id，和当前所处的面板，获取对应的参数
  const { data: res } = await selectCategoriesArributes(cateId.value!, activeName.value)
  if (res.meta.status !== 200) {
    return ElMessage.error('获取参数列表失败！')
  }
  res.data.forEach((item: any) => {
    item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
    // 控制文本框的显示与隐藏
    item.inputVisible = ref(false)
    // 文本框中输入的值
    item.inputValue = ref('')
  })

  // 根据 tab 页的不同，将请求得到的数据分别存储到动态参数和静态属性中
  if (activeName.value === 'many') {
    manyTableData.value = res.data
  } else {
    onlyTableData.value = res.data
  }
}

// 如果按钮需要被禁用，则返回true，否则返回false
let isBtnDisabled = computed(() => {
  if (selectedCateKeys.value.length !== 3) {
    return true
  }
  return false
})

// 动态计算标题的文本
let titleText = computed(() => {
  if (activeName.value === 'many') {
    return '动态参数'
  }
  return '静态属性'
})

// 控制添加对话框的显示与隐藏
let addDialogVisible = ref(false)

// 添加表单的引用对象
const addFormRef = ref<FormInstance>()

// 添加参数的表单数据对象
let addForm = ref({
  attr_name: ''
})

// 添加表单的验证规则对象
const formRules = reactive<FormRules>({
  attr_name: [{ required: true, message: '请输入参数名称', trigger: 'blur' }]
})

// 添加表单对话框关闭时，重置添加表单
const addDialogClosed = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 点击按钮，添加参数
const addParams = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      // 验证通过
      const { data: res } = await insertCategoriesArributes(
        cateId.value!,
        addForm.value.attr_name,
        activeName.value
      )
      if (res.meta.status !== 201) {
        return ElMessage.error('添加参数失败！')
      }
      ElMessage.success('添加参数成功！')
      addDialogVisible.value = false
      getParamsData()
    } else {
      // 验证未通过，提示用户重新输入参数信息
      ElMessage.info('请重新输入参数信息！')
    }
  })
}

// 点击按钮，展示修改的对话框
const showEditDialog = async (attr_id: number) => {
  // 查询当前参数的信息
  const { data: res } = await selectCategoriesArributeById(cateId.value!, attr_id, activeName.value)
  if (res.meta.status !== 200) {
    return ElMessage.error('获取参数信息失败！')
  }
  editForm.value = res.data
  editDialogVisible.value = true
}

// 控制修改对话框的显示与隐藏
let editDialogVisible = ref(false)

// 修改表单的引用对象
const editFormRef = ref<FormInstance>()

// 添加参数的表单数据对象
let editForm = ref({
  attr_id: 0,
  attr_name: '',
  cat_id: 0,
  attr_sel: '',
  attr_write: '',
  attr_vals: ''
})

// 修改表单对话框关闭时，重置添加表单
const editDialogClosed = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 点击按钮，修改参数信息
const editParams = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      // 验证通过
      const { data: res } = await updateCategoriesArribute(
        cateId.value!,
        editForm.value.attr_id,
        editForm.value.attr_name,
        activeName.value
      )
      if (res.meta.status !== 200) {
        return ElMessage.error('修改参数名称失败！')
      }
      ElMessage.success('修改参数名称成功！')
      getParamsData()
      editDialogVisible.value = false
    } else {
      // 验证未通过，提示用户重新输入参数信息
      ElMessage.info('请重新输入参数信息！')
    }
  })
}

// 更据 id 删除对应的参数项
const removeParams = (id: number) => {
  ElMessageBox.confirm('此操作将永久删除该属性, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    // 点击确认按钮
    .then(async () => {
      const { data: res } = await deleteCategoriesArribute(cateId.value!, id)
      // 删除失败
      if (res.meta.status !== 200) return ElMessage.error('删除商品属性失败！')

      // 删除成功，弹出提示消息
      ElMessage.success('删除商品属性成功！')
      getParamsData()
    })
    // 点击取消按钮
    .catch(() => {
      ElMessage.info('取消删除商品属性')
    })
}

// 文本框失去焦点，或而下了 Enter 都会触发
const handleInputConfirm = () => {}

// 添加 tag 标签的 input 引用对象
const InputRef = ref<InstanceType<typeof ElInput>>()

// 点击按钮，展示文本输入框
const showInput = (row: any) => {
  row.inputVisible = true
  // 让文本框自动获取焦点
  // nextTick 方法的作用，就是当页面上元素被重新渲染之后，才会指定回调函数中的代码
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
</script>

<style scoped>
.cat_opt {
  margin-top: 15px;
}

.el-tag {
  margin: 10px;
}

.input-new-tag {
  margin: 10px;
  width: 120px;
}
</style>
