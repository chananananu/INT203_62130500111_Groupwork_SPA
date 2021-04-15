<template>
  <div class="memo">
    <h1 class="text-4xl">TO DO LIST</h1>
    <p class="font-light text-xl">Start managing your to-do lists today!</p>
    <button @click="toggleMemoModal" class="btn">Add Memo</button>
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
      <add-memo v-if="showMemoModal" @save-memo="addNewMemo" @close="toggleMemoModal"></add-memo>
      <div v-if="showMemoModal" class="show-modal"></div>
    </div>
      <div class="px-60 py-5">
        <div class="grid grid-cols-3 gap-4"> 
          <div v-for="(memo,index) in myMemo" :key="memo.id">   
            <div class="memo-card">
              <div class="flex justify-start">
                <input type="checkbox" class="form-checkbox h-4 w-4 mt-1 absolute " v-on:click="toggleDone(index)">
                <div :class="[memo.done ? 'text-gr line-through':'']">
                  <p class="memo-name">{{ memo.name }}</p>
                </div>
                <div class="absolute right-3">
                  <button class="font-bold" type="button" @click="deleteMemo(memo.id)">
                    <span class="material-icons">highlight_off</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

import AddMemo from "../components/AddMemo.vue";
// @ is an alias to /src

export default {
  components: {
    AddMemo
  },

  data() {
    return {
      url: "http://localhost:5000/myMemo",
      myMemo: [],
      done: false,
      showMemoModal: false,
      isEdit: Boolean,
    };
  },

  methods: {
    toggleMemoModal: function() {
      this.showMemoModal = !this.showMemoModal;
    },

    toggleDone(index){
      this.myMemo[index].done = !this.myMemo[index].done
    },
 
    async addNewMemo(newMemo) {
      try {
        const res = await fetch(this.url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: newMemo.name,
            
          }),
        });
        const data = await res.json();
        this.myMemo = [...this.myMemo, data];
      } catch (error) {
        console.log(`Could not add ${error}`);
      }
      this.enteredMemo = ''
    },

    async getMemo() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    async deleteMemo(deleteId) {
      try {
        await fetch(`${this.url}/${deleteId}`, {
          method: 'DELETE'
        })
        this.myMemo = this.myMemo.filter(
          (memo) => memo.id !== deleteId
        )
      } catch (error) {
        console.log(`Could not delete! ${error}`)
      }
    }
  },

  async created() {
    this.myMemo = await this.getMemo();
  }
};
</script>
