<template>
    <section class="flex flex-row-reverse h-14 w-auto sticky top-0 
           bg-gradient-to-r from-amber-600 to-amber-950
           dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700
           items-center shadow-md">
        <!-- Home (only if logged in) -->
        <router-link v-if="store.state.login !== 'Login'" to="/home" class="text-amber-100 dark:text-gray-300 mr-12">
            Home
        </router-link>

        <!-- Register (only if logged out) -->
        <router-link v-if="store.state.login === 'Login'" to="/register" class="text-amber-100 dark:text-gray-300 mr-6">
            Register
        </router-link>

        <!-- Login / Logout -->
        <router-link v-if="store.state.login === 'Login'" to="/login" class="text-amber-100 dark:text-gray-300 mr-5">
            Login
        </router-link>
        <button v-else @click="logout" class="text-amber-100 mr-5 dark:text-gray-300 cursor-pointer">
            Logout
        </button>

        <!-- Dark/Light Toggle -->
        <button @click="toggleTheme" class="px-4 py-2 rounded text-amber-100 dark:text-gray-300 mr-5 cursor-pointer 
             bg-amber-800/30 dark:bg-gray-600/40 hover:opacity-80 transition">
            Toggle {{ currentTheme === 'dark' ? 'Light' : 'Dark' }}
        </button>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

const router = useRouter()
const store = useStore()

const currentTheme = computed(() => store.getters.currentTheme)

const toggleTheme = () => {
    store.dispatch('toggleTheme')
}

const logout = () => {
    sessionStorage.clear()
    store.commit("LOGIN_TO_LOGOUT")
    router.replace('/login')
}
</script>