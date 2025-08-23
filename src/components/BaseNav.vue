<template>
  <section class="flex justify-between items-center px-6 h-16 w-full sticky top-0
         bg-gradient-to-r from-cyan-500 to-indigo-600
         dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700
         backdrop-blur-md border-b border-white/20 shadow-md
         font-sans text-gray-950 dark:text-gray-100 z-50">

    
    <div class="flex items-center gap-4">
      <button v-if="session === 'session_started'" @click="handleDrawerToggle"
        class="text-white dark:text-gray-100 p-2 rounded-md hover:bg-white/10 transition">
        ☰
      </button>

      <h1 class="text-lg font-bold tracking-wide flex items-center gap-1">
        <span>{{ displayedText }}</span>
        <span v-if="showCursor" class="animate-pulse">|</span>
      </h1>
    </div>    
    <div class="flex items-center gap-4">
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="isDark" class="sr-only peer" @change="toggleTheme">
        <div
          class="relative w-12 h-6 bg-gray-300 rounded-full peer dark:bg-gray-600 
                 peer-checked:bg-cyan-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 
                 after:transition-all peer-checked:after:translate-x-full">
        </div>
        <span class="ml-3 text-sm font-medium">{{ currentTheme === 'dark' ? 'Dark' : 'Light' }}</span>
      </label>
      <button @click="logout" v-if="session === 'session_started'"
        class="flex items-center justify-center text-white dark:text-gray-100 py-2 px-3 rounded-lg 
               bg-white/10 dark:bg-gray-700 hover:bg-white/20 dark:hover:bg-gray-600 transition">
        <i class="pi pi-power-off text-lg font-bold"></i>
      </button>

    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useToast } from '../composables/useToast.js'

const toast = useToast()
const router = useRouter()
const store = useStore()
const mobileMenuOpen = ref(false)
const isDark = ref(false)
const currentTheme = computed(() => store.getters.currentTheme)
const session = computed(() => store.state.session)
const fullText = "Task Management";
const displayedText = ref("");
const showCursor = ref(true);

const toggleTheme = () => {
    store.dispatch('toggleTheme')
    nextTick(() => { updateTheme(); })
}
const handleDrawerToggle = () => {
    const drawer = store.state.drawer;
    if (drawer === 'mobile') store.dispatch('setDrawer', 'mobileClose');
    if (drawer === 'mobileClose') store.dispatch('setDrawer', 'mobile');
    if (drawer === 'desktop') store.dispatch('setDrawer', 'mini');
    if (drawer === 'mini') store.dispatch('setDrawer', 'desktop');
}

const logout = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {}
    const name = user.name || 'User'
    toast.success(`Goodbye, ${name}! 👋`)
    localStorage.setItem('user', null);
    store.commit('setSession', 'session_ended')
    router.push('/login')
}

const updateTheme = () => {
    let theme = localStorage.getItem('theme');
    isDark.value = theme === 'dark'
}

onMounted(() => {
    let i = 0;
    const typing = setInterval(() => {
        if (i < fullText.length) {
            displayedText.value += fullText[i];
            i++;
        } else clearInterval(typing);
    }, 120);

    updateTheme();
    window.addEventListener('storage', () => {
        session.value = localStorage.getItem('session')
    })
});
</script>

<style scoped>
@keyframes slideInFade {
  0% { opacity: 0; transform: translateX(50px); }
  100% { opacity: 1; transform: translateX(0); }
}
</style>

