<template>
    <div class = "p-4 sm:p-6 max-w-md mx-auto bg-amber-50 dark:bg-gray-800 rounded-lg shadow-md transition">
    <h1 class="text-4xl font-bold tracking-widest mb-4 text-amber-950 dark:text-gray-300">
        Create Project
    </h1>
    <form @submit.prevent="createProject" class="space-y-4">
        
         <div class="space-y-2">
                <label class="block text-sm sm:text-base text-amber-900 dark:text-gray-300 font-medium">
                    Project Name
                </label>
                <input 
                    v-model="projectName" 
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
                Add Project
            </button>
    </form>
    </div>
</template>
<script setup>
import api, { endpoints } from "../../axios_api.js";
import { ref } from "vue";

const projectName = ref("");

const createProject = async () => {
  if (!projectName.value) return;

  try {
    // 1. Get current projectTasks
    const res = await api.get(endpoints.projectTasks);
    const current = res.data;

    // 2. Merge new project
    const updated = {
      ...current,
      [projectName.value]: []
    };

    // 3. Replace whole object
    const updateRes = await api.put(endpoints.projectTasks, updated);

    console.log("Updated projectTasks:", updateRes.data);
    projectName.value = "";
  } catch (err) {
    console.error("Error adding project:", err);
  }
};


    
</script>