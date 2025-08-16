<template>
    <section class="bg-amber-50 dark:bg-gray-800 transition min-h-screen">
        <div class="flex">
            <!-- Sidebar -->
            <div class="grid bg-gradient-to-b from-amber-600 to-amber-950 dark:from-gray-800 dark:to-gray-900 
                        left-0 w-50 sticky h-screen shadow-lg">
                <div class="flex flex-col p-8 space-y-6">
                    <button class="text-amber-100 dark:text-gray-300 hover:text-amber-200 dark:hover:text-gray-200 
                                transition cursor-pointer text-left" @click="setComponent('task-list')">
                        <router-link to="/home/tasklist" class="flex items-center gap-2">
                            <span>Task List</span>
                        </router-link>
                    </button>

                    <button class="text-amber-100 dark:text-gray-300 hover:text-amber-200 dark:hover:text-gray-200 
                                transition cursor-pointer text-left" @click="handleNavigation('/home/users')">
                        <span>Users</span>
                    </button>

                    <button class="text-amber-100 dark:text-gray-300 hover:text-amber-200 dark:hover:text-gray-200 
                                transition cursor-pointer text-left" @click="handleNavigation('/home/admin')">
                        <span>Admin Panel</span>
                    </button>

                    <button class="text-amber-100 dark:text-gray-300 hover:text-amber-200 dark:hover:text-gray-200 
                                transition cursor-pointer text-left" @click="setComponent(MyTask)">
                        <router-link to="/home/mytask" class="flex items-center gap-2">
                            <span>My Task</span>
                        </router-link>
                    </button>
                </div>
            </div>

            <!-- Main Content -->
            <div class="flex-1 p-6 bg-amber-50 dark:bg-gray-800 transition">
                <router-view />
            </div>

            <!-- Modal -->
            <teleport to="body">
                <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div class="bg-gradient-to-r from-amber-600 to-amber-950 dark:from-gray-800 dark:to-gray-700 
                                text-amber-100 dark:text-gray-300 p-6 rounded-lg shadow-xl max-w-md w-full">
                        <p class="mb-4">{{ modalMessage }}</p>
                        <button @click="showModal = false" class="px-4 py-2 bg-amber-100 dark:bg-gray-300 text-amber-950 dark:text-gray-900 
                                       rounded hover:opacity-90 transition cursor-pointer w-full">
                            Close
                        </button>
                    </div>
                </div>
            </teleport>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const selectedComponent = ref("")
const showModal = ref(false)
const modalMessage = ref('')

function setComponent(cmp) {
    selectedComponent.value = cmp
}

const logedUser = computed(() => {
    return sessionStorage.getItem('user')
})

function handleNavigation(path) {
    if (JSON.parse(logedUser.value)?.admin === "No") {
        modalMessage.value = 'You are not authorized to access this page.'
        showModal.value = true
    } else {
        router.push(path)
    }
}
</script>