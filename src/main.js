import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import router from "@/router"
import store from '@/store'
import BaseNav from '@/components/BaseNav.vue'
import PrimeVue from 'primevue/config';


const app = createApp(App)

app.use(PrimeVue)
app.use(router)
app.use(store)
store.dispatch('initializeTheme')
app.component("base-nav", BaseNav)


app.mount('#app')