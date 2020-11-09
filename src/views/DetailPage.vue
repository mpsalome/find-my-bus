<template>
  <div class="detail__page">{{ bus }}{{ busStop }}</div>
</template>

<script>
export default {
  name: "DetailPage",
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
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped></style>
