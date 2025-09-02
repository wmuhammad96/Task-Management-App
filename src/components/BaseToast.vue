<template>
  <transition name="fade">
    <div
      v-if="toast.show"
      :class="[
        'fixed top-5 right-5 z-50 px-6 py-3 rounded-lg shadow-lg text-white dark:text-gray-300 animate-slide-in-fade border',
        toast.type === 'success' ? 'bg-green-600 border-green-400' : '',
        toast.type === 'error' ? 'bg-red-600 border-red-400' : '',
        toast.type === 'info' ? 'bg-blue-600 border-blue-400' : '',
        toast.type === 'warning' ? 'bg-yellow-400 text-black border-yellow-500' : '',
        'dark:bg-gray-800 dark:border-gray-600'
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
.fade-enter-to, .fade-leave-from {
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

