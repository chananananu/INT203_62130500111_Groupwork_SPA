<template>
  <div>
    <button @click="toggleModal()" class="btn">Add Task</button>
    <div
      v-if="showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <div class="flex justify-end">
            <button
              class="text-red-500 font-bold my-1 mx-3"
              type="button"
              v-on:click="toggleModal()"
            >
              X
            </button>
          </div>

          <div class="pt-7 px-64">
            <h3 class="text-3xl">Add Task</h3>
          </div>
          <form
            @submit.prevent="addTask"
            class="px-8 pt-6 pb-8 mb-4 bg-white rounded"
          >
            <div class="mb-3">
              <label class="label">
                Task Name
              </label>
              <input
                type="text"
                id="id"
                name="name"
                placeholder="Enter Your Task Name ..."
                class="w-full px-3 py-2 mb-3 bg-gray-100 rounded"
                v-model.trim="enteredName"
                @blur="validateName"
              />
              <p
                v-if="invalidNameInput"
                class="text-red-500 font-light flex justify-start"
              >
                "Please enter task name"
              </p>
            </div>

            <div class="mb-3">
              <label class="label">
                Detail
              </label>
              <textarea
                rows="4"
                cols="50"
                type="text"
                id="id"
                name="detail"
                v-model.trim="detail"
                placeholder="Task Detail ..."
                class="w-full px-3 py-2 h-48  mb-3 bg-gray-100 rounded"
              />
            </div>
            <div class="flex flex-col col-span-2">
              <input type="submit" value="Add Task" class="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "add-task",
  data() {
    return {
      showModal: false,
      enteredName: "",
      datail: null,
      invalidNameInput: false,
      url: "http://localhost:5000/tasks",
      tasks: [],
    };
  },
  methods: {
    toggleModal: function() {
      this.showModal = !this.showModal;
    },

    addTask() {
      this.invalidNameInput = this.enteredName === "" ? true : false;
      console.log(`name value: ${this.enteredName}`);
      console.log(`invalid name: ${this.invalidNameInput}`);

      if (this.enteredName) {
        this.addNewTask({
          name: this.enteredName,
          detail: this.detail,
        });
      }
    },

    validateName() {
      this.invalidNameInput = this.enteredName === "" ? true : false;
      console.log(`name: ${this.invalidNameInput}`);
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
    },
  },
};
</script>
