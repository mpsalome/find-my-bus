<template>
  <div class="detail__page">
    <div v-if="JSON.stringify(bus) === '{}'">
      <b-message type="is-warning" has-icon>
        Por favor
        <router-link to="/bus"> selecione seu ônibus </router-link> antes de
        continuar.
      </b-message>
    </div>
    <div v-else-if="JSON.stringify(busStop) === '{}'">
      <b-message type="is-warning" has-icon>
        Por favor
        <router-link to="/bus-stop"> selecione sua parada </router-link> antes
        de continuar.
      </b-message>
    </div>
    <div v-else>
      Previsão de chegada: {{ estimate.hour }}
      <br />
      <router-link to="/bus">selecionar outro onibus</router-link>
      <br />
      <router-link to="/bus-stop">selecionar outra parada</router-link>
    </div>
  </div>
</template>

<script>
import * as busPromise from "bus-promise";

export default {
  name: "EstimatePage",
  components: {},
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
      isLoading: false,
      estimate: {}
    };
  },
  mounted() {
    this.getEstimate();
  },
  methods: {
    getEstimate() {
      if (
        JSON.stringify(this.bus) !== "{}" &&
        JSON.stringify(this.busStop) !== "{}"
      ) {
        this.isLoading = true;
        busPromise
          .auth(`${process.env.VUE_APP_TOKEN}`)
          .then(this.setEstimate)
          .catch(error => {
            this.showToast(`Erro: ${error}`, "is-danger");
            this.isLoading = false;
          });
      }
    },
    setEstimate(auth) {
      busPromise
        .find({
          auth,
          type: "arrivalForecast",
          stopId: this.busStop.stopId,
          lineId: this.bus.lineId
        })
        .then(res => {
          this.estimate = res;
          this.isLoading = false;
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
