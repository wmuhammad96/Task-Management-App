<template>
  <div class="bg-amber-50 dark:bg-gray-800 p-2 transition">
    <!-- Header Row -->
    <div class="grid grid-cols-4 border border-gray-300 dark:border-gray-600
             bg-gradient-to-r from-amber-950 to-amber-600 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700 
             font-semibold">
      <div class="px-4 py-2 border border-amber-200 dark:border-gray-500 text-amber-100 dark:text-gray-300 text-center">
        User Name</div>
      <div class="px-4 py-2 border border-gray-300 dark:border-gray-500 text-amber-100 dark:text-gray-300 text-center">
        User Email</div>
      <div class="px-4 py-2 border border-gray-300 dark:border-gray-500 text-amber-100 dark:text-gray-300 text-center">
        User Id</div>
      <div class="px-4 py-2 border border-gray-300 dark:border-gray-500 text-amber-100 dark:text-gray-300 text-center">
        Admin</div>
    </div>

    <!-- User Rows -->
    <div v-for="user in allUsers" :key="user.id" class="grid grid-cols-4 border border-amber-900 dark:border-gray-600 
             bg-amber-100 dark:bg-gray-700 text-amber-900 dark:text-gray-200">
      <div class="px-4 py-2 border border-amber-900 dark:border-gray-500 text-center">{{ user.name }}</div>
      <div class="px-4 py-2 border border-amber-900 dark:border-gray-500 text-center">{{ user.email }}</div>
      <div class="px-4 py-2 border border-amber-900 dark:border-gray-500 text-center">{{ user.id }}</div>
      <div class="px-4 py-2 border border-amber-900 dark:border-gray-500 text-center">{{ user.admin }}</div>
    </div>
  </div>
</template>

<script setup>
import api, { endpoints } from "../../axios_api.js"
import { ref, onMounted } from "vue"

const allUsers = ref([])

onMounted(async () => {
  const response = await api.get(endpoints.userData)
  allUsers.value = await response.data
})
</script>