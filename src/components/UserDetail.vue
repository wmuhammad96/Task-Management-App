<template>
  <div class="bg-gray-50 dark:bg-gray-900 p-2 sm:p-4 transition overflow-x-auto">
    <div>
      <h2 class="text-4xl font-bold tracking-widest mb-4 text-gray-900 dark:text-gray-100">
        User List
      </h2>
    </div>

    <div class="min-w-[600px] grid grid-cols-4 rounded-t-lg border border-gray-300 dark:border-gray-700
                bg-gradient-to-r from-cyan-500 to-indigo-600 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700 
                font-semibold">
      <div class="px-3 py-2 sm:px-4 sm:py-2 border border-gray-200 dark:border-gray-500 text-white dark:text-gray-100 text-center text-sm sm:text-base">
        User Name
      </div>
      <div class="px-3 py-2 sm:px-4 sm:py-2 border border-gray-200 dark:border-gray-500 text-white dark:text-gray-100 text-center text-sm sm:text-base">
        User Email
      </div>
      <div class="px-3 py-2 sm:px-4 sm:py-2 border border-gray-200 dark:border-gray-500 text-white dark:text-gray-100 text-center text-sm sm:text-base">
        User ID
      </div>
      <div class="px-3 py-2 sm:px-4 sm:py-2 border border-gray-200 dark:border-gray-500 text-white dark:text-gray-100 text-center text-sm sm:text-base">
        Admin
      </div>
    </div>

    <div class="min-w-[600px] rounded-b-lg overflow-hidden shadow-md">
      <div v-for="user in allUsers" :key="user.id" 
           class="grid grid-cols-4 border border-gray-300 dark:border-gray-600 
                  bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
        <div class="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-500 text-center text-sm sm:text-base truncate">
          {{ user.name }}
        </div>
        <div class="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-500 text-center text-sm sm:text-base truncate">
          {{ user.email }}
        </div>
        <div class="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-500 text-center text-sm sm:text-base">
          {{ user.id }}
        </div>
        <div class="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-500 text-center text-sm sm:text-base">
          {{ user.admin }}
        </div>
      </div>
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
