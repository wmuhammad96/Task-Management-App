<template>
    <div class = "p-4 sm:p-6 max-w-md mx-auto bg-amber-50 dark:bg-gray-800 rounded-lg shadow-md transition">
    <h1 class="text-4xl font-bold tracking-widest mb-4 text-amber-950 dark:text-gray-300">
        Create Task
    </h1>
    <form @submit.prevent="addTasks" class="space-y-4">
         <div class="space-y-2">
                <label class="block text-sm sm:text-base text-amber-900 dark:text-gray-300 font-medium">
                    Projects:
                </label>
                <select 
                    v-model="projects" 
                    class="w-full border border-amber-300 dark:border-gray-600 p-2 sm:p-3 rounded-lg
                           bg-amber-100 dark:bg-gray-700 text-amber-900 dark:text-gray-200
                           focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                >
                    <option disabled value="">Select a project</option>
                    <option  v-for="key in taskKeys" :key="key" :value="key">{{key}}</option>
                </select>
            </div>
        
         <div class="space-y-2">
                <label class="block text-sm sm:text-base text-amber-900 dark:text-gray-300 font-medium">
                    Task Name
                </label>
                <input 
                    v-model="taskName" 
                    type="text" 
                    required 
                    class="w-full border border-amber-300 dark:border-gray-600 p-2 sm:p-3 rounded-lg
                           bg-amber-100 dark:bg-gray-700 text-amber-900 dark:text-gray-200
                           focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
            </div>
             <button 
                type="submit"
                class="mt-6 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-950 dark:from-amber-700 dark:to-amber-900 
                       text-amber-100 dark:text-gray-300 rounded-lg hover:opacity-90 transition shadow-md w-full
                       focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 cursor-pointer hover:scale-105"
            >
                Add Task
            </button>
    </form>
    </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import api, { endpoints } from "../../axios_api.js"

const store = useStore()

const projects = ref("")
const taskName = ref("")

const taskKeys = computed(() => {
  return Object.keys(store.getters.getProjectTasks || {})
})

onMounted(async () => {
  await store.dispatch("getProjectTasks")
})

const addTasks = async () => {
  if (!projects.value || !taskName.value) return

  try {
    // 1. Get current tasks for that project
    const res = await api.get(endpoints.projectTasks)
    const current = res.data

    const projectArray = current[projects.value] || []

    // 2. Add new task into selected project
    const updated = {
      ...current,
      [projects.value]: [...projectArray, taskName.value]
    }

    // 3. Save back with PUT (replace whole object)
    const updateRes = await api.put(endpoints.projectTasks, updated)

    console.log("Updated projectTasks:", updateRes.data)

    // 4. Update vuex store
    await store.dispatch("getProjectTasks")

    // 5. Reset form
    taskName.value = ""
    projects.value = ""

  } catch (err) {
    console.error("Error adding task:", err)
  }
}
</script>