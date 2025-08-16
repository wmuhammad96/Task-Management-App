<template>
    <section class="flex flex-col md:flex-row-reverse h-auto md:h-14 w-full sticky top-0 
           bg-gradient-to-r from-amber-600 to-amber-950
           dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700
           items-center shadow-md z-50">

        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-4 text-amber-100 dark:text-gray-300">
            ☰
        </button>


        <div :class="{ 'flex': mobileMenuOpen, 'hidden': !mobileMenuOpen }"
            class="w-full md:w-auto md:flex flex-col md:flex-row items-center py-2 md:py-0">

            <router-link v-if="store.state.login !== 'Login'" to="/home"
                class="text-amber-100 dark:text-gray-300 px-4 py-2 md:py-0 md:mr-12 w-full md:w-auto text-center">
                Home
            </router-link>


            <router-link v-if="store.state.login === 'Login'" to="/register"
                class="text-amber-100 dark:text-gray-300 px-4 py-2 md:py-0 md:mr-6 w-full md:w-auto text-center">
                Register
            </router-link>


            <router-link v-if="store.state.login === 'Login'" to="/login"
                class="text-amber-100 dark:text-gray-300 px-4 py-2 md:py-0 md:mr-5 w-full md:w-auto text-center">
                Login
            </router-link>
            <button v-else @click="logout"
                class="text-amber-100 dark:text-gray-300 px-4 py-2 md:py-0 md:mr-5 w-full md:w-auto text-center cursor-pointer">
                Logout
            </button>


            <button @click="toggleTheme"
                class="px-4 py-2 rounded text-amber-100 dark:text-gray-300 md:mr-5 cursor-pointer 
                           bg-amber-800/30 dark:bg-gray-600/40 hover:opacity-80 transition w-full md:w-auto text-center">
                Toggle {{ currentTheme === 'dark' ? 'Light' : 'Dark' }}
            </button>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'

const router = useRouter()
const store = useStore()
const mobileMenuOpen = ref(false)

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