<template>
    <section>
        <div class="flex ">
            <div class="grid bg-gradient-to-b from-amber-600 to-amber-950 left-0 w-50 sticky  h-screen">
                <div class="flex flex-col p-12">
                    <button class="text-amber-100 cursor-pointer mb-6" @click="setComponent('task-list')">
                        <router-link to="/home/tasklist">
                            Task List
                        </router-link>

                    </button>
                    <button class="text-amber-100 cursor-pointer mb-6" @click="handleNavigation('/home/users')">
                        Users
                    </button>
                    <button class="text-amber-100 cursor-pointer mb-6" @click="handleNavigation('/home/admin')">
                        Admin Panel
                    </button>
                    <teleport to="body">
                        <div v-if="showModal" class="fixed top-1/3 left-1/3 bg-gradient-to-r from-amber-600 to-amber-950 text-amber-100 p-4 border rounded shadow-lg">
                            <p>{{ modalMessage }}</p>
                            <button @click="showModal = false" class="mt-2 px-4 py-1 bg-amber-100 text-amber-950 rounded cursor-pointer">
                                Close
                            </button>
                        </div>
                    </teleport>
                    <button class="text-amber-100 cursor-pointer mb-6" @click="setComponent(MyTask)">
                        <router-link to="/home/mytask">
                            My Task
                        </router-link>

                    </button>
                </div>
            </div>
            <div class="flex-1/3">
                <!-- <keep-alive>
                    <component :is="selectedComponent"></component>
                </keep-alive> -->
                <router-view />
            </div>

        </div>
    </section>
</template>
<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

// import MyTask from '@/components/MyTask.vue';
// import TaskList from '@/components/TaskList.vue';
// import UserDetail from '@/components/UserDetail.vue';
const router = useRouter()

const selectedComponent = ref("")
const showModal = ref(false)
const modalMessage = ref('')

function setComponent(cmp) {
    selectedComponent.value = cmp
}
const logedUser = computed(() => {
    return sessionStorage.getItem('user');
}
)


function handleNavigation(path) {
    if (JSON.parse(logedUser.value)?.admin === "No") {
        modalMessage.value = 'You are not authorized to access this page.'
        showModal.value = true
    } else {
        router.push(path)
    }
}



</script>