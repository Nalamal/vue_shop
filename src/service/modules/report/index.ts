import service from '@/service'

// 定义获取基于时间统计的折线图的请求
export const selectReports = () => {
  return service.get({
    url: 'reports/type/1'
  })
}
