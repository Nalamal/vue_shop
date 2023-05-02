<template>
  <!-- 面包屑导航区域 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 卡片视图区域 -->
  <el-card>
    <!-- 添加搜索区域 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <!-- 搜索区域 -->
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          clearable
          @clear="getGoodsList"
        >
          <template #append>
            <el-button :icon="Search" @click="getGoodsList" />
            <!-- @click="getUserList" -->
          </template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="goAddpage">添加商品</el-button>
      </el-col>
    </el-row>

    <!-- 商品列表区域 -->
    <el-table :data="goodslist" border stripe>
      <el-table-column type="index" />
      <el-table-column prop="goods_name" label="商品名称" width="600" />
      <el-table-column prop="goods_price" label="商品价格(元)" />
      <el-table-column prop="goods_weight" label="商品重量" />
      <el-table-column prop="add_time" label="创建时间" width="200">
        <template #default="scope">
          {{ dayjs(scope.row.add_time).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" :icon="Edit" size="small"></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            size="small"
            @click="removeGoodById(scope.row.goods_id)"
          ></el-button>
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
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ArrowRight, Search, Edit, Delete } from '@element-plus/icons-vue'
import { selectGoods, deleteGood } from '@/service/request'
// import { ElMessage, ElMessageBox,  } from 'element-plus'
import { dayjs } from 'element-plus'
import router from '@/router'

// 点击添加商品按钮，跳转到添加 Add.vue
const goAddpage = () => {
  router.push('/add')
}

// 获取表单列表的参数对象
let queryInfo = reactive({
  query: '',
  // 当前的页数
  pagenum: 1,
  // 当前每页显示多少条数据
  pagesize: 10
})

// 数据总条数
let total = ref(0)

// 定义 goodslist 的类型
interface IGoodslist {
  goods_id: number
  goods_name: string
  goods_price: number
  goods_number: number
  goods_weight: number
  goods_state: boolean
  add_time: number
  upd_time: number
  hot_mumber: number
  is_promote: boolean
}

// 商品列表
let goodslist = ref<IGoodslist[]>([])

// 根据分页获取对应的商品列表
const getGoodsList = async () => {
  const { data: res } = await selectGoods(queryInfo)
  // 获取商品失败
  if (res.meta.status !== 200) {
    return ElMessage.error('获取商品列表失败！')
  }
  // 将请求后返回的数据赋值到定义的表单的内容中
  goodslist.value = res.data.goods
  total.value = res.data.total
}

// 调用 getGoodsList() 方法，获取商品列表
getGoodsList()

// 监听 pagesize 改变的事件
const handleSizeChange = (newSize: number) => {
  queryInfo.pagesize = newSize
  getGoodsList()
}

// 监听 pagenum 改变的事件
const handleCurrentChange = (newPage: number) => {
  queryInfo.pagenum = newPage
  getGoodsList()
}

// 点击删除按钮，删除对应商品
const removeGoodById = async (id: number) => {
  ElMessageBox.confirm('此操作将永久删除该商品, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    // 点击确认按钮
    .then(async () => {
      const { data: res } = await deleteGood(id)
      // 删除失败
      if (res.meta.status !== 200) return ElMessage.error('删除商品失败！')
      // 删除成功，弹出提示消息
      ElMessage.success('删除商品成功！')
      getGoodsList()
    })
    // 点击取消按钮
    .catch(() => {
      ElMessage.info('取消删除该商品')
    })
}
</script>

<style scoped></style>
