<template>
    <section class="bg-[url('/image/bg.png')] bg-cover bg-center w-auto h-auto ">
        <div class="flex h-screen ">

            <form @submit.prevent="login" class="w-1/2 ">

                <div class=" flex-col  w-full h-full  p-6  ">
                    <h2 class="text-4xl font-bold mb-6 text-center text-amber-950">Login Desk </h2>
                    <div class=" mb-6 text-amber-950 text-center text-2xl">
                        <label for="email">Email</label>
                        <input type="email" v-model="email" id="email"
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500">
                    </div>
                    <div class="  mb-6 text-amber-950 text-center text-2xl">
                        <label for="password">Password</label>
                        <input type="password" id="password" v-model="password"
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500">
                    </div>

                    <div class="flex items-center justify-center ">
                        <button
                            class=" rounded-lg bg-amber-950 text-amber-100 p-4 cursor-pointer text-2xl mr-1 w-3xs hover:opacity-80"
                            type="submit">

                            Login
                        </button>
                        <button
                            class=" rounded-lg bg-amber-950 text-amber-100 p-4 cursor-pointer text-2xl hover:opacity-80">
                            register
                        </button>
                    </div>
                </div>

            </form>
            <div class="w-1/2">
                <img src="/image/login.png" alt="registerImage"
                    class="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-auto">

            </div>
        </div>

    </section>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import api, { endpoints } from "../../axios_api"
const router = useRouter()
const email = ref("")
const password = ref("")

const login = async () => {
    const response = await api.get(endpoints.userData)
    for (let user of response.data) {
        if (email.value === user.email && password.value === user.password && user.admin === "Yes") {
            sessionStorage.setItem('user' ,JSON.stringify(user))
            return router.push("/admin")
        } else if (email.value === user.email && password.value === user.password && user.admin === "No") {
            sessionStorage.setItem('user' ,JSON.stringify(user))
            return router.push("/")
        }
    }
}

</script>