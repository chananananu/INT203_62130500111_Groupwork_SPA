<template>
  <div class="checklist">
    <h1 class="text-4xl">TO DO LIST</h1>
    <p class="font-light text-xl">Start managing your to-do lists today!</p>
    <button @click="toggleChecklistModal" class="btn">Add Checklist</button>
    <div class="flex justify-center gap-3">
      <router-link to="/">
        <base-button buttonLabel="Task" buttonColor="bg-pk"></base-button>
      </router-link>
      <router-link to="/memo">
        <base-button buttonLabel="Memo" buttonColor="bg-yl"></base-button>
      </router-link>
      <router-link to="/checklist">
        <base-button buttonLabel="Checklist" buttonColor="bg-bl" ></base-button>
      </router-link>
    </div>
      <form v-if="showChecklistField" @submit.prevent="addChecklist" class="checklist-field">
        <div class="flex">      
          <input type="text" name="checklist" placeholder="Enter Checklist ..." class="w-full px-3 py-2 bg-gray-100 rounded "
            v-model.trim="enteredChecklist"/>
              <input type="submit" value="Add" class="btn-add-checklist" />
        </div>
      </form>
      <div class="px-60 py-5">
        <div class="checklist-box"> 
          <div v-for="(checklist,index) in checklists" :key="checklist.id">
            <div class="w-full px-4">
              <div class="flex justify-start">
                <input type="checkbox" class="form-checkbox h-4 w-4 mt-1" v-on:click="toggleDone(index)">
                <div :class="[checklist.done ? 'text-gr line-through':'']">
                  <p class="ml-2 mr-5 mb-2 text-left text-md break-all">{{ checklist.name }}</p>
                </div>
                <button @click="showData(checklist)">
                  <span class="material-icons">edit</span>
                </button>
              </div>      
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

// @ is an alias to /src

export default {
  components: {
    
  },
  data() {
    return {
      enteredChecklist: "",
      url: "http://localhost:5000/checklists",
      checklists: [],
      done: false,
      showChecklistField: false,
      isEdit: false,
      editId: ''
    };
  },

  methods: {
    toggleChecklistModal: function() {
      this.showChecklistField = !this.showChecklistField;
    },

    toggleDone(index){
      this.checklists[index].done = !this.checklists[index].done
    },

    addChecklist() {
      if (this.enteredChecklist !== '') {

        if (this.isEdit) {
          this.editChecklist({
            id: this.editId,
            name: this.enteredChecklist,
          })
        } else {
          this.addNewChecklist({
            name: this.enteredChecklist,
          })
        }
      }
      this.enteredChecklist = ''
    },

    showData(oldData) {
      this.isEdit = true
      this.editId = oldData.id
      this.enteredChecklist = oldData.name
    },

    async editChecklist(editingChecklist) {
      try {
        const res = await fetch(`${this.url}/${editingChecklist.id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            name: editingChecklist.name,
          })
        })
        const data = await res.json()
        this.checklists = this.checklists.map((checklist) =>
          checklist.id === editingChecklist.id
            ? { ...checklist, name: data.name }
            : checklist
        )
        this.isEdit = false
        this.editId = ''
        this.enteredChecklist = ''
      } catch (error) {
        console.log(`Could not edit! ${error}`)
      }
    },

    async addNewChecklist(newChecklist) {
      try {
        const res = await fetch(this.url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: newChecklist.name,
          }),
        });
        const data = await res.json();
        this.checklists = [...this.checklists, data];
      } catch (error) {
        console.log(`Could not add ${error}`);
      }
      this.enteredChecklist = ''
    },

    async getChecklist() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    }

  },

    async created() {
    this.checklists = await this.getChecklist();
  }

};
</script>
