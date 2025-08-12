<template>
    <div class="p-6 max-w-md mx-auto">
        <h2 class="text-xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-amber-950 bg-clip-text text-transparent">
            Assign / Update Task</h2>
        <form @submit.prevent="addNewTask">
            <label class="block mb-2 bg-gradient-to-r from-amber-600 to-amber-950 bg-clip-text text-transparent">
                Task ID:
                <input v-model="taskId" class="border p-2 w-full border-amber-950 " />
            </label>
            <label class="block mb-2 bg-gradient-to-r from-amber-600 to-amber-950 bg-clip-text text-transparent">
                User:
                <input v-model="user" type="text" required class="border border-amber-950 p-2 w-full" />
            </label>
            <label class="block mb-2 bg-gradient-to-r from-amber-600 to-amber-950 bg-clip-text text-transparent">
                Task:
                <input v-model="task" type="text" required class="border p-2 w-full border-amber-950 " />
            </label>
            <label class="block mb-2">
                Status:
                <select v-model="status" class="border p-2 w-full  " required>
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </label>
            <button type="submit"
                class="mt-4 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-950 text-amber-200 rounded">Assign
                Task</button>
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter()
const taskId = ref('');
const user = ref('');
const status = ref('pending');
const task = ref('')

const addNewTask = async () => {
    if (!task.value || !user.value) {
        alert("Please fill all required fields");
        return;
    }
    const newTask = {
        status: status.value,
        user: user.value,
        task: task.value
        // Don't set id — JSON Server will auto-generate it
    };
    try {
        await store.dispatch("addTask", newTask);
        alert("Task added successfully!");
        router.push("/")
        // Clear form
        task.value = "";
        status.value = "pending";
        user.value = "";
    } catch (error) {
        alert("Failed to add task");
    }
}
const updateTask = async () => {
    // Build updated task object
    const updatedTask = {
        id: taskId.value,
        user: user.value,
        status: status.value,
        task: task.value
    };
    try {
        await store.dispatch('updateTaskOnServer', updatedTask);
        alert('Task updated successfully!');
        // Clear form
        taskId.value = '';
        user.value = '';
        status.value = 'pending';
        task.value = ''


    } catch (error) {
        alert('Failed to update task.');
    }
};
</script>