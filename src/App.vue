<script lang="ts" setup>
import { computed, ref } from 'vue';
import TaskForm from './components/taskform.vue';
import TaskList from './components/taskList.vue';
import type { task } from './types';

// Reactive data
const message = ref("Tasks app");
const Tasks = ref<task[]>([]);

// Computed property for total completed tasks
const totaldone = computed(() =>
  Tasks.value.reduce((total, task) => task.done ? total + 1 : total, 0)
);

// Add new task
function addTask(newtask: string) {
  Tasks.value.push({
    id: crypto.randomUUID(),
    title: newtask,
    done: false,
  });
}

// Toggle task done/undone
function toggleDone(id: string) {
  const task = Tasks.value.find((t) => t.id === id);
  if (task){
     task.done = !task.done;
}
}

function removetask(id: string){
   const index =Tasks.value.findIndex((task) => task.id ===id);
  if (index !== -1){
    Tasks.value.splice(index, 1);
  }
}
</script>

<template>
  <main>
    <h1>{{ message }}</h1>

    <!-- Form to add a new task -->
    <TaskForm @add-task="addTask" />

    <!-- Show message if no tasks -->
    <h3 v-if="!Tasks.length">Add a Task to get started.</h3>
    <h3 v-else>{{ totaldone }} / {{ Tasks.length }} tasks completed</h3>
    <div class="button-container">
      <button v-if="!Tasks.length" class="secondary">all</button>
      <button>todo</button>
      <button>done</button>

    </div>

    <!-- List of tasks -->
    <TaskList :tasks="Tasks" @toggle-done="toggleDone" @remove-task="removetask" />
  </main>
</template>

<style>
main {
  max-width: 800px;
  margin: 1rem auto;
}
.button-container {
  display: flex;
  justify-content: end;
  gap: 0.5ram;
}
</style>
