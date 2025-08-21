<template>
  <transition name="fade">
    <div
      v-if="toast.show" class="fixed top-5 right-5 z-50 bg-amber-600 text-amber-100 px-6 py-3 rounded-lg shadow-lg
                border border-amber-400 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                animate-slide-in-fade"
      :class="[
        'fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white z-50',
        toast.type === 'success' ? 'bg-green-600' : '',
        toast.type === 'error' ? 'bg-red-600' : '',
        toast.type === 'info' ? 'bg-blue-600' : '',
        toast.type === 'warning' ? 'bg-yellow-600 text-black' : ''
      ]"
    >
      {{ toast.message }}
    </div>
  </transition>
</template>

<script setup>
import { useToast } from "@/composables/useToast";
const { state: toast } = useToast();
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: all 0.6s ease;
}
.fade-enter-from, .fade-leave-to {
 opacity: 0;
    transform: translateX(50px);
}
.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: translateX(0);
}
@keyframes slideInFade {
    0% {
        opacity: 0;
        transform: translateX(50px);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
.animate-slide-in-fade {
    animation: slideInFade 0.6s forwards;
}
</style>
