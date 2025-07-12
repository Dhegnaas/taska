<script lang="ts" setup>
import { ref } from 'vue';

// Emit declaration: camelCase in script
const emit = defineEmits<{
  (e: 'add-task', newtask: string): void;
}>();

const newtask = ref('');
const error = ref('');

// Form submission logic
function formsubmitted() {
  if (newtask.value.trim()) {
    emit('add-task', newtask.value.trim());
    newtask.value = '';
    error.value = '';
  } else {
    error.value = 'Task cannot be empty';
  }
}
</script>

<template>
  <form @submit.prevent="formsubmitted" class="space-y-2">
    <label class="block">
      <span class="text-white font-semibold">New Task</span>
      <input
        v-model="newtask"
        name="new-task"
        type="text"
        :aria-invalid="!!error || undefined"
        @input="error = ''"
        aria-describedby="invalid-helper"
        required
        class="w-full mt-1 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>

    <small
      v-if="error"
      id="invalid-helper"
      class="text-red-500 block"
    >
      {{ error }}
    </small>

    <div class="text-right">
      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  </form>
</template>
