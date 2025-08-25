import { createRouter, createWebHistory } from "vue-router"
import register from "@/pages/register.vue"
import Login from "@/pages/login.vue"
import home from "@/pages/home.vue"
import admin from "@/pages/admin.vue"
import TaskList from "@/components/TaskList.vue"
import UserDetail from "@/components/UserDetail.vue"
import MyTask from "@/components/MyTask.vue"
import CreateTask from "@/components/CreateTask.vue"
import CreateProject from "@/components/CreateProject.vue"
import DisplayProjectAndTask from "@/components/DisplayProjectAndTask.vue"


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/register", component: register, name: "register" },
    { path: "/login", component: Login, name: "Login" },
    { path: "/", redirect: '/home' },
    {
      path: "/home",
      component: home,
      redirect: '/home/tasklist',
      beforeEnter: (_to, _from, next) => {
        let session = localStorage.getItem('session')
        if (session === 'session_started') {
          next()
        } else {
          next('/login')
        }
      },
      children: [
        { path: 'tasklist', component: TaskList },
        { path: 'users', component: UserDetail },
        { path: "admin", component: admin },
        { path: 'mytask', component: MyTask },
        { path: 'CreateProject', component: CreateProject },
        { path: 'CreateTask', component: CreateTask },
        { path: 'projects', component: DisplayProjectAndTask },
      ]
    },
  ]
})

export default router