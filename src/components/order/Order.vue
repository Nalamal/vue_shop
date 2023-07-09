<template>
  <!-- 面包屑导航区域 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>数据统计</el-breadcrumb-item>
    <el-breadcrumb-item>数据报表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 卡片视图 -->
  <el-card>
    <!-- 搜索区域 -->
    <el-row>
      <el-col :span="8">
        <el-input
          v-model="queryInfo.query"
          placeholder="请输入内容"
          clearable
          @clear="getOrderlist"
        >
          <template #append>
            <el-button :icon="Search" @click="getOrderlist" />
          </template>
        </el-input>
      </el-col>
    </el-row>

    <!-- 订单列表数据 -->
    <el-table :data="orderlist" border stripe>
      <el-table-column type="index" />
      <el-table-column prop="order_number" label="订单编号" width="210" />
      <el-table-column prop="order_price" label="订单价格" />
      <el-table-column label="是否付款">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
          <el-tag type="danger" v-else>未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" />
      <el-table-column prop="create_time" label="下单时间">
        <template #default="scope">
          {{ dayjs(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" :icon="Edit" size="small" @click="showEditOrderBox"></el-button>
        <el-button
          type="success"
          :icon="Location"
          size="small"
          @click="showLogisticsBox"
        ></el-button>
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

    <!-- 修改地址表单的对话框 -->
    <el-dialog
      v-model="addressVisible"
      title="修改地址"
      width="50%"
      @close="addressDialogClosed(addressFormRef)"
    >
      <el-form ref="addressFormRef" :model="addressForm" :rules="formRules" label-width="100px">
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader :options="cityData" v-model="addressForm.address1"> </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2" placeholder="请填写详细地址"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addressVisible = false">取消</el-button>
          <el-button type="primary" @click="addressVisible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 查看物流进度的对话框 -->
    <el-dialog v-model="logisticsVisible" title="物流进度" width="50%">
      <!-- 时间线 -->
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in logisticsInfo"
          :key="index"
          :timestamp="activity.time"
        >
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ArrowRight, Search, Edit, Location } from '@element-plus/icons-vue'
import { selectOrders, selectLogistics } from '@/service/request'
import { ElMessage, dayjs } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import cityData from '@/utils/citydata'

// 查询条件
const queryInfo = reactive({
  query: '',
  pagenum: 1,
  pagesize: 10
})

// 总条数
let total = ref(0)

// 定义 orderlist 的类型
interface IOrderlist {
  order_id: number
  user_id: number
  order_number: string
  order_price: number
  order_pay: string
  is_send: string
  trade_no: string
  order_fapiao_title: string
  order_fapiao_company: string
  order_fapiao_content: string
  consignee_addr: string
  pay_status: string
  create_time: number
  update_time: number
}

// 订单列表
let orderlist = ref<IOrderlist[]>([])

// 获取订单数据列表的方法
const getOrderlist = async () => {
  const { data: res } = await selectOrders(queryInfo)
  if (res.meta.status !== 200) return ElMessage.error('获取订单列表失败！')
  orderlist.value = res.data.goods
  total.value = res.data.total
}

// 发起获取订单列表的请求
getOrderlist()

// 监听 pagesize 改变的事件
const handleSizeChange = (newSize: number) => {
  queryInfo.pagesize = newSize
  getOrderlist()
}

// 监听 pagenum 改变的事件
const handleCurrentChange = (newPage: number) => {
  queryInfo.pagenum = newPage
  getOrderlist()
}

// 控制修改地址对话框的显示与影藏
let addressVisible = ref(false)

// 展示修改订单地址的对话框
const showEditOrderBox = () => {
  addressVisible.value = true
}

// 修改地址表单数据
let addressForm = ref({
  address1: [],
  address2: ''
})

// 修改地址表单的引用对象
const addressFormRef = ref<FormInstance>()

// 修改地址表单的验证规则
const formRules = reactive<FormRules>({
  address1: [{ required: true, message: '请选择省市区/县', trigger: 'blur' }],
  address2: [{ required: true, message: '请填写详细地址', trigger: 'blur' }]
})

// 添加表单对话框关闭时，重置添加表单
const addressDialogClosed = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 定义 logisticsInfo 的类型
interface ILogisticsInfo {
  time: string
  ftime: string
  context: string
  location: string
}

// 定义物流信息
let logisticsInfo = ref<ILogisticsInfo[]>([])

// 控制修改地址对话框的显示与影藏
let logisticsVisible = ref(false)

// 展示物流信息的对话框
const showLogisticsBox = async () => {
  const { data: res } = await selectLogistics()
  if (res.meta.status !== 200) ElMessage.error('获取物流信息失败！')
  logisticsInfo.value = res.data
  logisticsVisible.value = true
}
</script>

<style scoped>
:deep(.el-cascader) {
  width: 100%;
}
</style>
../utils/citydata
