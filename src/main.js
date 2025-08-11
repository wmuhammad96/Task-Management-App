import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"
import store from './store'
import BaseNav from './components/BaseNav.vue'

const app = createApp(App)

app.use(router)
app.use(store)
app.component("base-nav", BaseNav)

app.mount('#app')