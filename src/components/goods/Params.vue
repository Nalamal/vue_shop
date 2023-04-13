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
    <el-tabs v-model="activeName" class="demo-tabs">
      <!-- 添加动态参数 -->
      <el-tab-pane label="动态参数" name="many">
        <el-row>
          <el-col>
            <el-button type="primary">添加参数</el-button>
          </el-col>
        </el-row>
        <!-- 动态参数表格 -->
        <el-table :data="manyTableData" border stripe>
          <!-- 展开行 -->
          <el-table-column type="expand">
            <template #default="scope">
              <!-- 循环渲染Tag标签 -->
              <!--  @close="handleClose(i, scope.row)" -->
              <el-tag v-for="(item, i) in scope.row.attr_vals" :key="i" closable>{{ item }}</el-tag>
              <!-- 输入的文本框 -->
              <!--  @keyup.enter="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)" -->
              <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="saveTagInput"
                size="small"
              >
              </el-input>
              <!-- 添加按钮 -->
              <!--  @click="showInput(scope.row)" -->
              <el-button v-else class="button-new-tag" size="small">+ New Tag</el-button>
            </template>
          </el-table-column>
          <!-- 索引列 -->
          <el-table-column type="index"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="静态参数" name="only">静态参数</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { selectGoodsCategories, selectCategoriesArributes } from '@/service/request'
import { ElMessage } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'

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
  // 可以选定
  checkStrictly: true,
  // 绑定级联选择器的数据源
  label: 'cat_name',
  value: 'cat_id',
  children: 'children'
})

// 级联选择框的双向绑定到的数组
let selectedCateKeys = ref<number[]>([])

// 激活的标签页
let activeName = ref('many')

// 定义参数 tableData 类型
// interface ITableData {
//   attr_id: number
//   attr_name: string
//   attr_sel: string
//   attr_vals: string
//   attr_write: string
//   cat_id: number
//   delete_time: null
//   inputValue: string
//   inputVisible: boolean
// }

// 动态参数列表数据
let manyTableData = ref([])
// 静态属性列表
let onlyTableData = ref([])

// 级联选择器选中项变化，会触发这个函数
const handleChange = () => {
  getParamsData()
}

// 获取参数列表的请求
const getParamsData = async () => {
  // 证明选中的不是三级分类
  if (selectedCateKeys.value.length !== 3) {
    selectedCateKeys.value = []
    manyTableData.value = []
    onlyTableData.value = []
    return
  }

  // 所选三级分类的 id
  let cateId = computed(() => {
    if (selectedCateKeys.value.length === 3) {
      return selectedCateKeys.value[2]
    }
    return null
  })

  // 根据所选分类的Id，和当前所处的面板，获取对应的参数
  const { data: res } = await selectCategoriesArributes(cateId.value!, activeName.value)

  if (res.meta.status !== 200) {
    return ElMessage.error('获取参数列表失败！')
  }

  res.data.forEach((item: any) => {
    item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
    // 控制文本框的显示与隐藏
    item.inputVisible = false
    // 文本框中输入的值
    item.inputValue = ''
  })
  if (activeName.value === 'many') {
    manyTableData.value = res.data
  } else {
    onlyTableData.value = res.data
  }
}

// const handleClose = () => {}
</script>

<style scoped>
.cat_opt {
  margin-top: 15px;
}
</style>
