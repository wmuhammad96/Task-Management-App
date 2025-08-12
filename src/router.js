import { createRouter, createWebHistory } from "vue-router"
import register from "@/pages/register.vue"
import Login from "@/pages/login.vue"
import home from "@/pages/home.vue"
import admin from "@/pages/admin.vue"



const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/register", component: register },
        { path: "/login", component: Login },
        { path: "/", component: home },
        { path: "/admin", component: admin },

    ]

})

export default router