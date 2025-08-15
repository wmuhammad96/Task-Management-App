<template>
    <section
        class="flex flex-row-reverse h-14 w-auto sticky top-0 bg-gradient-to-r from-amber-600 to-amber-950 text-shadow-amber-100 items-center ">
        <div>
            <router-link to="/home" class="text-amber-100 mr-12" v-if="store.state.login !== 'Login'">
                Home
            </router-link>
        </div>
        <div>
            <router-link to="/register" class="text-amber-100 mr-6" v-if="store.state.login === 'Login'">
                Register
            </router-link>
        </div>
        <div>
            <router-link to="/login" class="text-amber-100 mr-5" v-if="store.state.login === 'Login'">
                Login
            </router-link>
            <button v-else class="text-amber-100 mr-5 cursor-pointer" @click="logout">
                Logout
            </button>
            
        </div>
        <div>
             <button
    @click="toggleTheme"
    class="px-4 py-2 rounded text-amber-100 mr-5 cursor-pointer"
  >
    Switch to {{ currentTheme === 'light' ? 'Dark' : 'Light' }} Mode
  </button>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';
const router = useRouter()
const store = useStore()

const currentTheme = computed(() => store.getters.currentTheme)
const toggleTheme = () => {
  store.dispatch('toggleTheme')
}

const logout = ()=>{
    sessionStorage.clear()
    store.commit("LOGIN_TO_LOGOUT")
    router.replace('/login')
}


</script>