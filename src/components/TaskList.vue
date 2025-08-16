<template>
  <div class="p-6 bg-amber-50 dark:bg-gray-800 transition">
    <!-- Header Row -->
    <div class="grid grid-cols-6 border border-amber-200 dark:border-gray-600
             bg-gradient-to-r from-amber-950 to-amber-600 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700 
             font-semibold">
      <div class="px-4 py-2 border border-gray-300 dark:border-gray-500 text-amber-100 dark:text-gray-300 text-center">
        Project Name</div>
      <div class="px-4 py-2 border border-gray-300 dark:border-gray-500 text-amber-100 dark:text-gray-300 text-center">
        Task Name</div>
      <div class="px-4 py-2 border border-gray-300 dark:border-gray-500 text-amber-100 dark:text-gray-300 text-center">
        Status</div>
      <div class="px-4 py-2 border border-gray-300 dark:border-gray-500 text-amber-100 dark:text-gray-300 text-center">
        User Id</div>
      <div class="px-4 py-2 border border-gray-300 dark:border-gray-500 text-center text-amber-100 dark:text-gray-300"
        v-if="isAdmin">Edit</div>
      <div class="px-4 py-2 border border-gray-300 dark:border-gray-500 text-center text-amber-100 dark:text-gray-300"
        v-else>Priorities</div>
      <div class="px-4 py-2 border border-gray-300 dark:border-gray-500 text-center text-amber-100 dark:text-gray-300"
        v-if="isAdmin">Delete</div>
      <div class="px-4 py-2 border border-gray-300 dark:border-gray-500 text-center text-amber-100 dark:text-gray-300"
        v-else>Description</div>
    </div>

    <!-- Task Rows -->
    <div v-for="task in getTask" :key="task.id" class="grid grid-cols-6 border border-amber-100 dark:border-gray-600 
             bg-amber-100 dark:bg-gray-700 text-amber-800 dark:text-gray-200">
      <div class="px-4 py-2 border border-amber-800 dark:border-gray-500 text-center">{{ task.projects }}</div>
      <div class="px-4 py-2 border border-amber-800 dark:border-gray-500 text-center">{{ task.task }}</div>
      <div class="px-4 py-2 border border-amber-800 dark:border-gray-500 text-center">{{ task.status }}</div>
      <div class="px-4 py-2 border border-amber-800 dark:border-gray-500 text-center">{{ task.user }}</div>

      <div class="px-4 py-2 border border-amber-800 dark:border-gray-500 text-center">
        <button v-if="isAdmin" @click="openEditModal(task)"
          class="text-blue-500 dark:text-blue-400 hover:opacity-80 transition cursor-pointer">
          ✏️
        </button>
        <span v-else>{{ task.priorities }}</span>
      </div>

      <div class="px-4 py-2 border border-amber-800 dark:border-gray-500 text-center">
        <button v-if="isAdmin" @click="deleteTask(task.id)"
          class="text-red-500 dark:text-red-400 hover:opacity-80 transition cursor-pointer">
          🗑️
        </button>
        <span v-else>{{ task.description }}</span>
      </div>
    </div>

    <!-- Edit Modal -->
    <teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div
          class="w-full max-w-md rounded-xl shadow-lg p-6 
                 bg-gradient-to-b from-amber-600 to-amber-950 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
          <h2 class="text-xl text-amber-100 dark:text-gray-300 font-bold mb-4">Edit Task</h2>

          <label class="block text-sm text-amber-100 dark:text-gray-300 font-semibold mb-1">Project</label>
          <select v-model="selectedProject" class="border p-2 w-full mb-3 text-amber-100 dark:text-gray-300 
                   bg-amber-950 dark:bg-gray-700 border-amber-500 dark:border-gray-600">
            <option v-for="p in projectOptions" :key="p" :value="p">{{ p }}</option>
          </select>

          <label class="block text-sm text-amber-100 dark:text-gray-300 font-semibold mb-1">Task</label>
          <select v-model="selectedTask" class="border p-2 w-full mb-3 text-amber-100 dark:text-gray-300 
                   bg-amber-950 dark:bg-gray-700 border-amber-500 dark:border-gray-600">
            <option v-for="t in taskOptions" :key="t" :value="t">{{ t }}</option>
          </select>

          <label class="block text-sm text-amber-100 dark:text-gray-300 font-semibold mb-1">Status</label>
          <select v-model="editData.status" class="border p-2 w-full mb-3 text-amber-100 dark:text-gray-300 
                   bg-amber-950 dark:bg-gray-700 border-amber-500 dark:border-gray-600">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <label class="block text-sm text-amber-100 dark:text-gray-300 font-semibold mb-1">User</label>
          <input v-model="editData.user" class="border p-2 w-full mb-4 text-amber-100 dark:text-gray-300 
                   bg-amber-950 dark:bg-gray-700 border-amber-500 dark:border-gray-600" />

          <div class="flex justify-end gap-2">
            <button @click="closeModal" class="px-4 py-2 rounded bg-amber-100 dark:bg-gray-300 text-amber-950 dark:text-gray-900 
                     hover:opacity-80 transition cursor-pointer">
              Cancel
            </button>
            <button @click="saveEdit" class="px-4 py-2 rounded bg-amber-100 dark:bg-gray-300 text-amber-950 dark:text-gray-900 
                     hover:opacity-80 transition cursor-pointer">
              Save
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<!-- Script section remains unchanged -->
<script setup>
import { useStore } from 'vuex'
import { computed, ref, onMounted, watch } from 'vue'

const store = useStore()

const getTask = computed(() => store.getters.getTask)
const projectTasks = computed(() => store.getters.getProjectTasks)
const projectOptions = computed(() => Object.keys(projectTasks.value || {}))

const logedUser = computed(() => sessionStorage.getItem('user'))
const isAdmin = computed(() => JSON.parse(logedUser.value || 'null')?.admin === 'Yes')

const showModal = ref(false)
const editData = ref({})
const selectedProject = ref('')
const selectedTask = ref('')

const taskOptions = computed(() => {
  return selectedProject.value ? (projectTasks.value[selectedProject.value] || []) : []
})

watch(selectedProject, () => {
  if (!taskOptions.value.includes(selectedTask.value)) {
    selectedTask.value = taskOptions.value[0] || ''
  }
})

function openEditModal(task) {
  editData.value = { ...task }
  selectedProject.value = task.projects

  if (!projectTasks.value[selectedProject.value]) {
    const found = Object.entries(projectTasks.value).find(([_, tasks]) => tasks.includes(task.task))
    selectedProject.value = found ? found[0] : projectOptions.value[0] || ''
  }

  selectedTask.value = task.task

  if (!taskOptions.value.includes(selectedTask.value)) {
    selectedTask.value = taskOptions.value[0] || ''
  }

  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function saveEdit() {
  const payload = {
    ...editData.value,
    projects: selectedProject.value,
    task: selectedTask.value
  }
  await store.dispatch('updateTaskOnServer', payload)
  closeModal()
}

function deleteTask(id) {
  store.dispatch('deleteTask', id)
}

onMounted(async () => {
  await store.dispatch('getUser')
  await store.dispatch('getTask')
})
</script>