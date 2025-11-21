import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/main.scss'

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.css'

// 다크모드 설정
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('darkMode')
} else {
  document.documentElement.classList.remove('darkMode')
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app') 