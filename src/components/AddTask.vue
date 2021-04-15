<template>
  <div>
    <div class="task-modal">
      <div class="relative w-auto my-4 mx-auto max-w-6xl">
        <div class="modal-border">
          <div class="flex justify-end">
            <button class="font-bold my-1 mx-3" type="button" @click="closeModal"> X </button>
          </div>
          <div class="pt-3 px-64">
            <h3 class="text-3xl">Add Task</h3>
          </div>
          <form @submit.prevent="addTask" class="form-modal" >
            <div class="mb-3">
              <label class="label">Task Name</label>
              <input type="text" id="name" name="name" placeholder="Enter Your Task Name ..." class="input-title"
              v-model.trim="enteredName" @blur="validateName"/>
                <p v-if="invalidNameInput" class="error">"Please enter task name"</p>
            </div>
            <div class="mb-3">
              <label class="label">Detail</label>
              <textarea rows="4" cols="50" type="text" id="detail" name="detail"
                v-model.trim="detail" placeholder="Task Detail ..." class="input-detail"/>
            </div>
            <div class="flex flex-col col-span-2">
              <input type="submit" value="Add" class="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-task",
  emits: ["close","save-task"],
  data() {
    return {
      enteredName: '',
      detail: null,
      invalidNameInput: false,
      url: "http://localhost:5000/tasks",
      tasks: [],
    };
  },

  methods: {
    closeModal() {
      this.$emit("close", true);
    },
    addTask() {
      this.invalidNameInput = this.enteredName === '' ? true : false;
      console.log(`name value: ${this.enteredName}`)
      console.log(`invalid name: ${this.invalidNameInput}`)
      
      if (this.enteredName === '') {
        this.addNewTask({
          name: this.enteredName,
          detail: this.detail,
        })
      } else {
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
    }
  }
};
</script>