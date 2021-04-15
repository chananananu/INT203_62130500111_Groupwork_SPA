<template>
  <div>
    <div class="task-modal">
      <div class="relative w-auto my-4 mx-auto max-w-6xl">
        <div class="modal-border">
          <div class="flex justify-end">
            <button class="font-bold my-1 mx-3" type="button" @click="closeModal"> X </button>
          </div>
          <div class="pt-3 px-64">
            <h3 class="text-3xl">Add Memo</h3>
          </div>
          <form @submit.prevent="addMemo" class="form-modal" >
            <div class="mb-3">
              <textarea rows="4" cols="50" type="text" id="memo" name="memo"
                placeholder="Enter memo ..." v-model.trim="enteredMemo" class="input-detail"/>
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
  name: "add-memo",
  emits: ["close","save-memo"],
  data() {
    return {
      enteredMemo: '',
      invalidMemoInput: false,
      url: "http://localhost:5000/myMemo",
      myMemo: []
    };
  },

  methods: {
    closeModal() {
      this.$emit("close", true);
    },

    addMemo() {
      this.invalidMemoInput = this.enteredMemo === '' ? true : false;
      console.log(`memo value: ${this.enteredMemo}`)
      console.log(`invalid memo: ${this.invalidMemoInput}`)
      
      if (this.enteredMemo === '') {
        this.addNewMemo({
          name: this.enteredMemo,
        }) 
      } else {
          this.saveMemo();
          this.closeModal();
      } 
    },

    saveMemo() {
      let myMemo = {
        name: this.enteredMemo,
      };
      this.$emit("save-memo", myMemo);
    }
  }
};
</script>