import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/main.scss'

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.css'
import CommonFunction from './assets/ts/common'

const common = CommonFunction();

common.init()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app') 