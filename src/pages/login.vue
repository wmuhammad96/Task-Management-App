<template>
    <section class="bg-[url('/image/bg.png')] bg-cover bg-center w-auto h-auto dark:bg-gray-900/90 transition">
        <div class="flex h-screen">
            <!-- Login Form -->
            <form @submit.prevent="login" class="w-1/2 flex items-center justify-center">
                <div class="flex-col w-full max-w-md p-8 rounded-xl backdrop-blur-sm bg-amber-50/80 dark:bg-gray-800/80 shadow-xl">
                    <h2 class="text-4xl font-bold mb-8 text-center text-amber-950 dark:text-gray-300">
                        Login Desk
                    </h2>
                    
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-xl text-amber-950 dark:text-gray-300">
                            Email
                        </label>
                        <input 
                            type="email" 
                            v-model="email" 
                            id="email"
                            class="w-full border border-amber-300 dark:border-gray-600 rounded-lg px-4 py-3 
                                   bg-amber-100/50 dark:bg-gray-700 text-amber-950 dark:text-gray-200
                                   focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                        >
                    </div>
                    
                    <div class="mb-8">
                        <label for="password" class="block mb-2 text-xl text-amber-950 dark:text-gray-300">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            v-model="password"
                            class="w-full border border-amber-300 dark:border-gray-600 rounded-lg px-4 py-3 
                                   bg-amber-100/50 dark:bg-gray-700 text-amber-950 dark:text-gray-200
                                   focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                        >
                    </div>

                    <div class="flex items-center justify-center gap-4">
                        <button
                            type="submit"
                            class="rounded-lg bg-gradient-to-r from-amber-600 to-amber-950 dark:from-amber-700 dark:to-amber-900 
                                   text-amber-100 px-6 py-3 text-xl hover:opacity-90 transition-all shadow-md
                                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                        >
                            Login
                        </button>
                        
                        <button
                            type="button" 
                            @click="sendToRegister"
                            class="rounded-lg bg-gradient-to-r from-amber-950 to-amber-600 dark:from-amber-900 dark:to-amber-700
                                   text-amber-100 px-6 py-3 text-xl hover:opacity-90 transition-all shadow-md
                                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </form>

            <!-- Image Section -->
            <div class="w-1/2 relative">
                <img 
                    src="/image/login.png" 
                    alt="Login Illustration"
                    class="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-auto 
                           shadow-xl rounded-lg border-4 border-amber-100/20 dark:border-gray-700/20"
                >
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import api, { endpoints } from "../../axios_api"
import { useStore } from "vuex"

const store = useStore()
const router = useRouter()
const email = ref("")
const password = ref("")

const sendToRegister = () => {
    router.push("/register")
}

const login = async () => {
    const response = await api.get(endpoints.userData)
    for (let user of response.data) {
        if (email.value === user.email && password.value === user.password && user.admin === "Yes") {
            sessionStorage.setItem('user', JSON.stringify(user))
            store.commit('LOGIN_TO_LOGOUT')
            return router.push("/home/admin")
        } else if (email.value === user.email && password.value === user.password && user.admin === "No") {
            sessionStorage.setItem('user', JSON.stringify(user))
            store.commit('LOGIN_TO_LOGOUT')
            return router.push("/home/tasklist")
        }
    }
    alert("Invalid credentials") // Added feedback for failed login
}
</script>