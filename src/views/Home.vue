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
          <div v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }">
            <!-- <p>
                Collaboratively administrate empowered markets via
                plug-and-play networks. Dynamically procrastinate B2C users
                after installed base benefits.
                <br />
                <br />
                Dramatically visualize customer directed convergence
                without revolutionary ROI.
              </p> -->

            <ul v-for="task in tasks" :key="task.id">
              <li>
                <span>{{ task.name }}</span> <br />
                <span> {{ task.detail }}</span>
              </li>
            </ul>
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
      showModal: false,
      enteredName: "",
      datail: null,
      invalidNameInput: false,
      url: "http://localhost:5000/tasks",
      tasks: [],
      openTab: 1,
    };
  },
  methods: {
    toggleTabs: function(tabNumber) {
      this.openTab = tabNumber;
    },

    async getTasks() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
  },
  async created() {
    this.tasks = await this.getTasks();
  },
};
</script>
