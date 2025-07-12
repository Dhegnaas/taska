<script lang="ts" setup>
import { computed, ref } from 'vue';
import TaskForm from './components/taskform.vue';
import TaskList from './components/taskList.vue';
import FilterButton from './components/filterButton.vue';
import type { task, taskfilter } from './types';

// Reactive state
const message = ref("Tasks App");
const Tasks = ref<task[]>([]);
const filter = ref<taskfilter>("all");

// Computed property for total completed tasks
const totaldone = computed(() =>
  Tasks.value.reduce((total, task) => (task.done ? total + 1 : total), 0)
);

// Computed filtered tasks
const filteredtasks = computed(() => {
  switch (filter.value) {
    case "all":
      return Tasks.value;
    case "done":
      return Tasks.value.filter(task => task.done);
    case "todo":
      return Tasks.value.filter(task => !task.done);
    default:
      return Tasks.value;
  }
});

// Add a new task
function addTask(newtask: string) {
  Tasks.value.push({
    id: crypto.randomUUID(),
    title: newtask,
    done: false,
  });
}

// Toggle done/undone
function toggleDone(id: string) {
  const task = Tasks.value.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
  }
}

// Remove a task
function removetask(id: string) {
  const index = Tasks.value.findIndex(task => task.id === id);
  if (index !== -1) {
    Tasks.value.splice(index, 1);
  }
}

// Change filter
function setfilter(value: taskfilter) {
  filter.value = value;
}
</script>

<template>
  <main>
    <h1 class="text-2xl font-bold mb-4 text-white">{{ message }}</h1>

    <!-- Task form -->
    <TaskForm @add-task="addTask" />

    <!-- Task summary -->
    <h3 v-if="!Tasks.length" class="text-gray-400 mt-4">
      Add a Task to get started.
    </h3>
    <h3 v-else class="text-gray-300 mt-4">
      {{ totaldone }} / {{ Tasks.length }} tasks completed
    </h3>

    <!-- Filter Buttons -->
    <div class="button-container my-4">
      <FilterButton :currentfilter="filter" filter="all" @set-filter="setfilter" />
      <FilterButton :currentfilter="filter" filter="todo" @set-filter="setfilter" />
      <FilterButton :currentfilter="filter" filter="done" @set-filter="setfilter" />
    </div>

    <!-- Task List -->
    <TaskList
      :tasks="filteredtasks"
      @toggle-done="toggleDone"
      @remove-task="removetask"
    />
  </main>
</template>

<style scoped>
main {
  max-width: 800px;
  margin: 1rem auto;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
