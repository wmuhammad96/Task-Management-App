<template>
  <div class="p-6">
    <!-- Header Row -->
    <div class="grid grid-cols-6 bg-gradient-to-r from-amber-950 to-amber-600 font-semibold border border-gray-300">
      <div class="px-4 py-2 border border-gray-300 text-amber-100 text-center">Project Name</div>
      <div class="px-4 py-2 border border-gray-300 text-amber-100 text-center">Task Name</div>
      <div class="px-4 py-2 border border-gray-300 text-amber-100 text-center">Status</div>
      <div class="px-4 py-2 border border-gray-300 text-amber-100 text-center" >User</div>
      <div class="px-4 py-2 border border-gray-300 text-center text-amber-100" v-if="JSON.parse(logedUser)?.admin === 'Yes'">Edit</div>
      <div class="px-4 py-2 border border-gray-300 text-center text-amber-100" v-if="JSON.parse(logedUser)?.admin === 'Yes'">Delete</div>
    </div>
    <!-- Data Row -->
    <div v-for="task in getTask" :key="task.id" class="grid grid-cols-6 border border-gray-300">
      <div class="px-4 py-2 border border-gray-300 text-center">{{ task.projects }}</div>
      <div class="px-4 py-2 border border-gray-300 text-center">{{ task.task }}</div>
      <div class="px-4 py-2 border border-gray-300 text-center">{{ task.status }}</div>
      <div class="px-4 py-2 border border-gray-300 text-center">{{ task.user }}</div>
      
      <button @click="editTask" v-if="JSON.parse(logedUser)?.admin === 'Yes'"
        class="px-4 py-2 border border-gray-300 text-center text-blue-500 cursor-pointer">✏️</button>
      <button @click="deleteTask(task.id)" v-if="JSON.parse(logedUser)?.admin === 'Yes'"
        class="px-4 py-2 border border-gray-300 text-center text-red-500 cursor-pointer">🗑️</button>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex';
import { computed, ref, onMounted } from 'vue';
const store = useStore()
const editId = ref(null);
const editStatus = ref('');
const editRole = ref('');
const getTask = computed(() => store.getters.getTask)
const getUser = computed(() => store.getters.getUser)

const logedUser = computed(()=> {
  console.log("logged", sessionStorage.getItem('user'));
  return sessionStorage.getItem('user');
}
)

const roles = computed(() => 
  getUser.value.map(user => user.admin === "Yes") // if your objects are plain
)

onMounted(async () => {
  await store.dispatch("getUser");
  await store.dispatch("getTask");
})
// onMounted(async ()=>{

// })
const deleteTask = (id) => {
  store.dispatch('deleteTask', id)
}
const editTask = () => {
}
</script>