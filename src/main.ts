import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 引入路由
import router from './router'
// 引入全局样式表
import './assets/css/main.css'

//引入 element-plus 及其相关样式文件
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App)
const pinia = createPinia()
app.use(ElementPlus, { locale })
app.use(router)
app.use(pinia)
app.mount('#app')
