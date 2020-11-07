<template>
  <header>
    <sidebar-menu :menu="menu" :collapsed="true" style="z-index: 2;" />
    <i class="fas fa-bus logo"></i>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {},
  components: {},
  data() {
    return {
      menu: [
        {
          href: "/",
          title: "Página Inicial",
          icon: "fa fa-home"
        },
        {
          href: "/onibus",
          title: "Encontrar Ônibus",
          icon: "fa fa-bus"
        },
        {
          href: "/ponto",
          title: "Encontrar Ponto",
          icon: "fa fa-map-marker-alt"
        }
      ]
    };
  }
};
</script>
<style scoped>
header {
  min-width: 100%;
  height: 6vh;
  background-color: #000;
  position: fixed;
  top: 0;
  margin: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 55px;
}
.logo {
  color: white;
  font-size: 2em;
}
</style>
