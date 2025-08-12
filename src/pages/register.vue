<template>
    <section class="bg-[url('/image/bg.png')] bg-cover bg-center w-auto h-auto ">
        <div class="flex h-screen ">
            <div class="w-1/2">
                <img src="/image/register.png" alt="registerImage"
                    class="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-[600px]" />
            </div>

            <form @submit.prevent="register" class="w-1/2 ">
                <div class="flex-col w-full h-full p-6">
                    <h2 class="text-4xl font-bold mb-6 text-center text-amber-950">Registration Desk </h2>

                    <div class="mb-6 text-amber-950 text-center text-2xl">
                        <label for="email">Email</label>
                        <input type="email" id="email"
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-amber-700"
                            v-model="email" required />
                    </div>

                    <div class="mb-6 text-amber-950 text-center text-2xl">
                        <label for="userName">User Name</label>
                        <input type="text" id="userName"
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-amber-700"
                            v-model="userName" required />
                        <p>{{ userName }}</p>
                    </div>

                    <div class="mb-6 text-amber-950 text-center text-2xl">
                        <label for="password">Password</label>
                        <input type="password" id="password"
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-amber-700"
                            v-model="password" required minlength="6" />
                    </div>

                    <div class="mb-6 text-amber-950 text-center text-2xl">
                        <label for="confirmPassword">Confirm password</label>
                        <input type="password" id="confirmPassword"
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-amber-700"
                            v-model="confirmPassword" required minlength="6" />
                    </div>

                    <div class="flex items-center justify-center">
                        <button type="submit"
                            class="rounded-lg bg-amber-950 text-amber-100 p-4 cursor-pointer text-2xl mr-1 w-3xs hover:opacity-80">
                            Register
                        </button>

                        <button type="button"
                            class="rounded-lg bg-amber-950 text-amber-100 p-4 cursor-pointer text-2xl hover:opacity-80"
                            @click="goToLogin">
                            Login
                        </button>
                    </div>

                    <!-- <p class="mt-4 text-center text-red-600" v-if="errorMessage">{{ errorMessage }}</p>
                    <p class="mt-4 text-center text-green-600" v-if="successMessage">{{ successMessage }}</p> -->
                </div>
            </form>
        </div>
    </section>
</template>
<script setup>
import { ref, } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const userName = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')
// const adminData = reactive({
//     userName: userName.value,
//     password: password.value,
//     confirmPassword: confirmPassword.value,
//     email: email.value,
// })
const register = async () => {
    if (!userName.value || !email.value || !password.value || !confirmPassword.value) {
        alert("Please fill all required fields");
        return;
    }
    const newAdmin = {
        name: userName.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
    }
    try {
        await store.dispatch("addAdmin", newAdmin);
        console.log(newAdmin)
        alert("Task added successfully!");
        router.push("/admin")

        userName.value = "";
        email.value = "";
        password.value = "";
        confirmPassword.value = ""
    } catch (error) {
        alert("Failed to add admin");
    }
}



// const register = async () => {
//     if (!userName.value || !email.value || !password.value || !confirmPassword.value) {
//         alert("Please fill all required fields");
//         return;
//     }

//     const newAdmin = {
//         userName : userName.value,
//         email : email.value,
//         password : password.value,
//         confirmPassword : confirmPassword.value
//     }
//     console.log(newAdmin,'newAdmin',userName.value);
//     try {
//         await axios.post("http://localhost:5000/admin", newAdmin)
//         console.log(newAdmin)
//         router.push("/admin")
//         // Clear form
//         userName.value = ''
//         email.value = ''
//         password.value = ''
//         confirmPassword = ''
//     } catch (error) {
//         alert("Failed to register");
//     }
// }

</script>
