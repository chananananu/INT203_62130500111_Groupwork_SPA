<template>
  <div class="home">
    <h1 class="text-3xl">Lorem Ipsum is simply</h1>
    <p class="font-light">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
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
    <div class="flex justify-center gap-3">
      <input type="text" placeholder="Enter New Task ..." class="bg-white rounded border-2 border-gr w-5/12 px-2 py-1 mt-5">
      <button @click="addNewTask" class="bg-pkd text-white w-24 py-2 mt-5 rounded">Add Task</button>
    </div>

  </div>
</template>

<script>

// @ is an alias to /src

export default {
  name: 'Home',
  components: {

  }
}
</script>
