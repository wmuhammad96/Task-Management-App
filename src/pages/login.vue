<template>
    <section class="relative w-full h-screen bg-amber-100 dark:bg-gray-900 overflow-hidden">
        <!-- Animated background -->
        <canvas ref="bgCanvas" class="absolute top-0 left-0 w-full h-full"></canvas>

        <div class="relative z-10 flex flex-col lg:flex-row h-full items-center justify-center px-4 sm:px-8">
            
            <div v-if="!showWelcome" class="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
                <div
                    class="w-full max-w-md p-6 sm:p-8 rounded-xl  dark:bg-gray-800/80 z-50 backdrop-blur-md bg-white/10 border border-white/20 
            shadow-[0_0_15px_rgba(101,67,33,0.7),0_0_40px_rgba(0,0,180,0.4)]  dark:shadow-[0_0_15px_rgba(255,200,0,0.4)] ">
                    <h2
                        class="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-amber-950 dark:text-gray-300">
                        Login Desk
                    </h2>

                    <div class="mb-4 sm:mb-6">
                        <label for="email"
                            class="block mb-2 text-lg sm:text-xl text-amber-950 dark:text-gray-300">Email</label>
                        <input type="email" v-model="email" id="email" class="w-full border border-amber-300 dark:border-gray-600 rounded-lg px-4 py-2 sm:py-3
                     bg-amber-100/50 dark:bg-gray-700 text-amber-950 dark:text-gray-200
                     focus:outline-none focus:ring-2 focus:ring-amber-500" required>
                    </div>

                    <div class="mb-6 sm:mb-8">
                        <label for="password"
                            class="block mb-2 text-lg sm:text-xl text-amber-950 dark:text-gray-300">Password</label>
                        <input type="password" v-model="password" id="password" class="w-full border border-amber-300 dark:border-gray-600 rounded-lg px-4 py-2 sm:py-3
                     bg-amber-100/50 dark:bg-gray-700 text-amber-950 dark:text-gray-200
                     focus:outline-none focus:ring-2 focus:ring-amber-500" required>
                    </div>

                    <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                        <button type="submit" @click.prevent="login" class="w-full sm:w-auto rounded-lg bg-gradient-to-r from-amber-600 to-amber-950 dark:from-amber-700 dark:to-amber-900
                     text-amber-100 px-4 sm:px-6 py-2 sm:py-3 text-lg sm:text-xl cursor-pointer shadow-md
                     focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition transform
                     hover:scale-105 hover:bg-amber-700 active:scale-95">
                            Login
                        </button>

                        <button type="button" @click="sendToRegister" class="w-full sm:w-auto rounded-lg bg-gradient-to-r from-amber-950 to-amber-600 dark:from-amber-900 dark:to-amber-700
                     text-amber-100 px-4 sm:px-6 py-2 sm:py-3 text-lg sm:text-xl cursor-pointer transition transform
                     hover:scale-105 hover:bg-amber-700 active:scale-95 shadow-md focus:outline-none focus:ring-2
                     focus:ring-amber-500 focus:ring-offset-2">
                            Register
                        </button>
                    </div>
                </div>
            </div>

            <!-- Welcome screen -->
            <transition name="fade">
                <div v-if="showWelcome"
                    class="w-full lg:w-1/2 text-center text-amber-950 dark:text-gray-300 flex flex-col items-center justify-center animate-fadeIn">
                    <h1 class="text-5xl font-bold mb-6 animate-bounce">Welcome, {{ userName }}!</h1>
                    <p class="text-lg text-amber-950 dark:text-gray-300 mb-6">Redirecting to your dashboard...</p>
                </div>
            </transition>

            
            <div class="w-full lg:w-1/2 relative hidden lg:block ">
                <img src="/image/login.png" alt="Login Illustration"
                    class="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-auto   z-50 backdrop-blur-md bg-white/10 border border-white/20 
            rounded-full shadow-[0_0_15px_rgba(101,67,33,0.7),0_0_40px_rgba(0,0,180,0.4)]  dark:shadow-[0_0_15px_rgba(255,200,0,0.4)] ">
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import api, { endpoints } from "../../axios_api"
import { useStore } from "vuex"

const store = useStore()
const router = useRouter()

const email = ref("")
const password = ref("")
const showWelcome = ref(false)
const userName = ref("")

const sendToRegister = () => router.push("/register")

const login = async () => {
    const response = await api.get(endpoints.userData)
    const data = response.data

    const user = data.find(
        e => e.email.toLowerCase() === email.value.toLowerCase() || e.name.toLowerCase() === email.value.toLowerCase()
    )

    if (!user) return alert("Invalid Email/Username or Password")
    if (user.password !== password.value) return alert("Invalid Password")

    localStorage.setItem("user", JSON.stringify(user))
    store.commit("setSession", "session_started")
    userName.value = user.name
    showWelcome.value = true

    // Delay before redirect
    setTimeout(() => {
        router.push("/")
    }, 2000)
}

// Animated background using canvas
const bgCanvas = ref(null)
onMounted(() => {
    const canvas = bgCanvas.value
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const dots = []
    for (let i = 0; i < 80; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            radius: Math.random() * 2 + 1
        })
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "rgba(101, 67, 33, 0.7)"
        ctx.strokeStyle = "rgba(101, 67, 33, 0.2)"
        for (let i = 0; i < dots.length; i++) {
            const d = dots[i]
            d.x += d.vx
            d.y += d.vy

            if (d.x < 0 || d.x > canvas.width) d.vx *= -1
            if (d.y < 0 || d.y > canvas.height) d.vy *= -1

            ctx.beginPath()
            ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2)
            ctx.fill()
        }
        requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.animate-fadeIn {
    animation: fadeIn 1s ease forwards;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
