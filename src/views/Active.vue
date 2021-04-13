<template>
  <div class="active">
    <h1 class="text-4xl">TO DO LIST</h1>
    <p class="font-light text-xl">
      Start managing your tasks to-do lists today!
    </p>
    <!-- <add-task /> -->
    <button @click="toggleModal" class="btn">Add Task</button>
    <div class="flex justify-center gap-3">
      <router-link to="/">
        <base-button
          buttonLabel="All Task"
          buttonColor="bg-pk"
          v-on:click="toggleTabs(1)"
        ></base-button>
      </router-link>
      <router-link to="/active">
        <base-button
          buttonLabel="Active Task"
          buttonColor="bg-yl"
          class="inline-block"
          v-on:click="toggleTabs(2)"
        ></base-button>
      </router-link>
      <router-link to="/complete">
        <base-button
          buttonLabel="Complete Task"
          buttonColor="bg-bl"
          v-on:click="toggleTabs(3)"
        ></base-button>
      </router-link>
      <add-task v-if="showModal" @save-task="addNewTask" @close="toggleModal"></add-task>
      <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
      <div class="px-60 py-5 flex-auto ">
        <div v-bind:class="{ hidden: openTab !== 2, block: openTab === 2 }">
          <div class="space-y-3">

            <div v-for="(task,index) in tasks" :key="task.id">       

              <div class="w-full rounded-md px-4 py-3 border border-grs outline-none focus:outline-none">
              <table class='w-full'>
                <tr>
                    <td class="">
                        <div class="flex justify-start">
                          <input type="checkbox" class="form-checkbox h-5 w-5 mt-1" v-on:click="toggleDone(index)">
                          <div :class="[task.done ? 'text-gr line-through':'']">
                          <h3 class="ml-3 text-lg tracking-wide">
                            {{ task.name }}
                          </h3>
                          </div>
                        </div>

                        <div class="flex justify-start">
                          <p class="ml-8 text-grs font-light">
                            {{ task.detail }}
                          </p>
                        </div>
                    </td>
                    <td class="pt-2 text-right">
                      <button class="px-2" >
                        <span class="material-icons" @click="showData(task)">
                          edit
                        </span>
                      </button>
                      <button class="px-2" @click="deleteTask(task.id)">
                        <span class="material-icons">
                          delete
                        </span>
                      </button>
                    </td>
                </tr>
              </table>
              </div>
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
    AddTask,
  },
  data() {
    return {
      url: "http://localhost:5000/tasks",
      tasks: [],
      openTab: 2,
      done: false,
      showModal: false,
      // isEdit: false,
      // editId: '',
    };
  },
  methods: {
    toggleModal: function() {
      this.showModal = !this.showModal;
    },

    toggleTabs: function(tabNumber) {
      this.openTab = tabNumber;
    },

    toggleDone(index){
      this.tasks[index].done = !this.tasks[index].done
    },

    showData(oldData) {
      this.isEdit = true
      this.editId = oldData.id
      this.enteredName = oldData.name
      this.detail = oldData.detail
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
  },
};
</script>
