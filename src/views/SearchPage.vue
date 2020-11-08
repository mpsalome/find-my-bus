<template>
  <div class="search__page">
    <div class="search__box">
      <b-field
        :message="
          this.$route.name === 'Bus'
            ? 'Procure seu ônibus'
            : 'Procure sua parada'
        "
      >
        <b-input
          placeholder="Search..."
          type="search"
          v-model="searchTerm"
          icon="magnify"
          required
        >
        </b-input>
        <p class="control">
          <button @click="search" class="button is-dark">Search</button>
        </p>
      </b-field>
    </div>
    <div class="result__box">
      <ListItem
        v-for="(item, index) in result"
        :key="index"
        :item="item"
        :type="type"
      />
      <b-loading
        :is-full-page="true"
        v-model="isLoading"
        :can-cancel="false"
      ></b-loading>
    </div>
  </div>
</template>

<script>
import ListItem from "@/components/ListItem";
import * as bus from "bus-promise";

export default {
  name: "SearchPage",
  components: {
    ListItem
  },
  data() {
    return {
      searchTerm: "",
      result: [],
      type: "",
      isLoading: false
    };
  },
  methods: {
    search() {
      this.isLoading = true;
      bus
        .auth(`${process.env.VUE_APP_TOKEN}`)
        .then(this.$route.name === "Bus" ? this.getLines : this.getStops);
    },
    getLines(auth) {
      this.type = "bus";
      bus
        .find({
          auth,
          type: "lines",
          terms: this.searchTerm
        })
        .then(res => {
          this.result = res;
          console.log(res);
          this.isLoading = false;
        });
    },
    getStops(auth) {
      this.type = "stop";
      bus
        .find({
          auth,
          type: "stops",
          terms: this.searchTerm
        })
        .then(res => {
          this.result = res;
          console.log(res);
          this.isLoading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>
