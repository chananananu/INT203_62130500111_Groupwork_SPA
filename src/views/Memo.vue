<template>
  <div class="memo">
    <h1 class="text-4xl">TO DO LIST</h1>
    <p class="font-light text-xl">
      Start managing your to-do lists today!
    </p>
    <!-- <add-task /> -->
    <button @click="toggleMemoModal" class="btn">Add Memo</button>
    <div class="flex justify-center gap-3">
      <router-link to="/">
        <base-button
          buttonLabel="Task"
          buttonColor="bg-pk"
        ></base-button>
      </router-link>
      <router-link to="/memo">
        <base-button
          buttonLabel="Memo"
          buttonColor="bg-yl"
          class="inline-block"
        ></base-button>
      </router-link>
      <router-link to="/checklist">
        <base-button
          buttonLabel="Checklist"
          buttonColor="bg-bl"
        ></base-button>
      </router-link>
      <!-- <add-task v-if="showModal" @save-task="addNewTask" @close="toggleModal"></add-task>
      <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div> -->
      <add-memo v-if="showMemoModal" @save-memo="addNewMemo" @close="toggleMemoModal"></add-memo>
      <div v-if="showMemoModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>

    </div>
      <div class="px-60 py-5">
          <div class="grid grid-cols-3 gap-4"> 

            <div v-for="(memo,index) in myMemo" :key="memo.id">   

              <div class="w-60 rounded-md px-4 py-3 border border-grs h-60 max-h-full">


                
                <div class="flex justify-start">
                  <input type="checkbox" class="form-checkbox h-5 w-5 mt-1 fixed" v-on:click="toggleDone(index)">
                    <div :class="[memo.done ? 'text-gr line-through':'']">
                      <p class="text-left ml-6 text-lg break-all">
                        {{ memo.name }}
                      </p>
                      
                    </div>     
                </div>
                <div class="flex justify-end">
                  <button class="font-bold fixed" type="button"> X </button>
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

      showMemoModal: false
      // isEdit: false,
      // editId: '',
    };
  },
  methods: {
    // toggleModal: function() {
    //   this.showModal = !this.showModal;
    // },

    toggleMemoModal: function() {
      this.showMemoModal = !this.showMemoModal;
    },

    toggleDone(index){
      this.myMemo[index].done = !this.myMemo[index].done
    },


  },

  async created() {
    this.myMemo = await this.getMemo();
  },
};
</script>
