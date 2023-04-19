<template>
  <!-- 面包屑导航区域 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 卡片视图 -->
  <el-card>
    <!-- 提示消息 -->
    <el-alert title="添加商品信息" type="info" center show-icon :closable="false" />

    <!-- 步骤条区域 -->
    <el-steps :space="200" :active="activeIndex" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>

    <!-- tab栏区域 -->
    <el-form
      :model="addForm"
      :rules="addFormRules"
      ref="addFormRef"
      label-width="100px"
      label-position="top"
    >
      <!-- @tab-click="tabClicked" -->
      <el-tabs
        v-model="activeIndex"
        tab-position="left"
        :before-leave="beforeTabLeave"
        @tab-change="tabChanged"
      >
        <el-tab-pane label="基本信息" :name="0">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="addForm.goods_price" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model="addForm.goods_weight" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model="addForm.goods_number" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
              v-model="addForm.goods_cat"
              :options="catelist"
              :props="cascaderProps"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" :name="1">
          <!-- 渲染表单的Item项 -->
          <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
            <!-- 复选框组 -->
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox
                v-for="(cb, i) in item.attr_vals"
                :key="i"
                :label="cb"
                border
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性" :name="2">
          <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片" :name="3">
          <!-- action 表示图片要上传到的后台API地址 -->
          <el-upload
            :action="uploadURL"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
            :headers="headerObj"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" :name="4">
          <!-- 富文本编辑器组件 -->

          <!-- 添加商品的按钮 -->
          <el-button type="primary" class="btnAdd">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>

  <!-- 图片预览的对话框 -->
  <el-dialog v-model="previewVisible" title="图片预览" width="50%">
    <img src="previewPath" alt="" class="previewImg" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { selectGoodsCategories, selectCategoriesArributes } from '@/service/request'

// tab 栏激活的索引号
let activeIndex = ref(0)

// 定义 addForm 的类型
interface IAddForm {
  goods_name: string
  goods_price: number
  goods_weight: number
  goods_number: number
  goods_cat: number[]
  pics: []
  goods_introduce: string
  attrs: []
}

// 添加商品的表单数据对象
let addForm = ref<IAddForm>({
  goods_name: '',
  goods_price: 0,
  goods_weight: 0,
  goods_number: 0,
  // 商品所属的分类数组
  goods_cat: [],
  // 图片的数组
  pics: [],
  goods_introduce: '',
  attrs: []
})

// 添加商品表单所引用的对象
const addFormRef = ref<FormInstance>()

// 定义添加商品的表单规则
const addFormRules = reactive<FormRules>({
  goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
  goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
  goods_number: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
  goods_cat: [{ required: true, message: '请选择商品分类', trigger: 'blur' }]
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

// 级联选择器选中项变化，会触发这个函数
const handleChange = () => {}

const beforeTabLeave = (activeName: number, oldActiveName: number) => {
  // console.log('即将离开的标签页名字是：' + oldActiveName)
  // console.log('即将进入的标签页名字是：' + activeName)
  // return false
  if (oldActiveName === 0 && addForm.value.goods_cat.length !== 3) {
    ElMessage.error('请先选择商品分类！')
    return false
  }
}

// 定义参数 tableData 类型
interface ITableData {
  attr_id: number
  attr_name: string
  cat_id: number
  attr_sel: string
  attr_write: string
  attr_vals: string
}

// 动态参数列表数据
let manyTableData = ref<ITableData[]>([])
// 静态参数列表数据
let onlyTableData = ref<ITableData[]>([])

// 所选三级分类的 id
let cateId = computed(() => {
  if (addForm.value.goods_cat.length === 3) {
    return addForm.value.goods_cat[2]
  }
  return null
})

// 切换 tab 栏
const tabChanged = async () => {
  // 如果访问的是动态参数面板
  if (activeIndex.value === 1) {
    const { data: res } = await selectCategoriesArributes(cateId.value!, 'many')

    if (res.meta.status !== 200) {
      return ElMessage.error('获取动态参数列表失败！')
    }
    res.data.forEach((item: any) => {
      item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
    })
    manyTableData.value = res.data
    // 如果访问的是静态参数面板
  } else if (activeIndex.value === 2) {
    const { data: res } = await selectCategoriesArributes(cateId.value!, 'only')

    if (res.meta.status !== 200) {
      return ElMessage.error('获取静态属性列表失败！')
    }

    onlyTableData.value = res.data
  }
}

// 上传图片的URL地址
const uploadURL = 'https://lianghj.top:8888/api/private/v1/upload'

// 上传图片预览途径
const previewPath = ref('')

// 控制预览对话框的显示与隐藏
const previewVisible = ref(false)

// 处理图片预览效果
const handleRemove: UploadProps['onRemove'] = (uploadFile) => {
  previewPath.value = uploadFile.response.data.url
  previewVisible.value = true
}

// 处理移除图片的操作
const handlePreview: UploadProps['onPreview'] = (file) => {
  // 1. 获取将要删除的图片的临时路径
  const filePath = file.response.data.tmp_path
  // 2. 从 pics 数组中，找到这个图片对饮的索引值
  const i = addForm.value.pics.findIndex((x) => x.pic === filePath)
  // 3. 调用数组的 splice 方法，把图片信息对象，从 pics 数组中移除
  addForm.value.pics.splice(i, 1)
}

// 图片上传组件的 headers 请求头对象
const headerObj = ref({
  Authorization: window.sessionStorage.getItem('token')
})

// 监听图片上传成功的事件
const handleSuccess = (response: any) => {
  // 1. 拼接得到一个图片信息对象
  const picInfo = { pic: response.data.tmp_path }
  // 2. 将图片信息对象，push 到 pics 数组中
  addForm.value.pics.push(picInfo)
}
</script>

<style scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}

.previewImg {
  width: 100%;
}
</style>
