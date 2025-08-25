<template>
  <div :class="drawerClasses"
       class="h-[calc(100vh-160px)] mt-7 overflow-hidden shadow-xl fixed rounded-r-2xl transition-all duration-500">
    
    <!-- Soft animated gradient overlay -->
    <div class="absolute inset-0 animate-gradient-slow bg-sky-600 opacity-50 pointer-events-none rounded-r-2xl blur-xl"></div>

    <ul class="relative flex flex-col gap-4 p-4">
      <li v-for="menu in drawerMenu" :key="menu.route"
          @click="navigate(menu.route)"
          :class="[
            'flex items-center justify-start gap-3 relative group rounded-xl px-3 py-3 cursor-pointer transition-all duration-300',
            isActive(menu.route)
              ? 'bg-white/10 dark:bg-gray-700 shadow-lg backdrop-blur-md text-cyan-200'
              : 'hover:bg-white/10 dark:hover:bg-gray-600/50'
          ]">

        <!-- Icon -->
        <i :class="menu.icon"
           class="text-white dark:text-gray-200 text-xl relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan-300"></i>

        <!-- Label -->
        <span :class="labelClasses"
              class="relative z-10 font-semibold text-gray-950 dark:text-gray-100 transition-all duration-300">
          {{ menu.title }}
        </span>

        <!-- Hover glow -->
        <span class="absolute inset-0 rounded-xl bg-white/10 dark:bg-gray-100/10 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-80 pointer-events-none"></span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const props = defineProps({
  handleNavigation: { type: Function, required: true }
})

const store = useStore()
const drawerType = computed(() => store.state.drawer)
const route = useRoute()

// user from localStorage
const user = computed(() => JSON.parse(localStorage.getItem('user')))

// All menus
const allMenu = reactive([
  { route: '/home/tasklist', title: 'Task List', icon: 'pi pi-list', admin: "No" },
  { route: '/home/users', title: 'Users', icon: 'pi pi-users', admin: "Yes" },
  { route: '/home/admin', title: 'Admin Panel', icon: 'pi pi-wrench', admin: "Yes" },
  { route: '/home/mytask', title: 'My Task', icon: 'pi pi-briefcase', admin: "No" },
  { route: '/home/CreateProject', title: 'Create Project', icon: 'pi pi-folder-plus', admin: "Yes" },
  { route: '/home/CreateTask', title: 'Create Task', icon: 'pi pi-file-plus', admin: "Yes" },
  { route: '/home/projects', title: 'Projects & Tasks', icon: 'pi pi-address-book', admin: "Yes" },
])

// Filter menu based on admin role
const drawerMenu = computed(() => {
  if (user.value?.admin === 'Yes') return allMenu
  return allMenu.filter(menu => menu.admin === 'No')
})

// Sidebar classes
const drawerClasses = computed(() => ({
  'w-[200px]': drawerType.value === 'desktop',
  'w-[60px]': drawerType.value === 'mini',
  'absolute left-0 z-50': drawerType.value === 'mobile',
  'translate-x-[-100%]': drawerType.value === 'mobileClose',
  'translate-x-0': drawerType.value === 'mobile',
  'transition-all duration-500 ease-in-out bg-white/5 dark:bg-gray-900/30 backdrop-blur-md': true
}))

// Label visibility
const labelClasses = computed(() => ({
  'hidden': drawerType.value === 'mini',
  'transition-opacity duration-300': true
}))

// Active route check
const isActive = (menuRoute) => route.path === menuRoute

// 🚀 Navigation + Auto-close on mobile
function navigate(path) {
  // navigate
  props.handleNavigation(path)

  // close drawer if mobile
  if (drawerType.value === 'mobile') {
    store.dispatch('setDrawer', 'mobileClose') // or commit if it's a mutation
  }
}
</script>

<style>
@keyframes gradient-slow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient-slow {
  background-size: 400% 400%;
  animation: gradient-slow 15s ease infinite;
}
</style>
