<template>
  <div class="checklist">
    <h1 class="text-4xl">TO DO LIST</h1>
    <p class="font-light text-xl">
      Start managing your to-do lists today!
    </p>
    <!-- <add-task /> -->
    <button @click="toggleChecklistModal" class="btn">Add Checklist</button>
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

    };
  },
  methods: {
    
  }


};
</script>
