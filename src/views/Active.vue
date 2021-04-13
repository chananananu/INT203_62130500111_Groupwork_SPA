<template>
  <div class="active">
    <h1 class="text-4xl">TO DO LIST</h1>
    <p class="font-light text-xl">
      Start managing your tasks to-do lists today!
    </p>
    <add-task />
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
    </div>
    <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded"
    >
      <div class="px-4 py-5 flex-auto">
        <div class="tab-content tab-space">
          <div v-bind:class="{ hidden: openTab !== 2, block: openTab === 2 }">
            <p>
              Completely synergize resource taxing relationships via premier
              niche markets. Professionally cultivate one-to-one customer
              service with robust ideas.
              <br />
              <br />
              Dynamically innovate resource-leveling customer service for state
              of the art customer service.
            </p>
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
      openTab: 2,
    };
  },
  methods: {
    toggleTabs: function(tabNumber) {
      this.openTab = tabNumber;
    },
  },
};
</script>
