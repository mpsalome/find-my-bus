<template>
  <div v-if="type === 'bus'">
    <div class="list-item">
      <i class="fas fa-bus icon"></i>
      <strong
        >{{ item.displaySign }}-{{ item.direction }}
        {{ item.mainTerminal }}</strong
      >
      <p>{{ item.secondaryTerminal }}</p>
    </div>
  </div>
  <div v-else>
    <i class="fas fa-map-marker-alt icon "></i>
    <strong>{{ item.name }}</strong>
    <p>{{ item.address }}</p>
  </div>
</template>

<script>
export default {
  name: "ListItem",
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
  height: 70px;
  padding: 10px;
  .icon {
    font-size: 20px;
  }
  p {
    color: #595959;
  }
  &:hover {
    background-color: #b0b0b0;
  }
}
</style>
