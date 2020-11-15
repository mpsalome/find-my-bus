<template>
  <div class="estimate__page">
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
    <div v-if="type === 'bus'">
      <EstimateItem
        v-for="(item, index) in estimate.stops"
        :key="index"
        :item="item"
        :type="type"
      />
    </div>
    <div v-else>
      <EstimateItem
        v-for="(item, index) in estimate.stop.lines"
        :key="index"
        :item="item"
        :type="type"
      />
    </div>
  </div>
</template>

<script>
import * as busPromise from "bus-promise";
import EstimateItem from "@/components/EstimateItem";
export default {
  name: "EstimatePage",
  components: {
    EstimateItem
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
      isLoading: false,
      type: this.$route.params.type,
      estimate: {}
    };
  },
  mounted() {
    this.getEstimate();
  },
  methods: {
    getEstimate() {
      if (
        JSON.stringify(this.bus) !== "{}" ||
        JSON.stringify(this.busStop) !== "{}"
      ) {
        this.isLoading = true;
        busPromise
          .auth(`${process.env.VUE_APP_TOKEN}`)
          .then(
            this.type === "bus"
              ? this.setEstimateByBus
              : this.setEstimateByBusStop
          )
          .catch(error => {
            this.showToast(`Erro: ${error}`, "is-danger");
            this.isLoading = false;
          });
      }
    },
    setEstimateByBus(auth) {
      console.log("estimate by bus");
      busPromise
        .find({
          auth,
          type: "lineForecast",
          lineId: this.bus.lineId
        })
        .then(res => {
          this.estimate = res;
          console.log(res);
          this.isLoading = false;
        })
        .catch(error => {
          this.showToast(`Error: ${error}`, "is-dange");
        });
    },
    setEstimateByBusStop(auth) {
      console.log("estimate by bus stop");
      busPromise
        .find({
          auth,
          type: "stopForecast",
          stopId: this.busStop.stopId
        })
        .then(res => {
          this.estimate = res;
          console.log("olha aqui");
          console.log(res);
          this.isLoading = false;
        })
        .catch(error => {
          this.showToast(`Error: ${error}`, "is-dange");
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
