<template>
  <div class="home">
    <h1 class="text-4xl">TO DO LIST</h1>
    <p class="font-light text-xl">Start managing your to-do lists today!</p>
    <button @click="toggleModal" class="btn">Add Task</button>
    <div class="flex justify-center gap-3">
      <router-link to="/">
        <base-button buttonLabel="Task" buttonColor="bg-pk"></base-button>
      </router-link>
      <router-link to="/memo">
        <base-button buttonLabel="Memo" buttonColor="bg-yl"></base-button>
      </router-link>
      <router-link to="/checklist">
        <base-button buttonLabel="Checklist" buttonColor="bg-bl"></base-button>
      </router-link>
      <add-task v-if="showModal" @save-task="addNewTask" @close="toggleModal"></add-task>
      <div v-if="showModal" class="show-modal"></div>
    </div>
      <div class="px-60 py-5 flex-auto ">
          <div class="space-y-3">
            <div v-for="(task,index) in tasks" :key="task.id">       
              <div class="task-card">
                <table class='w-full'>
                  <tr>
                    <td class="">
                      <div class="flex justify-start">
                        <input type="checkbox" class="form-checkbox h-5 w-5 mt-1" v-on:click="toggleDone(index)">
                          <div :class="[task.done ? 'text-gr line-through':'']">
                            <h3 class="ml-3 text-lg tracking-wide">{{ task.name }}</h3>
                          </div>
                      </div>
                      <div class="flex justify-start">
                        <p class="task-detail">{{ task.detail }}</p>
                      </div>
                    </td>
                    <td class="pt-2 text-right ">
                      <button class="" @click="deleteTask(task.id)">
                        <span class="material-icons">delete</span>
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
  </div>   
</template>

<script>

import AddTask from "../components/AddTask.vue";

// @ is an alias to /src

export default {
  components: {
    AddTask
  },
  data() {
    return {
      url: "http://localhost:5000/tasks",
      tasks: [],
      done: false,
      showModal: false,
    };
  },

  methods: {
    toggleModal: function() {
      this.showModal = !this.showModal;
    },

    toggleDone(index){
      this.tasks[index].done = !this.tasks[index].done
    },
   
    async addNewTask(newTask) {
      try {
        const res = await fetch(this.url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: newTask.name,
            detail: newTask.detail,
          }),
        });
        const data = await res.json();
        this.tasks = [...this.tasks, data];
      } catch (error) {
        console.log(`Could not add ${error}`);
      }
      this.enteredName = ''
      this.detail = null
    },

    async getTasks() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    async deleteTask(deleteId) {
      try {
        await fetch(`${this.url}/${deleteId}`, {
          method: 'DELETE'
        })
        this.tasks = this.tasks.filter(
          (task) => task.id !== deleteId
        )
      } catch (error) {
        console.log(`Could not delete! ${error}`)
      }
    }
  },

  async created() {
    this.tasks = await this.getTasks();
  }
};
</script>
