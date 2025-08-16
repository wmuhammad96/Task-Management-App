import { createRouter, createWebHistory } from "vue-router"
import register from "@/pages/register.vue"
import Login from "@/pages/login.vue"
import home from "@/pages/home.vue"
import admin from "@/pages/admin.vue"
import TaskList from "./components/TaskList.vue"
import UserDetail from "./components/UserDetail.vue"
import MyTask from "./components/MyTask.vue"



const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/register", component: register },
        { path: "/login", component: Login },
        { path: "/", component: Login },
        {
            path: "/home", component: home, beforeEnter: (_to, _from, next) => {
                if (JSON.parse(sessionStorage.getItem('user'))) {
                    next()
                } else {
                    next('/login')
                }
            }, children: [
                { path: "admin", component: admin },
                { path: 'tasklist', component: TaskList },
                { path: 'users', component: UserDetail },
                { path: 'mytask', component: MyTask },
            ]
        },


    ]

})
router.beforeEach((to, _from, next) => {
  const isAuthenticated = sessionStorage.getItem('user')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.guestOnly && isAuthenticated) {
    next('/home')
  } else {
    next()
  }
})

export default router