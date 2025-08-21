<template>
  <div :class="drawerClasses"
       class="relative h-[calc(100vh-108px)] overflow-hidden
              bg-gradient-to-b from-amber-700 via-amber-900 to-amber-700
              dark:from-gray-500 dark:via-gray-900 dark:to-gray-500
              shadow-xl rounded-r-xl">

    
    <div class="absolute inset-0 animate-gradient-slow opacity-20 pointer-events-none rounded-r-xl"></div>

    <ul class="list-none flex flex-col items-start justify-center p-4 gap-6">
      <li v-for="menu in drawerMenu" :key="menu.route"
          @click="handleNavigation(menu.route)"
          class="flex items-center gap-3 cursor-pointer relative group">
        
        
        <i :class="menu.icon" 
           class="text-amber-300 dark:text-gray-200 text-lg relative z-10 transition-transform duration-500 group-hover:scale-125 group-hover:text-amber-400 group-hover:drop-shadow-[0_0_10px_rgba(255,191,0,0.8)]"></i>
        
    
        <span :class="labelClasses" class="relative z-10 font-semibold transition-all duration-500
              group-hover:text-amber-400 group-hover:drop-shadow-[0_0_8px_rgba(255,191,0,0.8)]">
          {{ menu.title }}
        </span>

        
        <span class="absolute left-0 top-0 w-full h-full bg-amber-400/10 rounded-xl blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-80"></span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';

defineProps({
  handleNavigation: { type: Function, required: true }
})

const store = useStore()
const drawerType = computed(() => store.state.drawer)

const drawerMenu = reactive([
  { route: '/home/tasklist', title: 'Task List', icon: 'pi pi-list' },
  { route: '/home/users', title: 'Users', icon: 'pi pi-users' },
  { route: '/home/admin', title: 'Admin Panel', icon: 'pi pi-wrench' },
  { route: '/home/mytask', title: 'My Task', icon: 'pi pi-briefcase' },
  { route: '/home/CreateProject', title: 'Create Project', icon: 'pi pi-folder-plus' },
  { route: '/home/CreateTask', title: 'Create Task', icon: 'pi pi-file-plus' },
])

const drawerClasses = computed(() => {
  return {
    'w-[200px] transition-all duration-500 ease-in-out': drawerType.value === 'desktop',
    'w-[60px] transition-all duration-500 ease-in-out': drawerType.value === 'mini',
    'absolute left-0 z-50 transition-transform duration-500 ease-in-out': drawerType.value === 'mobile',
    'translate-x-[-100%]': drawerType.value === 'mobileClose',
    'translate-x-0': drawerType.value === 'mobile',
  }
})

const labelClasses = computed(() => {
  return {
    'hidden': drawerType.value === 'mini',
    'transition-opacity duration-300': true
  }
})
</script>

<style>
/* Slow animated gradient for futuristic glow */
@keyframes gradient-slow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient-slow {
  background: linear-gradient(45deg, #fbbf24, #f59e0b, #d97706, #fbbf24);
  background-size: 400% 400%;
  animation: gradient-slow 10s ease infinite;
}
</style>
