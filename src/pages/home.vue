<template>
  <section class="transition gap-3 flex">
    <SideBar :handleNavigation="handleNavigation" class="z-50" />

    <div
      v-if="drawerType === 'mobile'"
      @click="closeDrawer"
      class="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 md:hidden"
    ></div>

    <div
      :class="[
        'flex-1 transition bg-gray-50 dark:bg-gray-900 overflow-x-hidden',
        contentClasses
      ]"
    >
      <router-view />
    </div>
  </section>
</template>

<script setup>
import { computed, watch } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import SideBar from "../components/SideBar.vue"

const store = useStore()
const router = useRouter()

const drawerType = computed(() => store.state.drawer)

const contentClasses = computed(() => ({
  "md:ml-[200px]": drawerType.value === "desktop",
  "md:ml-[60px]": drawerType.value === "mini",
  "ml-0": ["mobile", "mobileClose"].includes(drawerType.value),
}))

function closeDrawer() {
  if (drawerType.value === "mobile") {
    store.dispatch("setDrawer", "mobileClose")
  }
}

function handleNavigation(path) {
  router.push(path)
}

watch(drawerType, (val) => {
  document.body.style.overflow = val === "mobile" ? "hidden" : ""
})
</script>

<style>
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
