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
        @click="goTo(item)"
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
import * as busPromise from "bus-promise";
import { mapActions } from "vuex";

export default {
  name: "SearchPage",
  components: {
    ListItem
  },
  computed: {
    bus() {
      return this.$store.state.bus;
    },
    busStop() {
      return this.$store.state.busStop;
    }
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
    ...mapActions(["setBus", "setBusStop"]),
    search() {
      this.isLoading = true;
      busPromise
        .auth(`${process.env.VUE_APP_TOKEN}`)
        .then(this.$route.name === "Bus" ? this.getLines : this.getStops)
        .catch(error => {
          this.showToast(`Erro: ${error}`, "is-danger");
          this.isLoading = false;
        });
    },
    goTo(item) {
      if (
        JSON.stringify(this.bus) !== "{}" &&
        JSON.stringify(this.busStop) !== "{}"
      ) {
        this.$router.push({
          name: "EstimatePage"
        });
      } else {
        if (this.type === "bus") {
          this.setBus(item);
          this.$router.push({
            name: "BusStop",
            params: { type: this.type }
          });
        } else {
          this.setBusStop(item);
          this.$router.push({
            name: "Bus",
            params: { type: this.type }
          });
        }
      }
    },
    getLines(auth) {
      this.type = "bus";
      busPromise
        .find({
          auth,
          type: "lines",
          terms: this.searchTerm
        })
        .then(res => {
          this.result = res;
          this.isLoading = false;
          if (res.length === 0) {
            this.showToast(`Nenhum resultado encontrado!`, `is-warning`);
          }
        })
        .catch(error => {
          this.showToast(`Erro: ${error}`, "is-danger");
          this.isLoading = false;
        });
    },
    getStops(auth) {
      this.type = "stop";
      busPromise
        .find({
          auth,
          type: "stops",
          terms: this.searchTerm
        })
        .then(res => {
          this.result = res;
          this.isLoading = false;
          if (res.length === 0) {
            this.showToast(`Nenhum resultado encontrado!`, `is-warning`);
          }
        })
        .catch(error => {
          this.showToast(`Erro: ${error}`, "is-danger");
          this.isLoading = false;
        });
    },
    showToast(message, type) {
      this.$buefy.toast.open({
        duration: 5000,
        message: `${message}`,
        type: `${type}`
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
