<template>
  <div>
    <!-- <button @click="toggleModal()" class="btn">Add Task</button> v-if="showModal"-->
    <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-4 mx-auto max-w-6xl">
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div class="flex justify-end">
            <button
              class="font-bold my-1 mx-3"
              type="button"
              @click="closeModal"
            >
              X
            </button>
          </div>

          <div class="pt-3 px-64">
            <h3 class="text-3xl">Add Task</h3>
          </div>
          <form @submit.prevent="addTask" class="px-8 pt-6 pb-8 mb-2 bg-white rounded" >
            <div class="mb-3">
              <label class="label">
                Task Name
              </label>
              <input
                type="text" id="name" name="name" placeholder="Enter Your Task Name ..."
                class="w-full px-3 py-2 mb-3 bg-gray-100 rounded" v-model.trim="enteredName" @blur="validateName"
              />
              <p v-if="invalidNameInput" class="text-red-500 font-light flex justify-start">
                "Please enter task name"</p>
            </div>

            <div class="mb-3">
              <label class="label">
                Detail
              </label>
              <textarea
                rows="4"
                cols="50"
                type="text"
                id="detail"
                name="detail"
                v-model.trim="detail"
                placeholder="Task Detail ..."
                class="w-full px-3 py-2 h-48 mb-3 bg-gray-100 rounded"
              />
            </div>
            <div class="flex flex-col col-span-2">
              <input type="submit" value="Add Task" class="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div> -->
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "add-task",
  emits: ["close","save-task"],
  data() {
    return {
      // showModal: false,
      enteredName: '',
      detail: null,
      invalidNameInput: false,
      url: "http://localhost:5000/tasks",
      tasks: [],
    };
  },
  methods: {
    // toggleModal: function() {
    //   this.showModal = !this.showModal;
    // },
    closeModal() {
      this.$emit("close", true);
    },
    addTask() {
      this.invalidNameInput = this.enteredName === '' ? true : false;
      console.log(`name value: ${this.enteredName}`)
      console.log(`invalid name: ${this.invalidNameInput}`)
      
      if (this.enteredName !== '') {
        this.addNewTask({
          name: this.enteredName,
          detail: this.detail,
        });
        
      this.saveTask();
      this.closeModal();
      
      }
    },
    saveTask() {
      let tasks = {
        name: this.enteredName,
        detail: this.detail,
      };
      this.$emit("save-task", tasks);
    },
      
    validateName() {
      this.invalidNameInput = this.enteredName === '' ? true : false;
      console.log(`name: ${this.invalidNameInput}`);
    },
    // async addNewTask(newTask) {
    //   try {
    //     const res = await fetch(this.url, {
    //       method: "POST",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         name: newTask.name,
    //         detail: newTask.detail,
    //       }),
    //     });
    //     const data = await res.json();
    //     this.tasks = [...this.tasks, data];
    //   } catch (error) {
    //     console.log(`Could not add ${error}`);
    //   }
    //   this.enteredName = ''
    //   this.detail = null
    // },
    // showData(oldData) {
    //   this.isEdit = true
    //   this.editId = oldData.id
    //   this.enteredName = oldData.name
    //   this.detail = oldData.detail
    // },
  },
};
</script>