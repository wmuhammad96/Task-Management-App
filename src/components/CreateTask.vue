<template>
  <div class="p-6 max-w-md mx-auto bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg transition space-y-6">
    <h1 class="text-4xl font-bold tracking-widest mb-4 text-gray-950 dark:text-gray-100">
      Create Task
    </h1>

    <form @submit.prevent="addTasks" class="space-y-4">
      
      <div class="space-y-2">
        <label class="block text-sm sm:text-base text-gray-900 dark:text-gray-200 font-medium">
          Projects:
        </label>
        <select 
          v-model="projects" 
          class="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-lg
                 bg-white dark:bg-gray-800 text-gray-950 dark:text-gray-100
                 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
          required
        >
          <option disabled value="">Select a project</option>
          <option v-for="key in taskKeys" :key="key" :value="key">{{ key }}</option>
        </select>
      </div>

     
      <div class="space-y-2">
        <label class="block text-sm sm:text-base text-gray-900 dark:text-gray-200 font-medium">
          Task Name
        </label>
        <input 
          v-model="taskName" 
          type="text" 
          placeholder="Enter task name"
          required 
          class="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-lg
                 bg-white dark:bg-gray-800 text-gray-950 dark:text-gray-100
                 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
        />
      </div>

      
      <button 
        type="submit"
        class="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 dark:from-gray-700 dark:to-gray-900
               text-white dark:text-gray-100 rounded-lg hover:opacity-90 transition shadow-md w-full
               focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 cursor-pointer hover:scale-105"
      >
        Add Task
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import api, { endpoints } from "../../axios_api.js"
import { useToast } from "../composables/useToast.js"

const store = useStore()
const toast = useToast()

const projects = ref("")
const taskName = ref("")

const taskKeys = computed(() => Object.keys(store.getters.getProjectTasks || {}))

onMounted(async () => {
  await store.dispatch("getProjectTasks")
})

const addTasks = async () => {
  if (!projects.value || !taskName.value) return

  try {
    const res = await api.get(endpoints.projectTasks)
    const current = res.data
    const projectArray = current[projects.value] || []

    const updated = { 
      ...current, 
      [projects.value]: [...projectArray, taskName.value] 
    }

    await api.put(endpoints.projectTasks, updated)
    await store.dispatch("getProjectTasks")
    toast.success("Task added successfully")

    taskName.value = ""
    projects.value = ""
  } catch (err) {
    console.error("Error adding task:", err)
    toast.error("Failed to add task")
  }
}
</script>
