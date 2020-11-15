<template>
  <div class="list-item">
    <div v-if="type === 'bus'">
      <div v-if="item.vehicles.length">
        <i class="fas fa-map-marker-alt icon"></i>
        <strong>{{ item.name }}</strong>
        <p>Horários dos Próximos veículos:</p>
        <ul>
          <li v-for="(vehicle, index) in item.vehicles" :key="index">
            <p class="bus__hour">
              <i class="fas fa-bus icon"></i> {{ vehicle.hour }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      {{ item.displaySign }}
      {{ item.direction === 1 ? item.mainTerminal : item.secondaryTerminal }}
      <br />
      <p v-for="(bus, index) in item.vehicles" :key="index">
        {{ bus.hour }}
      </p>
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
  .icon {
    font-size: 20px;
  }
  p {
    color: #595959;
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
