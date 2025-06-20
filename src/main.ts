import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css' // 导入Element Plus css
import * as ElIconList from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import "@/assets/css/common.less"
import "@/assets/css/ele.less"
import "@/assets/fonts/iconfont.css";
import print from "vue3-print-nb";

const app = createApp(App)
// 注册icon
for (const [key, component] of Object.entries(ElIconList)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus)
app.use(print)
app.mount('#app')
