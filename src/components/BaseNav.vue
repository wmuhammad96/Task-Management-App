<template>
    <section class="flex flex-row justify-between px-5 h-14 w-full sticky top-0 
           bg-gradient-to-r from-amber-600 to-amber-950
           dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700
           items-center  z-50 backdrop-blur-md bg-white/10 border border-white/20 
             shadow-[0_0_15px_rgba(101,67,33,0.7),0_0_40px_rgba(0,0,180,0.4)]  dark:shadow-[0_0_15px_rgba(255,200,0,0.4)] 
            p-6 text-amber-200">

        <div class="flex flex-row items-center gap-5">
            <button v-if="session === 'session_started'" @click="handleDrawerToggle"
                class="text-amber-100 dark:text-gray-300 outline-none cursor-pointer transition transform hover:scale-105">
                ☰
            </button>

            <h1 class="text-amber-100 dark:text-gray-300 font-bold tracking-widest">
                <span>{{ displayedText }}</span>
                <span v-if="showCursor" class="animate-pulse">|</span>
            </h1>
        </div>
        


        <div :class="{ 'flex': mobileMenuOpen }" class="flex flex-row items-center gap-5">


            <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" :v-model="isDark" class="sr-only peer outline-none" @change="toggleTheme">
                <div
                    class="relative w-11 h-6 bg-amber-100 outline-none rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-100 dark:peer-checked:bg-gray-300">
                </div>
                <span class="ms-3 text-sm font-medium dark:text-gray-300 text-amber-100">{{ currentTheme === 'dark' ?
                    'Dark' : 'Light'
                }}</span>
            </label>


            <button @click="logout" v-if="session === 'session_started'"
                class="text-amber-100 dark:text-gray-300 py-2 w-full text-center cursor-pointer transition transform hover:scale-105">
                <i class="pi pi-power-off text-xl font-bold text-amber-100 dark:text-gray-300"></i>
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
    nextTick(() => {
        updateTheme();
    })
}

const handleDrawerToggle = () => {
    const drawer = store.state.drawer;
    console.log("work", drawer);
    if (drawer === 'mobile') {
        store.dispatch('setDrawer', 'mobileClose');
    }
    if (drawer === 'mobileClose') {
        store.dispatch('setDrawer', 'mobile');
    }
    if (drawer === 'desktop') {
        store.dispatch('setDrawer', 'mini');
    }
    if (drawer === 'mini') {
        store.dispatch('setDrawer', 'desktop');
    }
}


const logout = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {}
    const name = user.name || 'User'
    toast.success( `Goodbye, ${name}! 👋`)
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
        } else {
            clearInterval(typing);
        }
    }, 120);
});

onMounted(() => {
    updateTheme();
    window.addEventListener('storage', () => {
        session.value = localStorage.getItem('session')
    })
});

</script>
<style scoped>

@keyframes slideInFade {
    0% {
        opacity: 0;
        transform: translateX(50px);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>