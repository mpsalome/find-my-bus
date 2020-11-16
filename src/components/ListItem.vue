<template>
  <div class="list-item" v-if="type === 'bus'" @click="$emit('click')">
    <strong>
      <i class="fas fa-bus icon"></i>
      {{ item.displaySign }}
      {{
        item.direction === 1 ? item.mainTerminal : item.secondaryTerminal
      }}</strong
    >
  </div>
  <div class="list-item" v-else @click="$emit('click')">
    <strong><i class="fas fa-map-marker-alt icon "></i>{{ item.name }}</strong>
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
  &:hover {
    background-color: #b0b0b0;
    cursor: pointer;
  }
  strong{
    align-self: flex-start;
  }
}
</style>
