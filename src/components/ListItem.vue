<template>
  <div class="list-item">
    <i v-if="type === 'bus'" class="fas fa-bus icon bus"></i>
    <i v-else class="fas fa-map-marker-alt icon bus-stop"></i>
    <strong>{{ title }}</strong>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    type: String,
    title: String,
    text: String
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
  }
  p{
   color: #595959
  }
  &:hover {
    background-color: #b0b0b0;
  }
}
</style>
