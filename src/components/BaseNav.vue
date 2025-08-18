<template>
    <section class="flex flex-row justify-between px-5 h-14 w-full sticky top-0 
           bg-gradient-to-r from-amber-600 to-amber-950
           dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700
           items-center shadow-md z-50">

        <div class="flex flex-row items-center gap-5">
            <button v-if="session === 'session_started'" @click="handleDrawerToggle"
                class="text-amber-100 dark:text-gray-300 outline-none cursor-pointer">
                ☰
            </button>

            <h1 class="text-white font-bold tracking-widest">Task Management</h1>
        </div>


        <div :class="{ 'flex': mobileMenuOpen }" class="flex flex-row items-center gap-5">


            <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" :v-model="isDark" class="sr-only peer outline-none" @change="toggleTheme">
                <div
                    class="relative w-11 h-6 bg-gray-200 outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-black">
                </div>
                <span class="ms-3 text-sm font-medium text-gray-300">{{ currentTheme === 'dark' ? 'Dark' : 'Light'
                }}</span>
            </label>


            <button @click="logout" v-if="session === 'session_started'"
                class="text-amber-100 dark:text-gray-300 py-2 w-full text-center cursor-pointer">
                <i class="pi pi-power-off text-xl font-bold text-white"></i>
            </button>

        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, nextTick, onMounted, ref } from 'vue'


const router = useRouter()
const store = useStore()
const mobileMenuOpen = ref(false)
const isDark = ref(false)
const currentTheme = computed(() => store.getters.currentTheme)
const session = ref(localStorage.getItem('session'))


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
    localStorage.setItem('user', null);
    localStorage.setItem('session', 'session_ended');
    router.push('/login')
}

const updateTheme = () => {
    let theme = localStorage.getItem('theme');
    isDark.value = theme === 'dark'
}

onMounted(() => {
    updateTheme();
    window.addEventListener('storage', () => {
        session.value = localStorage.getItem('session')
    })
});

</script>