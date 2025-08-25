<template>
  <div class="p-6 dark:bg-gray-900 bg-gray-50 min-h-screen space-y-6 font-sans transition">
   
    <div class="flex flex-col md:flex-row items-center gap-4">
      <label class="text-lg font-semibold text-gray-950 dark:text-gray-100">Filter by project:</label>
      <select
        v-model="selectedProject"
        class="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none">
        <option value="">All Projects</option>
        <option v-for="project in projects" :key="project" :value="project">
          {{ project }}
        </option>
      </select>

      <input
        v-model="taskFilter"
        type="text"
        placeholder="Search tasks..."
        class="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none flex-1"
      />
    </div>
    <div v-for="project in filteredProjects" :key="project" class="space-y-3">
      <h2 class="text-2xl font-bold text-gray-950 dark:text-gray-100 border-b border-gray-400 dark:border-gray-600 pb-2">
        {{ project }}
      </h2>

      <div class="grid md:grid-cols-2 gap-4">
        <div
          v-for="task in filteredTasksByProject(project)"
          :key="task"
          class="p-4 rounded-lg shadow-md flex justify-between items-center bg-gradient-to-r from-cyan-400 to-indigo-500 dark:from-gray-800 dark:to-gray-900 text-gray-50 dark:text-gray-100 transition hover:scale-105"
        >
          <span class="truncate">{{ task }}</span>
          <button class="px-3 py-1 text-xs bg-white/20 dark:bg-gray-700/50 rounded hover:opacity-90 transition">
            Edit
          </button>
        </div>
      </div>

      <p v-if="filteredTasksByProject(project).length === 0" class="text-gray-400 dark:text-gray-400">
        No tasks found in this project.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useStore } from "vuex"

const store = useStore()
const projectsAndTasks = computed(() => store.getters.getProjectTasks || {})
const projects = computed(() => Object.keys(projectsAndTasks.value))

const selectedProject = ref("")
const taskFilter = ref("")

onMounted(async () => {
  await store.dispatch("getProjectTasks")
})

const filteredProjects = computed(() => {
  return selectedProject.value
    ? [selectedProject.value]
    : projects.value
})

const filteredTasksByProject = (project) => {
  const tasks = projectsAndTasks.value[project] || []
  if (!taskFilter.value) return tasks
  return tasks.filter((t) =>
    t.toLowerCase().includes(taskFilter.value.toLowerCase())
  )
}
</script>
