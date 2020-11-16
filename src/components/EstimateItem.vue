<template>
  <div>
    <div v-if="type === 'bus'">
      <div class="list-item">
        <strong
          ><i class="fas fa-map-marker-alt icon"></i> {{ item.name }}</strong
        >
        <div v-if="item.vehicles.length">
          <p>Horários dos Próximos veículos:</p>
          <ul>
            <li v-for="(vehicle, index) in item.vehicles" :key="index">
              <p class="bus__hour">
                <i class="fas fa-clock icon"></i> {{ vehicle.hour }}
              </p>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>
            Infelizmente não foi possível encontrar os horários para esse ponto.
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="list-item">
        <strong>
          <i class="fas fa-bus icon"></i>{{ item.displaySign }}
          {{
            item.direction === 1 ? item.mainTerminal : item.secondaryTerminal
          }}
        </strong>
        <p
          class="bus__hour bus__hour--alt"
          v-for="(bus, index) in item.vehicles"
          :key="index"
        >
          <i class="fas fa-clock icon"></i> {{ bus.hour }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Estimate",
  props: {
    item: {},
    type: String
  },
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.selectAndFormat();
  },
  methods: {
    selectAndFormat() {
      document.getElementsByClassName("bus__hour--alt").forEach(element => {
        element.innerText = this.formatDate(element.innerText);
      });
    },
    formatDate(dateString) {
      return new Date(dateString)
        .toLocaleTimeString()
        .split(":", 2)
        .join(":");
    }
  }
};
</script>
<style lang="scss" scoped>
.list-item {
  border-bottom: 1px solid #b0b0b0;
  height: auto;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  .icon {
    font-size: 20px;
  }
  p {
    color: #595959;
  }
  i,
  strong {
    align-self: flex-start;
  }
  .bus__hour {
    animation: color-change 4s infinite;

    @keyframes color-change {
      0% {
        color: rgb(7, 77, 7);
      }
      50% {
        color: rgb(128, 209, 8);
      }
      100% {
        color: rgb(7, 77, 7);
      }
    }
  }
}
</style>
