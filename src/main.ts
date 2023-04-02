import { createApp } from 'vue'
import App from './App.vue'

// 引入全局样式表
import './assets/css/main.css'
// 引入 element-plus el-message 样式
import 'element-plus/theme-chalk/el-message.css'

import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
