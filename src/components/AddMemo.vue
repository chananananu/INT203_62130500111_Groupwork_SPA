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
            <h3 class="text-3xl">Add Memo</h3>
          </div>
          <form @submit.prevent="addMemo" class="px-8 pt-6 pb-8 mb-2 bg-white rounded" >
            <!-- <div class="mb-3">
              <label class="label">
                Task Name
              </label>
              <input
                type="text" id="name" name="name" placeholder="Enter Your Task Name ..."
                class="w-full px-3 py-2 mb-3 bg-gray-100 rounded" v-model.trim="enteredName" @blur="validateName"
              />
              
            </div> -->
            <div class="mb-3">
              <textarea
                rows="4"
                cols="50"
                type="text"
                id="memo"
                name="memo"
                placeholder="Enter memo ..."
                v-model.trim="enteredMemo"
                 
                class="w-full px-3 py-2 h-48 mb-3 bg-gray-100 rounded"
              />
              <!-- <p v-if="invalidMemoInput" class="text-red-500 font-light flex justify-start">
                "Please enter something"</p> -->
            </div>
            <div class="flex flex-col col-span-2">
              <input type="submit" value="Add Memo" class="submit" />
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
  name: "add-memo",
  emits: ["close","save-memo"],
  data() {
    
    return {
      // showModal: false,
      enteredMemo: '',
      invalidMemoInput: false,
      url: "http://localhost:5000/myMemo",
      myMemo: [],
    };
  },
  methods: {
    // toggleModal: function() {
    //   this.showModal = !this.showModal;
    // },
    closeModal() {
      this.$emit("close", true);
    },
    addMemo() {
      this.invalidMemoInput = this.enteredMemo === '' ? true : false;
      console.log(`memo value: ${this.enteredMemo}`)
      console.log(`invalid memo: ${this.invalidMemoInput}`)
      
      // if (this.enteredMemo !== '') {
      //   this.addNewMemo({
      //     name: this.enteredMemo,
      //   });

      this.saveMemo();
      this.closeModal();
    
      
    },
    saveMemo() {
      let myMemo = {
        name: this.enteredMemo,
      };
      this.$emit("save-memo", myMemo);
    },
      
    // validateName() {
    //   this.invalidMemoInput = this.enteredMemo === '' ? true : false;
    //   console.log(`memo: ${this.invalidMemoInput}`);
    // },
  },
};
</script>