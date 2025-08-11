<template>
    <!-- <div >
        <ul class="grid justify-items-center pt-11">
            <li v-for="task in getTask" :key="task.id" class="flex ">
                <div>
                    {{ task.task }}
                </div>
                <div>
                    {{ task.status }}
                </div>
                <div>
                    {{ task.user }}
                </div>
            </li>
        </ul>
    </div> -->
    
  <div class="p-6">
    <!-- Header Row -->
    <div class="grid grid-cols-5 bg-gray-100 font-semibold border border-gray-300">
      <div class="px-4 py-2 border border-gray-300">Project Name</div>
      <div class="px-4 py-2 border border-gray-300">Status</div>
      <div class="px-4 py-2 border border-gray-300">User</div>
      <div class="px-4 py-2 border border-gray-300 text-center">Edit</div>
      <div class="px-4 py-2 border border-gray-300 text-center">Delete</div>
    </div>
    <!-- Data Row -->
    <div v-for="task in getTask" :key="task.id" class="grid grid-cols-5 border border-gray-300" >
      <div class="px-4 py-2 border border-gray-300">{{ task.task }}</div>
      <div class="px-4 py-2 border border-gray-300">{{task.status}}</div>
      <div class="px-4 py-2 border border-gray-300">{{ task.user }}</div>
      <button @click="editTask" class="px-4 py-2 border border-gray-300 text-center text-blue-500 cursor-pointer">✏️</button @click="editTask">
      <button @click="deleteTask(task.id)" class="px-4 py-2 border border-gray-300 text-center text-red-500 cursor-pointer">🗑️</button>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex';
import { computed , ref } from 'vue';
const store = useStore()
const editId = ref(null);
const editStatus = ref('');
const editRole = ref('');
// const getTask = ref(store.getters.getTask)
let getTask = localStorage.getItem('res')

  getTask = getTask ? JSON.parse(getTask) : []

// console.log(getTask)

// console.log("------", getTask.value)
// const getTask = computed(() => store.getters.getTask)
// console.log(getTask.value)
// getTask = getTask ? JSON.parse(getTask) : []



const deleteTask = (id)=>{
    store.dispatch('deleteTask', id)
}
const editTask = ()=>{

}


</script>