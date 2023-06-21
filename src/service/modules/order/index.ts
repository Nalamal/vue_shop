import service from '@/service'

// 定义获取订单数据列表的请求
export const selectOrders = (params: object) => {
  return service.get({
    url: 'orders',
    params
  })
}

// 定义查询物流信息的请求
export const selectLogistics = () => {
  return service.get({
    url: 'kuaidi/1106975712662'
  })
}
