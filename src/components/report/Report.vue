<template>
  <!-- 面包屑导航区域 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>数据统计</el-breadcrumb-item>
    <el-breadcrumb-item>数据报表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 卡片视图 -->
  <el-card>
    <!-- 2. 为ECharts准备一个具备大小（宽高）的DOM -->
    <div id="main" style="width: 750px; height: 400px"></div>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// 1. 导入 echarts
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import _ from 'lodash'
import { ArrowRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { selectReports } from '@/service/request'

// 需要合并的数据
const options: EChartsOption = {
  title: {
    text: '用户来源'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#E9EEF3'
      }
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      boundaryGap: false
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ]
}

// 此时，页面上的元素，已经被渲染完毕了！
onMounted(async () => {
  // 3. 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('main')!)

  const { data: res } = await selectReports()
  if (res.meta.status !== 200) {
    return ElMessage.error('获取折线数据失败！')
  }

  // 4. 准备数据和配置项
  const result = _.merge(res.data, options)

  // 5. 展示数据
  myChart.setOption(result)
})
</script>

<style scoped></style>
