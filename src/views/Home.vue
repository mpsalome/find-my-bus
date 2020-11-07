<template>
  <div class="home">
    <div class="box__options">
      <router-link to="/bus">
        <div class="go-to">
          <i class="fas fa-bus icon bus"></i>
          <h2 class="title">Pesquisar Linha</h2>
        </div>
      </router-link>
      <router-link to="/bus-stop">
        <div class="go-to">
          <i class="fas fa-map-marker-alt icon bus-stop"></i>
          <h2 class="title">Pesquisar Parada</h2>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>
<style lang="scss" scoped>
.box__options {
  display: flex;
  flex-direction: column;
}
.go-to {
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 250px;
  height: 120px;
  margin: 0 auto 29px;
  border: 1px solid #dddd;
  .icon {
    font-size: 3em;
    display: block;
    margin: 0 auto 8px;
    width: 3em;
    height: auto;
  }
  .title {
    font-size: 1.5em;
  }
  &:hover {
    background-color: #ddd;
    .title,
    .icon {
      color: #616161;
    }
  }
}
</style>
