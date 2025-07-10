<script lang="ts" setup>
import { ref } from 'vue';

// Emit definition: kebab-case on template, camelCase in code
const emit = defineEmits<{
  (e: 'add-task', newtask: string): void;
}>();

const newtask = ref('');
const error = ref('');

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
  <form @submit.prevent="formsubmitted">
    <label>
      New Task
      <input
        v-model="newtask"
        name="new-task"
        :aria-invalid="!!error || undefined"
        @input="error = ''"
        aria-describedby="invalid-helper"
        required
        class="border p-1 rounded"
      />
      <br />
      <small v-if="error" id="invalid-helper" class="text-red-500">
        {{ error }}
      </small>
    </label>
    <div class="button-container mt-2">
      <button type="submit" class="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
    </div>
  </form>
</template>
