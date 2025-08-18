<template>
    <div :class="{
        'w-[200px]': drawerType === 'desktop',
        'w-[50px]': drawerType === 'mini',
        'transition-all absolute left-0 z-50': drawerType === 'mobile',
        'translate-x-[-100%]': drawerType === 'mobileClose',
        'translate-x-0': drawerType === 'mobile'
    }"
        class="bg-amber-600 dark:bg-gray-900 h-[calc(100vh-108px)] z-50 transition-[width] duration-300 ease-in-out overflow-hidden">
        <ul class="list-none flex flex-col items-start justify-center gap-5 p-4" :class="{
            'gap-10': drawerType === 'mini'
        }">
            <li v-for="menu in drawerMenu" :key="menu.route" @click="handleNavigation(menu.route)"
                class="flex items-center gap-3 cursor-pointer">
                <i :class="menu.icon" class="text-lg text-white"></i>
                <span :class="{
                    'hidden': drawerType === 'mini', 'transition-opacity duration-300': true
                }" class="text-white font-semibold">{{ menu.title }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';

defineProps({
    handleNavigation: {
        type: Function,
        required: true
    }
})

const store = useStore()
const drawerType = computed(() => store.state.drawer)

const drawerMenu = reactive([
    {
        route: '/home/tasklist',
        title: 'Task List',
        icon: 'pi pi-list'
    },
    {
        route: '/home/users',
        title: 'Users',
        icon: 'pi pi-users'
    },
    {
        route: '/home/admin',
        title: 'Admin Panel',
        icon: 'pi pi-wrench'
    },
    {
        route: '/home/mytask',
        title: 'My Task',
        icon: 'pi pi-briefcase'
    },
])

</script>