<template>
  <section class="transition gap-3 flex">
    <SideBar :handleNavigation="handleNavigation" />
    <div :class="contentClasses" class="flex-1 transition overflow-x-hidden bg-gray-50 dark:bg-gray-900">
      <router-view />
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue"
import { useRouter } from "vue-router"
import SideBar from "../components/SideBar.vue"
import { useStore } from "vuex"

const store = useStore()
const router = useRouter()
const drawerType = computed(() => store.state.drawer)

const contentClasses = computed(() => ({
  "ml-[200px]": drawerType.value === "desktop",
  "ml-[60px]": drawerType.value === "mini",
  "ml-0": drawerType.value === "mobile" || drawerType.value === "mobileClose",
}))

function handleNavigation(path) {
  router.push(path)
}
</script>

<style>
.fixed {
  transition: transform 0.3s ease-in-out;
}

.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 100, 100, 0.4) rgba(200, 200, 200, 0.2);
}

.dark .overflow-y-auto {
  scrollbar-color: rgba(100, 116, 139, 0.6) rgba(55, 65, 81, 0.3);
}

@media (max-width: 768px) {
  [role="button"],
  button,
  a {
    min-height: 48px;
    min-width: 48px;
  }
}
</style>
