<template>
  <div class="p-4 sm:p-6 bg-amber-50 dark:bg-gray-800 text-amber-900 dark:text-gray-200 transition overflow-x-auto">
   
    <div class="min-w-[600px] grid grid-cols-6 border border-gray-300 
             bg-gradient-to-r from-amber-950 to-amber-600 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700 
             font-semibold">
              <div v-for="header in staticHeaders" :key="header"
      class="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-500 
             text-amber-100 dark:text-gray-300 text-center text-sm sm:text-base">
      {{ header }}
    </div>

    <!-- Conditional Columns -->
    <div v-for="header in conditionalHeaders" :key="header"
      class="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-500 
             text-amber-100 dark:text-gray-300 text-center text-sm sm:text-base">
      {{ header }}
    </div>
      <!-- <div class="px-2 sm:px-4 py-2 border border-gray-300 text-amber-100 dark:text-gray-300 text-center text-sm sm:text-base">Project</div>
      <div class="px-2 sm:px-4 py-2 border border-gray-300 text-amber-100 dark:text-gray-300 text-center text-sm sm:text-base">Task</div>
      <div class="px-2 sm:px-4 py-2 border border-gray-300 text-amber-100 dark:text-gray-300 text-center text-sm sm:text-base">Status</div>
      <div class="px-2 sm:px-4 py-2 border border-gray-300 text-amber-100 dark:text-gray-300 text-center text-sm sm:text-base">User</div>
      <div class="px-2 sm:px-4 py-2 border border-gray-300 text-center text-amber-100 dark:text-gray-300 text-sm sm:text-base" v-if="isAdmin">Edit</div>
      <div class="px-2 sm:px-4 py-2 border border-gray-300 text-center text-amber-100 dark:text-gray-300 text-sm sm:text-base" v-else>Priority</div>
      <div class="px-2 sm:px-4 py-2 border border-gray-300 text-center text-amber-100 dark:text-gray-300 text-sm sm:text-base" v-if="isAdmin">Delete</div>
      <div class="px-2 sm:px-4 py-2 border border-gray-300 text-center text-amber-100 dark:text-gray-300 text-sm sm:text-base" v-else>Desc</div> -->
    </div>

   
    <div class="min-w-[600px]">
      <div v-for="task in showTaskUponUser" :key="task.id" class="grid grid-cols-6 border border-amber-200 dark:border-gray-600 
               bg-amber-100 dark:bg-gray-700 text-amber-900 dark:text-gray-200">
        <div class="px-2 md:break-words max-w-[250px] sm:px-4 py-2 border border-amber-300 dark:border-gray-600 text-center text-sm sm:text-base truncate">{{ task.projects }}</div>
        <div class="px-2 break-words max-w-[250px] sm:px-4 py-2 border  border-amber-300 dark:border-gray-600 text-center text-sm sm:text-base truncate">{{ task.task }}</div>
        <div class="px-2 break-words max-w-[250px] sm:px-4 py-2 border border-amber-300 dark:border-gray-600 text-center text-sm sm:text-base truncate">{{ task.status }}</div>
        <div class="px-2 sm:px-4 py-2 border border-amber-300 break-words max-w-[250px] dark:border-gray-600 text-center text-sm sm:text-base truncate">{{ task.user }}</div>

        <div class="px-2 sm:px-4 py-2 border border-amber-300 dark:border-gray-600 text-center">
          <button v-if="isAdmin" @click="openEditModal(task)"
            class="text-blue-500 dark:text-blue-400 hover:opacity-80 transition cursor-pointer text-sm sm:text-base">
            ✏️
          </button>
          <span v-else class="break-words max-w-[250px] px-2 py-2  text-center text-sm sm:text-base">{{ task.priorities }}</span>
        </div>

        <div class="px-2 sm:px-4 py-2 border border-amber-300 dark:border-gray-600 text-center">
          <button v-if="isAdmin" @click="deleteTask(task.id)"
            class="text-red-500 dark:text-red-400 hover:opacity-80 transition cursor-pointer text-sm sm:text-base">
            🗑️
          </button>
          <span v-else class="break-words max-w-[250px] px-2 py-2  text-center text-sm sm:text-base">{{ task.description }}</span>
        </div>
      </div>
    </div>

   
    <teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div
          class="w-full max-w-md rounded-xl shadow-lg p-6 mx-2
                 bg-gradient-to-b from-amber-600 to-amber-950 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
          <h2 class="text-xl text-amber-100 dark:text-gray-300 font-bold mb-4">Edit Task</h2>

          <label class="block text-sm text-amber-100 dark:text-gray-300 font-semibold mb-1">Project</label>
          <select v-model="selectedProject" class="border p-2 w-full mb-3 text-amber-100 dark:text-gray-300 
                   bg-amber-950/80 dark:bg-gray-700/80 border-amber-600 dark:border-gray-600">
            <option v-for="p in projectOptions" :key="p" :value="p">{{ p }}</option>
          </select>

          <label class="block text-sm text-amber-100 dark:text-gray-300 font-semibold mb-1">Task</label>
          <select v-model="selectedTask" class="border p-2 w-full mb-3 text-amber-100 dark:text-gray-300 
                   bg-amber-950/80 dark:bg-gray-700/80 border-amber-600 dark:border-gray-600">
            <option v-for="t in taskOptions" :key="t" :value="t">{{ t }}</option>
          </select>

          <label class="block text-sm text-amber-100 dark:text-gray-300 font-semibold mb-1">Status</label>
          <select v-model="editData.status" class="border p-2 w-full mb-3 text-amber-100 dark:text-gray-300 
                   bg-amber-950/80 dark:bg-gray-700/80 border-amber-600 dark:border-gray-600">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <label class="block text-sm text-amber-100 dark:text-gray-300 font-semibold mb-1">User</label>
          <input v-model="editData.user" class="border p-2 w-full mb-4 text-amber-100 dark:text-gray-300 
                   bg-amber-950/80 dark:bg-gray-700/80 border-amber-600 dark:border-gray-600" />

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


<script setup>
import { useStore } from 'vuex'
import { computed, ref, onMounted, watch } from 'vue'

const store = useStore()
const getTask = computed(() => store.getters.getTask)
const projectTasks = computed(() => store.getters.getProjectTasks)
const projectOptions = computed(() => Object.keys(projectTasks.value || {}))


const logedUser = computed(() => localStorage.getItem('user'))
const isAdmin = computed(() => JSON.parse(logedUser.value || 'null')?.admin === 'Yes')

const showTaskUponUser = computed(() => {
  return getTask.value.filter(task => task.user === JSON.parse(logedUser.value)?.id
  )
})

const showModal = ref(false)
const editData = ref({})
const selectedProject = ref('')
const selectedTask = ref('')
const staticHeaders = ["Project", "Task", "Status", "User"]
const conditionalHeaders = computed(() =>
  isAdmin.value ? ["Edit", "Delete"] : ["Priority", "Desc"]
)

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