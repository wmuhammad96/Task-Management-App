<template>
    <div class="grid grid-cols-4 bg-gradient-to-r from-amber-950 to-amber-600 font-semibold border border-gray-300">
        <div class="px-4 py-2 border border-amber-200 text-amber-100 text-center">User Name</div>
      <div class="px-4 py-2 border border-gray-300 text-amber-100 text-center">User Email </div>
      <div class="px-4 py-2 border border-gray-300 text-amber-100 text-center">User Id</div>
      <div class="px-4 py-2 border border-gray-300 text-amber-100 text-center" >Admin</div>
    </div>
        <div v-for="user in allUsers" :key="user.id" class="grid grid-cols-4 border border-amber-900 bg-amber-100 text-amber-900">
            <div class="px-4 py-2 border border-amber-900 text-center ">{{ user.name}}</div>
      <div class="px-4 py-2 border border-amber-900 text-center">{{ user.email }}</div>
      <div class="px-4 py-2 border border-amber-900 text-center">{{ user.id }}</div>
      <div class="px-4 py-2 border border-amber-900 text-center">{{ user.admin}}</div>
        </div>
</template>

<script setup>
import api, {endpoints} from "../../axios_api.js"
import {ref, onMounted} from "vue"
const allUsers = ref("")
onMounted(async()=>{
   const response = await api.get(endpoints.userData)
   allUsers.value = await response.data
})
</script>