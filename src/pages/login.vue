<template>
    <section
        class="bg-[url('/image/bg.png')] bg-cover bg-center w-auto h-auto dark:bg-gray-900/90 transition min-h-screen">
        <div class="flex flex-col lg:flex-row h-full">

            <div class="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 order-2 lg:order-1">
                <div
                    class="w-full max-w-md p-6 sm:p-8 rounded-xl backdrop-blur-sm bg-amber-50/80 dark:bg-gray-800/80 shadow-xl">
                    <h2
                        class="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-amber-950 dark:text-gray-300">
                        Login Desk
                    </h2>

                    <div class="mb-4 sm:mb-6">
                        <label for="email" class="block mb-2 text-lg sm:text-xl text-amber-950 dark:text-gray-300">
                            Email
                        </label>
                        <input type="email" v-model="email" id="email" class="w-full border border-amber-300 dark:border-gray-600 rounded-lg px-4 py-2 sm:py-3 
                                   bg-amber-100/50 dark:bg-gray-700 text-amber-950 dark:text-gray-200
                                   focus:outline-none focus:ring-2 focus:ring-amber-500" required>
                    </div>

                    <div class="mb-6 sm:mb-8">
                        <label for="password" class="block mb-2 text-lg sm:text-xl text-amber-950 dark:text-gray-300">
                            Password
                        </label>
                        <input type="password" id="password" v-model="password" class="w-full border border-amber-300 dark:border-gray-600 rounded-lg px-4 py-2 sm:py-3 
                                   bg-amber-100/50 dark:bg-gray-700 text-amber-950 dark:text-gray-200
                                   focus:outline-none focus:ring-2 focus:ring-amber-500" required>
                    </div>

                    <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                        <button type="submit" @click.prevent="login" class="w-full sm:w-auto rounded-lg bg-gradient-to-r from-amber-600 to-amber-950 dark:from-amber-700 dark:to-amber-900 
                                   text-amber-100 px-4 sm:px-6 py-2 sm:py-3 text-lg sm:text-xl hover:opacity-90 transition-all shadow-md
                                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                            Login
                        </button>

                        <button type="button" @click="sendToRegister" class="w-full sm:w-auto rounded-lg bg-gradient-to-r from-amber-950 to-amber-600 dark:from-amber-900 dark:to-amber-700
                                   text-amber-100 px-4 sm:px-6 py-2 sm:py-3 text-lg sm:text-xl hover:opacity-90 transition-all shadow-md
                                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                            Register
                        </button>
                    </div>
                </div>
            </div>


            <div class="w-full lg:w-1/2 relative order-1 lg:order-2 hidden lg:block">
                <img src="/image/login.png" alt="Login Illustration" class="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-auto 
                           shadow-xl rounded-lg border-4 border-amber-100/20 dark:border-gray-700/20">
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
    const data = response.data;

    const details = {
        email: email.value,
        password: password.value,
    }

    if (data) {
        const user = data.find(
            e => e.email.toLowerCase() === details.email.toLowerCase() || e.name.toLowerCase() === details.email.toLowerCase()
        );
        if (!user) {
            alert("Invalid Email/Username and Password");
            return;
        }
        if (user.password !== details.password) {
            alert("Invalid Password");
            return;
        }

        localStorage.setItem('user', user);
        localStorage.setItem('session', 'session_started');
        router.push("/")
    }
}
</script>