// 导入service模块
import service from '@/service'

// 定义获取左侧菜单的请求
export const getMenu = () => {
  return service.get({
    url: 'menus'
  })
}
