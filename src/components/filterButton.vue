<script lang="ts" setup>
import type { task, taskfilter } from '../types';

const props = defineProps<{
  filter: taskfilter;
  currentfilter: taskfilter;
}>();

const emit = defineEmits<{
  (e: 'set-filter', value: taskfilter): void;
}>();
</script>

<template>
  <button
    @click="emit('set-filter', props.filter)"
    :class="[
      'px-4 py-1 rounded font-medium transition',
      props.currentfilter === props.filter
        ? 'bg-white text-gray-900'
        : 'bg-gray-600 text-white hover:bg-gray-500'
    ]"
  >
    {{ props.filter }}
  </button>
</template>

<style scoped>
button {
  text-transform: capitalize;
}
</style>
