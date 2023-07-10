import { ref, type DefineComponent } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { getMenu } from '@/service/modules/menu'

// 定义 menulist 的类型
interface IMenulist {
  id?: number
  order?: number
  authName?: string
  path?: string
  children?: IMenulist[]
}

const useMenuStore = defineStore('menuStore', () => {
  // 定义左侧菜单数据
  const menulist = ref<IMenulist[]>([])

  // 定义获取左侧菜单栏的方法
  const getMenulist = async () => {
    // 发送获取左侧菜单的请求
    const res = await getMenu()
    // 请求失败
    if (res.meta.status !== 200) {
      return ElMessage.error('获取左侧菜单失败！')
    }
    // 请求成功，存储菜单数据
    menulist.value = res.data
  }

  return { menulist, getMenulist }
})

export default useMenuStore
