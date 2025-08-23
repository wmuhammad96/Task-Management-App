<template>
  <div id="modal-container"></div>
  <div
    class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans text-gray-950 dark:text-gray-100">
    <base-nav />
    <main class="flex-1 overflow-x-hidden">
      <div class="w-full">
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade'" mode="out-in">
            <component :is="Component" class="min-h-[calc(100vh-180px)]" />
          </transition>
        </router-view>
        <BaseToast />
      </div>
    </main>
    <footer
      class="bg-gradient-to-r from-cyan-500 to-indigo-600 dark:from-gray-800 dark:to-gray-700 py-4 text-gray-950 dark:text-gray-100">
      <div
        class="container mx-auto px-4 text-center text-sm sm:text-base shadow-[0_0_15px_rgba(0,0,0,0.15),0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-md">
        © 2025 Task Manager. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useTheme } from '@/composables/useTheme'
import BaseToast from "@/components/BaseToast.vue";

const store = useStore()

const updateDrawer = () => {
  if (window.innerWidth <= 767) {
    store.dispatch("setDrawer", store.state.drawer === 'mobileClose' ? "mobileClose" : "mobile")
  } else {
    store.dispatch("setDrawer", store.state.drawer === 'mini' ? "mini" : "desktop")
  }
}

onMounted(() => {
  document.documentElement.classList.toggle('dark', store.state.theme === 'dark')
  document.documentElement.style.visibility = 'visible';
  updateDrawer()
  window.addEventListener("resize", updateDrawer)
})

onUnmounted(() => {
  window.removeEventListener("resize", updateDrawer)
})

watch(
  () => store.state.theme,
  (newTheme) => {
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  },
  { immediate: true }
)

try {
  useTheme().initTheme()
} catch (error) {
  console.error('Theme initialization failed:', error)
}
</script>

<style>
.fade-enter-active,
.fade-leave-active,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}


::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(200, 200, 200, 0.2);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(100, 100, 100, 0.4);
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(80, 80, 80, 0.6);
}

.dark ::-webkit-scrollbar-track {
  background: rgba(55, 65, 81, 0.3);
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.6);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.8);
}


@media (max-width: 640px) {

  [role="button"],
  button,
  a {
    min-height: 48px;
    min-width: 48px;
  }
}


@media print {
  .no-print {
    display: none !important;
  }

  body {
    background: white !important;
    color: black !important;
  }
}


body,
input,
button,
select,
textarea {
  font-family: 'Inter', sans-serif;
  color: inherit;
}
</style>
