import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入全局样式表
import './assets/css/main.css'
//引入 Elmessage 的 css 样式文件
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App)
app.use(ElementPlus, { locale })
app.use(router)
app.mount('#app')
