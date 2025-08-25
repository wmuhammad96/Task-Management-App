<template>
   
    <teleport to="#modal-container">
        <div v-if="open" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div class="bg-gradient-to-r from-amber-600 to-amber-950 dark:from-gray-800 dark:to-gray-700 
               text-amber-100 dark:text-gray-300 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <p class="mb-4 text-center">{{ message }}</p>
                <button @click="handleClose" class="px-4 py-2 bg-amber-100 dark:bg-gray-300 text-amber-950 dark:text-gray-900 
                 rounded hover:opacity-90 transition cursor-pointer w-full">
                    Close
                </button>
            </div>
        </div>
    </teleport>
</template>

<script setup>
defineProps({
    open: {
        type: Boolean,
        required: true
    },
    message: {
        type: String,
        default: ""
    },
    handleClose: {
        type: Function,
        required: true
    }
})
</script>
