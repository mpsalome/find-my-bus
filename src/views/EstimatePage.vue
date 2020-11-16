<template>
  <div class="estimate__page">
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
    />
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
    <div v-if="type === 'bus'">
      <div class="field">
        <p>
          Linha selecionada:
          <b-tag
            >{{ bus.displaySign }}
            {{
              bus.direction === 1 ? bus.mainTerminal : bus.secondaryTerminal
            }}</b-tag
          >
        </p>
      </div>
      <EstimateItem
        v-for="(item, index) in estimate.stops"
        :key="index"
        :item="item"
        :type="type"
      />
    </div>
    <div v-else>
      <div class="field">
        <p>
          Ponto selecionado: <b-tag>{{ busStop.name }}</b-tag>
        </p>
      </div>
      <EstimateItem
        v-for="(item, index) in estimate.stop.lines"
        :key="index"
        :item="item"
        :type="type"
      />
    </div>
    <fab
      :position="position"
      :bg-color="bgColor"
      :actions="fabActions"
      :main-icon="mainIcon"
      @changeBus="changeBus"
      :fixed-tooltip="true"
      @changeBusStop="changeBusStop"
    ></fab>
  </div>
</template>

<script>
import * as busPromise from "bus-promise";
import EstimateItem from "@/components/EstimateItem";
import fab from "vue-fab";

export default {
  name: "EstimatePage",
  components: {
    EstimateItem,
    fab
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
      estimate: {},
      bgColor: "#2C3034",
      position: "bottom-right",
      mainIcon: "swap_horiz",
      fabActions: [
        {
          name: "changeBus",
          icon: "directions_bus",
          tooltip: "Trocar linha"
        },
        {
          name: "changeBusStop",
          icon: "location_on",
          tooltip: "Trocar ponto"
        }
      ]
    };
  },
  created() {
    this.getEstimate();
  },
  methods: {
    getEstimate() {
      this.isLoading = true;
      if (
        JSON.stringify(this.bus) !== "{}" ||
        JSON.stringify(this.busStop) !== "{}"
      ) {
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
      busPromise
        .find({
          auth,
          type: "lineForecast",
          lineId: this.bus.lineId
        })
        .then(res => {
          this.estimate = res;
          this.isLoading = false;
        })
        .catch(error => {
          this.showToast(`Error: ${error}`, "is-dange");
        });
    },
    setEstimateByBusStop(auth) {
      busPromise
        .find({
          auth,
          type: "stopForecast",
          stopId: this.busStop.stopId
        })
        .then(res => {
          this.estimate = res;
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
    },
    changeBus() {
      this.$router.push({
        name: "Bus"
      });
    },
    changeBusStop() {
      this.$router.push({
        name: "BusStop"
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
