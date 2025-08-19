<template>
    <section
        class="bg-[url('/image/bg.png')] bg-cover bg-center w-auto h-auto dark:bg-gray-900/90 transition min-h-screen">
        <div class="flex flex-col lg:flex-row h-full">

            <div class="w-full lg:w-1/2 relative order-1 hidden lg:block ">
                <img src="/image/register.png" alt="Registration Illustration" class="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-[600px]
                           shadow-[0_0_15px_rgba(101,67,33,0.7),0_0_40px_rgba(0,0,180,0.4)]  dark:shadow-[0_0_15px_rgba(255,200,0,0.4)] rounded-lg border-4 border-amber-100/20 dark:border-gray-700/20" />
            </div>


            <div class="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 order-2">
                <form @submit.prevent="register"
                    class="w-full max-w-md p-6 sm:p-8 rounded-xl backdrop-blur-sm bg-amber-50/80 dark:bg-gray-800/80 shadow-[0_0_15px_rgba(101,67,33,0.7),0_0_40px_rgba(0,0,180,0.4)]  dark:shadow-[0_0_15px_rgba(255,200,0,0.4)]">
                    <h2
                        class="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-amber-950 dark:text-gray-300">
                        Registration Desk
                    </h2>

                    <div class="space-y-4 sm:space-y-6">

                        <div>
                            <label for="email" class="block mb-2 text-lg sm:text-xl text-amber-950 dark:text-gray-300">
                                Email
                            </label>
                            <input type="email" id="email" class="w-full border border-amber-300 dark:border-gray-600 rounded-lg px-4 py-2 sm:py-3 
                                       bg-amber-100/50 dark:bg-gray-700 text-amber-950 dark:text-gray-200
                                       focus:outline-none focus:ring-2 focus:ring-amber-500" v-model="email"
                                required />
                        </div>


                        <div>
                            <label for="userName"
                                class="block mb-2 text-lg sm:text-xl text-amber-950 dark:text-gray-300">
                                User Name
                            </label>
                            <input type="text" id="userName" class="w-full border border-amber-300 dark:border-gray-600 rounded-lg px-4 py-2 sm:py-3 
                                       bg-amber-100/50 dark:bg-gray-700 text-amber-950 dark:text-gray-200
                                       focus:outline-none focus:ring-2 focus:ring-amber-500" v-model="userName"
                                required />
                        </div>


                        <div>
                            <label for="password"
                                class="block mb-2 text-lg sm:text-xl text-amber-950 dark:text-gray-300">
                                Password
                            </label>
                            <input type="password" id="password" class="w-full border border-amber-300 dark:border-gray-600 rounded-lg px-4 py-2 sm:py-3 
                                       bg-amber-100/50 dark:bg-gray-700 text-amber-950 dark:text-gray-200
                                       focus:outline-none focus:ring-2 focus:ring-amber-500" v-model="password"
                                required minlength="6" />
                        </div>


                        <div>
                            <label for="confirmPassword"
                                class="block mb-2 text-lg sm:text-xl text-amber-950 dark:text-gray-300">
                                Confirm Password
                            </label>
                            <input type="password" id="confirmPassword" class="w-full border border-amber-300 dark:border-gray-600 rounded-lg px-4 py-2 sm:py-3 
                                       bg-amber-100/50 dark:bg-gray-700 text-amber-950 dark:text-gray-200
                                       focus:outline-none focus:ring-2 focus:ring-amber-500" v-model="confirmPassword"
                                required minlength="6" />
                        </div>


                        <div>
                            <label class="block mb-2 text-lg sm:text-xl text-amber-950 dark:text-gray-300">
                                Admin:
                            </label>
                            <select v-model="admin" class="w-full border border-amber-300 dark:border-gray-600 rounded-lg px-4 py-2 sm:py-3 
                                       bg-amber-100/50 dark:bg-gray-700 text-amber-950 dark:text-gray-200
                                       focus:outline-none focus:ring-2 focus:ring-amber-500" required>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                        <button type="submit" class="w-full sm:w-auto rounded-lg bg-gradient-to-r from-amber-600 to-amber-950 dark:from-amber-700 dark:to-amber-900 
                                   text-amber-100 px-4 sm:px-6 py-2 sm:py-3 text-lg sm:text-xl cursor-pointer transition transform hover:scale-105 hover:bg-amber-700 active:scale-95 shadow-md
                                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                            Register
                        </button>

                        <button type="button" class="w-full sm:w-auto rounded-lg bg-gradient-to-r from-amber-950 to-amber-600 dark:from-amber-900 dark:to-amber-700
                                   text-amber-100 px-4 sm:px-6 py-2 sm:py-3 text-lg sm:text-xl cursor-pointer transition transform hover:scale-105 hover:bg-amber-700 active:scale-95 shadow-md
                                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                            @click="sendToLogin">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const userName = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')
const admin = ref('')

const sendToLogin = () => {
    router.push("/login")
}

const register = async () => {
    if (!userName.value || !email.value || !password.value) {
        alert("Please fill all required fields");
        return;
    } else if (confirmPassword.value !== password.value) {
        alert("Please make sure your password match with confirm passward");
        return 
    }
    const newUser = {
        name: userName.value,
        email: email.value,
        password: password.value,
        admin: admin.value
    }
    try {
        await store.dispatch("addUser", newUser);
        router.push("/home/admin")

        userName.value = "";
        email.value = "";
        password.value = "";
        confirmPassword.value = ""
        admin.value = ""
    } catch (error) {
        alert("Failed to add User");
    }
}
</script>