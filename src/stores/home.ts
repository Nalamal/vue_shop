import { defineStore } from 'pinia'
import { reactive } from 'vue'

// 定义 menulist 的类型
interface IMenulist {
  id?: number
  authName?: string
  path?: string
  children?: IMenulist[]
}

const useHomeStore = defineStore('homeStore', () => {
  // 定义左侧菜单数据
  const menulist = reactive<IMenulist>({})
  return { menulist }
})

export default useHomeStore
