<template>
  <div class="complete">
    <h1 class="text-4xl">TO DO LIST</h1>
    <p class="font-light">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    <add-task/>
    <div class="flex justify-center gap-3">
      <router-link to="/">
        <base-button buttonLabel="All Task" buttonColor="bg-pk"></base-button>
      </router-link>
      <router-link to="/active">
        <base-button buttonLabel="Active Task" buttonColor="bg-yl" class="inline-block"></base-button>
      </router-link>
      <router-link to="/complete">
        <base-button buttonLabel="Complete Task" buttonColor="bg-bl"></base-button>
      </router-link>
      
    </div>
      
    <!-- <div class="flex justify-center gap-3">
      <input type="text" placeholder="Enter New Task ..." class="box">
      <button @click="addNewTask" class="btn">Add Task</button>
    </div> -->

  </div>
</template>

<script>
import AddTask from '../components/AddTask.vue'
// @ is an alias to /src

export default {
  components: {
    AddTask
  }
}
</script>
