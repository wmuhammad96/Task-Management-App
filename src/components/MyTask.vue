<template>
  <div class="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 overflow-x-auto font-sans transition">
    <h1 class="text-4xl font-bold tracking-widest mb-4 text-gray-950 dark:text-gray-100">My Task</h1>

    
    <div class="min-w-[600px] grid grid-cols-6 font-semibold
                bg-gradient-to-r from-cyan-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 rounded-t-lg border border-gray-300 dark:border-gray-700">
      <div v-for="header in staticHeaders" :key="header"
           class="px-3 py-2 text-gray-50 dark:text-gray-100 text-center text-sm sm:text-base">
        {{ header }}
      </div>
      <div v-for="header in conditionalHeaders" :key="header"
           class="px-3 py-2 text-gray-50 dark:text-gray-100 text-center text-sm sm:text-base">
        {{ header }}
      </div>
    </div>

    
    <div class="min-w-[600px] rounded-b-lg overflow-hidden shadow-md">
      <div v-for="(task, index) in showTaskUponUser" :key="task.id"
           :class="['grid grid-cols-6 text-gray-950 dark:text-gray-200',
                    index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white/50 dark:bg-gray-800'
                    ]">

        
        <div class="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm sm:text-base truncate">
          {{ task.projects }}
        </div>

        
        <div class="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm sm:text-base truncate">
          {{ task.task }}
        </div>

        
        <div class="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm sm:text-base truncate flex items-center justify-center gap-2">
          <span :class="[
            'px-3 py-1 rounded-full text-xs font-semibold transition-all',
            task.status === 'Pending' ? 'bg-yellow-200 text-yellow-800 animate-pulse' :
            task.status === 'In Progress' ? 'bg-blue-200 text-blue-800' :
            'bg-green-200 text-green-800'
          ]">{{ task.status }}</span>
          <button @click="updateStatus(task)"
                  class="px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition">
            Edit
          </button>
        </div>

       
        <div class="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm sm:text-base truncate">
          {{ task.user }}
        </div>

       
        <div class="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">
          <button v-if="isAdmin" @click="openEditModal(task)"
                  class="rounded-lg p-1 text-blue-500 dark:text-blue-400 shadow hover:bg-white/20 dark:hover:bg-gray-700/30 transition transform hover:scale-105">
            <i :class="icon"></i>
          </button>
          <span v-else class="break-words max-w-[250px] px-2 py-1 text-sm sm:text-base">
            {{ task.priorities }}
          </span>
        </div>

       
        <div class="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">
          <button v-if="isAdmin" @click="deleteTask(task.id)"
                  class="rounded-lg p-1 text-red-500 dark:text-red-400 shadow hover:bg-white/20 dark:hover:bg-gray-700/30 transition transform hover:scale-105">
            <i :class="iconForDelete"></i>
          </button>
          <span v-else class="break-words max-w-[250px] px-2 py-1 text-sm sm:text-base">
            {{ task.description }}
          </span>
        </div>
      </div>
    </div>

    
    <teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div class="w-full max-w-md rounded-xl shadow-lg p-6 mx-2
                    bg-gradient-to-b from-cyan-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-gray-50 dark:text-gray-100">
          <h2 class="text-xl font-bold mb-4">Edit Task</h2>

          <label class="block text-sm font-semibold mb-1">Project</label>
          <select v-model="selectedProject"
                  class="border p-2 w-full mb-3 rounded-lg bg-white/20 dark:bg-gray-700/50 text-gray-950 dark:text-gray-200 border-gray-300 dark:border-gray-600">
            <option v-for="p in projectOptions" :key="p" :value="p">{{ p }}</option>
          </select>

          <label class="block text-sm font-semibold mb-1">Task</label>
          <select v-model="selectedTask"
                  class="border p-2 w-full mb-3 rounded-lg bg-white/20 dark:bg-gray-700/50 text-gray-950 dark:text-gray-200 border-gray-300 dark:border-gray-600">
            <option v-for="t in taskOptions" :key="t" :value="t">{{ t }}</option>
          </select>

          <label class="block text-sm font-semibold mb-1">Status</label>
          <select v-model="editData.status"
                  class="border p-2 w-full mb-3 rounded-lg bg-white/20 dark:bg-gray-700/50 text-gray-950 dark:text-gray-200 border-gray-300 dark:border-gray-600">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <label class="block text-sm font-semibold mb-1">User</label>
          <input v-model="editData.user"
                 class="border p-2 w-full mb-4 rounded-lg bg-white/20 dark:bg-gray-700/50 text-gray-950 dark:text-gray-200 border-gray-300 dark:border-gray-600" />

          <div class="flex justify-end gap-2">
            <button @click="closeModal"
                    class="px-4 py-2 rounded-lg bg-white/20 dark:bg-gray-700/50 text-gray-950 dark:text-gray-200 hover:opacity-90 transition">
              Cancel
            </button>
            <button @click="saveEdit"
                    class="px-4 py-2 rounded-lg bg-white/20 dark:bg-gray-700/50 text-gray-950 dark:text-gray-200 hover:opacity-90 transition">
              Save
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const getTask = computed(() => store.getters.getTask)
const projectTasks = computed(() => store.getters.getProjectTasks)
const projectOptions = computed(() => Object.keys(projectTasks.value || {}))

const icon = "pi pi-pencil"
const iconForDelete = "pi pi-trash"

const logedUser = computed(() => localStorage.getItem('user'))
const isAdmin = computed(() => JSON.parse(logedUser.value || 'null')?.admin === 'Yes')
const conditionalHeaders = computed(() => isAdmin.value ? ["Edit", "Delete"] : ["Priority", "Desc"])
const staticHeaders = ["Project", "Task", "Status", "User"]

const showModal = ref(false)
const editData = ref({})
const selectedProject = ref('')
const selectedTask = ref('')

const taskOptions = computed(() => selectedProject.value ? (projectTasks.value[selectedProject.value] || []) : [])

const showTaskUponUser = computed(() => getTask.value.filter(task => task.user === JSON.parse(logedUser.value)?.id))

watch(selectedProject, () => {
  if (!taskOptions.value.includes(selectedTask.value)) selectedTask.value = taskOptions.value[0] || ''
})

function openEditModal(task) {
  editData.value = { ...task }
  selectedProject.value = task.projects
  if (!projectTasks.value[selectedProject.value]) {
    const found = Object.entries(projectTasks.value).find(([_, tasks]) => tasks.includes(task.task))
    selectedProject.value = found ? found[0] : projectOptions.value[0] || ''
  }
  selectedTask.value = task.task
  if (!taskOptions.value.includes(selectedTask.value)) selectedTask.value = taskOptions.value[0] || ''
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function saveEdit() {
  const payload = { ...editData.value, projects: selectedProject.value, task: selectedTask.value }
  await store.dispatch('updateTaskOnServer', payload)
  closeModal()
}

function deleteTask(id) {
  store.dispatch('deleteTask', id)
}

async function updateStatus(task) {
  if (!task) return
  const newStatus = task.status === "Pending" ? "In Progress" : task.status === "In Progress" ? "Completed" : "Pending"
  await store.dispatch("updateStatusOnServer", { id: task.id, status: newStatus })
}

onMounted(async () => {
  await store.dispatch('getUser')
  await store.dispatch('getTask')
})
</script>
