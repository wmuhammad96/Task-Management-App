<template>
    <div class="p-4 sm:p-6 max-w-md mx-auto bg-amber-50 dark:bg-gray-800 rounded-lg shadow-md transition">
        <h2 class="text-4xl font-bold tracking-widest mb-4 text-amber-950 dark:text-gray-300">
            Assign Task
        </h2>
        
        <form @submit.prevent="addNewTask" class="space-y-4">
            <div>
            <div class="space-y-2">
                <label class="block text-sm sm:text-base text-amber-900 dark:text-gray-300 font-medium">
                    Users:
                </label>
                <select 
                    v-model="user" 
                    class="w-full border border-amber-300 dark:border-gray-600 p-2 sm:p-3 rounded-lg
                           bg-amber-100 dark:bg-gray-700 text-amber-900 dark:text-gray-200
                           focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                >
                    <option disabled value="">Select User</option>
                    <option v-for="user in usersToList" :key="user.id" :value="user.id">
                        {{ user.name }}
                    </option>
                </select>
            </div>

           
            <div class="space-y-2">
                <label class="block text-sm sm:text-base text-amber-900 dark:text-gray-300 font-medium">
                    Description:
                </label>
                <input 
                    v-model="description" 
                    type="text" 
                    required 
                    class="w-full border border-amber-300 dark:border-gray-600 p-2 sm:p-3 rounded-lg
                           bg-amber-100 dark:bg-gray-700 text-amber-900 dark:text-gray-200
                           focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
            </div>

            
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
                    Tasks:
                </label>
                <select 
                    v-model="task" 
                    class="w-full border border-amber-300 dark:border-gray-600 p-2 sm:p-3 rounded-lg
                           bg-amber-100 dark:bg-gray-700 text-amber-900 dark:text-gray-200
                           focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                >
                    <option disabled value="">Select a task</option>
                    <option v-for="t in filteredTasks" :key="t" :value="t">
                        {{ t }}
                    </option>
                </select>
            </div>

            
            <div class="space-y-2">
                <label class="block text-sm sm:text-base text-amber-900 dark:text-gray-300 font-medium">
                    Status:
                </label>
                <select 
                    v-model="status" 
                    class="w-full border border-amber-300 dark:border-gray-600 p-2 sm:p-3 rounded-lg
                           bg-amber-100 dark:bg-gray-700 text-amber-900 dark:text-gray-200
                           focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                >
                    <option disabled value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

           
            <div class="space-y-2">
                <label class="block text-sm sm:text-base text-amber-900 dark:text-gray-300 font-medium">
                    Priorities:
                </label>
                <select 
                    v-model="priorities" 
                    class="w-full border border-amber-300 dark:border-gray-600 p-2 sm:p-3 rounded-lg
                           bg-amber-100 dark:bg-gray-700 text-amber-900 dark:text-gray-200
                           focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                class="mt-6 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-950 dark:from-amber-700 dark:to-amber-900 
                       text-amber-100 dark:text-gray-300 rounded-lg hover:opacity-90 transition shadow-md w-full
                       focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
                Assign Task
            </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import api, { endpoints } from '../../axios_api.js'

const store = useStore();
const router = useRouter();

const user = ref('');
const status = ref('');
const task = ref('');
const projects = ref('');
const description = ref('');
const priorities = ref('');
const usersToList = ref([]);
const taskKeys = computed(() => {
    return Object.keys(store.getters.getProjectTasks || {});
});

onMounted(async () => {
    const response = await api.get(endpoints.userData);
    usersToList.value = await response.data;
      await store.dispatch('getProjectTasks');
      taskKeys.value = Object.keys(store.getters.getProjectTasks)
});

const filteredTasks = computed(() => {
    return store.getters.getProjectTasks[projects.value] || [];
});
const projectsToList = computed(() => {
    return store.getters.getProjectTasks|| {};
});

const addNewTask = async () => {
    if (!task.value || !user.value || !projects.value) {
        alert("Please fill all required fields");
        return;
    }
    const newTask = {
        status: status.value,
        user: user.value,
        task: task.value,
        projects: projects.value,
        priorities: priorities.value,
        description: description.value
    };
    try {
        await store.dispatch("addTask", newTask);
        alert("Task added successfully!");
        router.push("/home/tasklist");
        task.value = "";
        status.value = "";
        user.value = "";
        projects.value = "";
        description.value = "";
        priorities.value = "";
    } catch (error) {
        alert("Failed to add task");
    }
};
</script>