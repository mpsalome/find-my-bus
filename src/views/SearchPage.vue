<template>
  <div class="search__page">
    <div class="search__box">
      <b-field message="What do you want to search?">
        <b-input
          placeholder="Search..."
          type="search"
          v-model="searchTerm"
          icon="magnify"
        >
        </b-input>
        <p class="control">
          <button @click="search" class="button is-dark">Search</button>
        </p>
      </b-field>
    </div>
    <div class="result__box">
      <ListItem v-for="(item, index) in result" :key="index" :title="item.tp" />
    </div>
  </div>
</template>

<script>
import API from "@/services/api";
import ListItem from "@/components/ListItem";

export default {
  name: "SearchPage",
  components: {
    ListItem
  },
  created: () => {
    API.postLogin(process.env.VUE_APP_TOKEN);
  },
  data() {
    return {
      searchTerm: "",
      result: []
    };
  },
  methods: {
    search() {
      this.result = API.getBus(this.searchTerm);
    }
  }
};
</script>
<style lang="scss" scoped></style>
