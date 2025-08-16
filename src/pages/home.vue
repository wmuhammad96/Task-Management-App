<template>
    <section class="bg-amber-50 dark:bg-gray-800 transition min-h-screen">
        <!-- Mobile Menu Button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-amber-600/90 dark:bg-gray-700/90 text-amber-100 shadow-lg">
            ☰
        </button>

        <div class="flex flex-col md:flex-row">
            <!-- Sidebar - Hidden on mobile by default -->
            <div class="fixed md:relative inset-y-0 left-0 z-40 w-64 transform md:transform-none transition-transform duration-300 ease-in-out"
                 :class="{'translate-x-0': mobileMenuOpen, '-translate-x-full': !mobileMenuOpen}"
                 @click.away="mobileMenuOpen = false">
                <div class="grid bg-gradient-to-b from-amber-600 to-amber-950 dark:from-gray-800 dark:to-gray-900 
                            h-screen shadow-lg overflow-y-auto">
                    <div class="flex flex-col p-6 space-y-4">
                        <router-link to="/home/tasklist" @click="mobileMenuOpen = false" class="text-amber-100 dark:text-gray-300 hover:text-amber-200 dark:hover:text-gray-200 
                                    transition cursor-pointer text-left py-3 px-4 rounded-lg hover:bg-amber-700/30 dark:hover:bg-gray-700/30">
                            <span class="text-lg">Task List</span>
                        </router-link>

                        <button @click="handleNavigation('/home/users')" class="text-amber-100 dark:text-gray-300 hover:text-amber-200 dark:hover:text-gray-200 
                                    transition cursor-pointer text-left py-3 px-4 rounded-lg hover:bg-amber-700/30 dark:hover:bg-gray-700/30">
                            <span class="text-lg">Users</span>
                        </button>

                        <button @click="handleNavigation('/home/admin')" class="text-amber-100 dark:text-gray-300 hover:text-amber-200 dark:hover:text-gray-200 
                                    transition cursor-pointer text-left py-3 px-4 rounded-lg hover:bg-amber-700/30 dark:hover:bg-gray-700/30">
                            <span class="text-lg">Admin Panel</span>
                        </button>

                        <router-link to="/home/mytask" @click="mobileMenuOpen = false" class="text-amber-100 dark:text-gray-300 hover:text-amber-200 dark:hover:text-gray-200 
                                    transition cursor-pointer text-left py-3 px-4 rounded-lg hover:bg-amber-700/30 dark:hover:bg-gray-700/30">
                            <span class="text-lg">My Task</span>
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="flex-1 p-4 md:p-6 transition min-h-screen" :class="{'ml-0': !mobileMenuOpen, 'ml-64': mobileMenuOpen}">
                <router-view />
            </div>

            <!-- Modal -->
            <teleport to="body">
                <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div class="bg-gradient-to-r from-amber-600 to-amber-950 dark:from-gray-800 dark:to-gray-700 
                                text-amber-100 dark:text-gray-300 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <p class="mb-4 text-center">{{ modalMessage }}</p>
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
const showModal = ref(false)
const modalMessage = ref('')
const mobileMenuOpen = ref(false)

const logedUser = computed(() => {
    const user = sessionStorage.getItem('user')
    return user ? JSON.parse(user) : null
})

function handleNavigation(path) {
    // Close mobile menu when navigating
    mobileMenuOpen.value = false
    
    if (logedUser.value?.admin === "No") {
        modalMessage.value = 'You are not authorized to access this page.'
        showModal.value = true
        return false // Prevent default navigation
    }
    router.push(path)
}
</script>

<style>
/* Smooth transitions for mobile menu */
.fixed {
    transition: transform 0.3s ease-in-out;
}

/* Better scrolling for sidebar */
.overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: rgba(180, 83, 9, 0.6) rgba(217, 119, 6, 0.1);
}

.dark .overflow-y-auto {
    scrollbar-color: rgba(55, 65, 81, 0.6) rgba(31, 41, 55, 0.3);
}

/* Mobile tap targets */
@media (max-width: 768px) {
    [role="button"], button, a {
        min-height: 48px;
        min-width: 48px;
    }
}
</style>