import { defineStore } from 'pinia'
import { ref } from 'vue'

const useLoginStore = defineStore('loginStore', () => {
  const token = ref('')
  return { token }
})

export default useLoginStore
