<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits<{
   addtask: [newtask: string]  
}>();

const newtask = ref("");

function formsubmitted(){
    emit("addtask",newtask.value);
}   

</script>
<template>
        <form @submit.prevent="formsubmitted">
      <label>
        New Task
        <input v-model="newtask" name="new task">
      </label>
      <div class="button-container">
        <button>Add</button>
      </div>
    </form>
</template>