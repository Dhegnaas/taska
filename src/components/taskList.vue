<template> 
    <TransitionGroup name="task-list" tag="div" class="task-list">
    <article v-for="task in props.tasks" class="task" :key="task.id">
      <label>
        <input 
          type="checkbox"
          :checked="task.done"
          @change="emit('toggle-done', task.id)"
        />
        <span :class="{ done: task.done }">{{ task.title }}</span>
      </label>
      <button @click="emit('remove-task', task.id)" class="outline">Remove</button>
    </article>
</TransitionGroup>
</template>
<script lang="ts" setup>
import type { task } from '../types';

// Props
const props = defineProps<{
  tasks: task[];
}>();

// Emits
const emit = defineEmits<{
  'toggle-done': [id: string];
  'remove-task': [id: string];
}>();
</script>

<style>
.done {
  text-decoration: line-through;
}
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.5s ease;
}
.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateX(300px);
}

/* .task {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
} */
</style>
