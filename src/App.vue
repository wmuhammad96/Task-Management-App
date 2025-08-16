<template>
  <div class="min-h-screen flex flex-col bg-amber-50 dark:bg-gray-800 transition-colors duration-300">
    <base-nav />
    <main class="flex-1 p-4 md:p-6">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <!-- Optional footer can be added here -->
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useStore } from 'vuex'
import { useTheme } from '@/composables/useTheme' // Suggested new composable

const store = useStore()

// Watch for theme changes and apply to document
watch(
  () => store.state.theme,
  (newTheme) => {
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  },
  { immediate: true }
)

// Initialize theme
useTheme().initTheme()
</script>

<style>
/* Smooth transitions for theme changes and route changes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scrollbar styling that matches your theme */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(217, 119, 6, 0.1); /* amber-600 with opacity */
}

::-webkit-scrollbar-thumb {
  background: rgba(180, 83, 9, 0.6); /* amber-800 with opacity */
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(146, 64, 14, 0.8); /* amber-900 with opacity */
}

.dark ::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5); /* gray-800 with opacity */
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(55, 65, 81, 0.7); /* gray-700 with opacity */
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(75, 85, 99, 0.9); /* gray-600 with opacity */
}
</style>