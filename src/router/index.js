import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SearchPage from "../views/SearchPage.vue";
import DetailPage from "../views/DetailPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/bus",
    name: "Bus",
    component: SearchPage
  },
  {
    path: "/bus-stop",
    name: "BusStop",
    component: SearchPage
  },
  {
    path: "/detail/:type",
    name: "DetailPage",
    component: DetailPage
  }
];

const router = new VueRouter({
  routes
});

export default router;
