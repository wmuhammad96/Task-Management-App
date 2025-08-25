<template>
  <div class="p-4 sm:p-6 max-w-md mx-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md transition">
    <h2 class="text-4xl font-bold tracking-widest mb-4 text-gray-900 dark:text-gray-100">
      Assign Task
    </h2>

    <form @submit.prevent="addNewTask" class="space-y-4">
      <div class="space-y-2">
        <label class="block text-sm sm:text-base text-gray-800 dark:text-gray-100 font-medium">
          Users:
        </label>
        <select 
          v-model="user" 
          class="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-lg
                 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200
                 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          required
        >
          <option disabled value="">Select User</option>
          <option v-for="user in usersToList" :key="user.id" :value="user.name">
            {{ user.name }}
          </option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="block text-sm sm:text-base text-gray-800 dark:text-gray-100 font-medium">
          Description:
        </label>
        <input 
          v-model="description" 
          type="text" 
          required 
          class="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-lg
                 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200
                 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm sm:text-base text-gray-800 dark:text-gray-100 font-medium">
          Projects:
        </label>
        <select 
          v-model="projects" 
          class="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-lg
                 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200
                 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          required
        >
          <option disabled value="">Select a project</option>
          <option v-for="key in taskKeys" :key="key" :value="key">{{ key }}</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="block text-sm sm:text-base text-gray-800 dark:text-gray-100 font-medium">
          Tasks:
        </label>
        <select 
          v-model="task" 
          class="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-lg
                 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200
                 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          required
        >
          <option disabled value="">Select a task</option>
          <option v-for="t in filteredTasks" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="block text-sm sm:text-base text-gray-800 dark:text-gray-100 font-medium">
          Status:
        </label>
        <select 
          v-model="status" 
          class="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-lg
                 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200
                 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          required
        >
          <option disabled value="">Select status</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="block text-sm sm:text-base text-gray-800 dark:text-gray-100 font-medium">
          Priorities:
        </label>
        <select 
          v-model="priorities" 
          class="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-lg
                 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200
                 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          required
        >
          <option disabled value="">Select Priority</option>
          <option value="Urgent Delivery">Urgent Delivery</option>
          <option value="Normal delivery">Normal delivery</option>
          <option value="First Priority">First Priority</option>
        </select>
      </div>

      <button 
        type="submit"
        class="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 dark:from-cyan-600 dark:to-indigo-700
               text-white rounded-lg hover:opacity-90 transition shadow-md w-full
               focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 cursor-pointer hover:scale-105"
      >
        Assign Task
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import api, { endpoints } from '../../axios_api.js'
import { useToast } from '../composables/useToast.js';

const store = useStore();
const router = useRouter();
const toast = useToast()

const user = ref('');
const status = ref('');
const task = ref('');
const projects = ref('');
const description = ref('');
const priorities = ref('');
const usersToList = ref([]);

const taskKeys = computed(() => Object.keys(store.getters.getProjectTasks || {}));

onMounted(async () => {
  const response = await api.get(endpoints.userData);
  usersToList.value = await response.data;
  await store.dispatch('getProjectTasks');
});

const filteredTasks = computed(() => store.getters.getProjectTasks[projects.value] || []);

const addNewTask = async () => {
  if (!task.value || !user.value || !projects.value) {
    toast.info("Please fill all required fields");
    return;
  }
  const newTask = { status: status.value, user: user.value, task: task.value, projects: projects.value, priorities: priorities.value, description: description.value };
  try {
    await store.dispatch("addTask", newTask);
    toast.success("Task added successfully!");
    router.push("/home/tasklist");
    task.value = "";
    status.value = "";
    user.value = "";
    projects.value = "";
    description.value = "";
    priorities.value = "";
  } catch (error) {
    toast.error("Failed to add task");
  }
};
</script>
