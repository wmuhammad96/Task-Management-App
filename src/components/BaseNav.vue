<template>
    <section class="flex flex-row-reverse h-14 w-auto sticky top-0 bg-gradient-to-r from-amber-600 to-amber-950 text-shadow-amber-100 items-center ">
        <div>
            <router-link to="/" class="text-amber-100 mr-12">
                Home
            </router-link>
        </div>
        <div>
            <router-link to="/register" class="text-amber-100 mr-6">
                Register
            </router-link>
        </div>
        <div>
            <router-link to="/login" class="text-amber-100 mr-5">
                login 
            </router-link>
        </div>
    </section>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore()
const data = store.state.data

</script>