<template>
    <section>
        <div class="flex ">
            <div class="grid bg-gradient-to-b from-amber-600 to-amber-950 left-0 w-50 sticky  h-screen">
                <button class="text-amber-100 cursor-pointer" @click="setComponent(TaskList)">
                    Task List 
                </button>
                <button class="text-amber-100 cursor-pointer" @click="setComponent(UserDetail)">
                    User Detail 
                </button>
                <button class="text-amber-100 cursor-pointer" @click="setComponent('task-list')">
                    <router-link to="/admin">
                        Admin Panel
                    </router-link>
                    
                </button>
                <button class="text-amber-100 mb-7 cursor-pointer v" @click="setComponent(MyTask)">
                   My task
                </button>
            </div>
            <div class="flex-1/3">
                <keep-alive>
                <component :is="selectedComponent" ></component>
                </keep-alive>
            </div>

        </div>
    </section>
</template>
<script setup>
import {ref} from "vue"
    import MyTask from '../components/MyTask.vue';
    import TaskList from '../components/TaskList.vue';
    import UserDetail from '../components/UserDetail.vue';

    const selectedComponent = ref(TaskList)
    
    function setComponent(cmp){
        selectedComponent.value = cmp
    }



</script>