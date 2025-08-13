<template>
    <div class="p-6 max-w-md mx-auto">
        <h2 class="text-xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-amber-950 bg-clip-text text-transparent">
            Assign / Update Task
        </h2>
        <form @submit.prevent="addNewTask">
            <label class="block mb-2">
                User:
                <input v-model="user" type="text" required class="border border-amber-950 p-2 w-full" />
            </label>

            <label class="block mb-2">
                Projects:
                <select v-model="projects" class="border p-2 w-full" required>
                    <option disabled value="">Select a project</option>
                    <option value="Development task">Development task</option>
                    <option value="Testing & Quality Assurance">Testing & Quality Assurance</option>
                    <option value="Project & Sprint Planning">Project & Sprint Planning</option>
                    <option value="Internal Projects">Internal Projects</option>
                    <option value="DevOps & Deployment">DevOps & Deployment</option>
                    <option value="Documentation & Communication">Documentation & Communication</option>
                </select>
            </label>

            <label class="block mb-2">
                Tasks:
                <select v-model="task" class="border p-2 w-full" required>
                    <option disabled value="">Select a task</option>
                    <option v-for="t in filteredTasks" :key="t" :value="t">
                        {{ t }}
                    </option>
                </select>
            </label>

            <label class="block mb-2">
                Status:
                <select v-model="status" class="border p-2 w-full" required>
                    <option disabled value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </label>

            <button type="submit"
                class="mt-4 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-950 text-amber-200 rounded">
                Assign Task
            </button>
        </form>
    </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const user = ref('');
const status = ref('');
const task = ref('');
const projects = ref('');

const projectTasks = {
    "Development task": [
        "Build login system",
        "Fix API bugs",
        "Implement search functionality"
    ],
    "Testing & Quality Assurance": [
        "Write unit tests",
        "Manual testing for checkout",
        "Automated UI testing"
    ],
    "Project & Sprint Planning": [
        "Backlog grooming",
        "Sprint planning meeting",
        "Requirement gathering"
    ],
    "Internal Projects": [
        "Company Website Redesign",
        "Internal HR Portal",
        "Automation Tooling"
    ],
    "DevOps & Deployment": [
        "Environment Setup",
        "CI/CD Maintenance",
        "Monitoring"
    ],
    "Documentation & Communication": [
        "API Docs",
        "User Guides",
        "Meeting Notes"
    ],
};

const filteredTasks = computed(() => {
    return projectTasks[projects.value] || [];
});

const addNewTask = async () => {
    if (!task.value || !user.value || !projects.value) {
        alert("Please fill all required fields");
        return;
    }
    const newTask = {
        status: status.value,
        user: user.value,
        task: task.value,
        projects: projects.value
    };
    try {
        await store.dispatch("addTask", newTask);
        alert("Task added successfully!");
        router.push("/");
        task.value = "";
        status.value = "";
        user.value = "";
        projects.value = "";
    } catch (error) {
        alert("Failed to add task");
    }
};
</script>
