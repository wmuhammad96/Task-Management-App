<template>
    <section class="bg-amber-50 dark:bg-gray-800 transition">
        <div class="flex flex-row justify-start items-start ">
            <SideBar :handleNavigation="handleNavigation" 
            />
            <div class="flex transition h-full overflow-x-hidden">
                <router-view />
            </div>
        </div>
        <Modal :open="showModal" :message="modalMessage" :handleClose="closeModal" />
    </section>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import SideBar from "../components/SideBar.vue"
import Modal from "@/components/Modal.vue"

const router = useRouter()
const showModal = ref(false)
const modalMessage = ref('')

const closeModal = () => {
    showModal.value = false;
}

function handleNavigation(path) {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        if ((path ==='/home/admin' && user.admin === 'No') || (path ==='/home/users' && user.admin === 'No')) {
            modalMessage.value = 'You are not authorized to access this page.'
            showModal.value = true
            return false;
        }
        router.push(path)

    } else {
        router.push('/login');
    }
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

    [role="button"],
    button,
    a {
        min-height: 48px;
        min-width: 48px;
    }
}
</style>