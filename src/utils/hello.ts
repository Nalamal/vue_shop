import { computed } from 'vue'
import { dayjs } from 'element-plus'

// 获取当前时间
const hour = dayjs().hour()

// 定义消息
const hello = computed(() => {
  if (hour > 0 && hour < 11) {
    return '早上好, Admin！'
  }
  if (hour >= 11 && hour < 13) {
    return '中午好, Admin！'
  }
  if (hour >= 13 && hour < 18) {
    return '下午好, Admin！'
  }
  if (hour > 18) {
    return '晚上好, Admin！'
  }
})

export default hello
