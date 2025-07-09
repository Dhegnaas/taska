<script lang="ts" setup>
import { ref } from 'vue';
import taskform from './components/taskform.vue';
import type {task} from './types' ;


const message = ref("Tasks app");
const Tasks = ref<task[]>([]);

function addtask(newtask: string){
  Tasks.value.push({
    id: crypto.randomUUID(),
    title: newtask,
    done: false,
  });
}
</script>

<template>
  <main>
    <h1>{{ message }}</h1>
    <h3>there are{{ Tasks.length }} tasks. </h3>
    <taskform @addtask="addtask" />
  </main>
</template>

<style>
main{
  max-width: 800px;
  margin: 1rem auto;
}
 
</style>