import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bus: {},
    busStop: {}
  },
  mutations: {
    SET_BUS(store, obj) {
      store.bus = obj;
    },
    SET_BUS_STOP(store, obj) {
      store.busStop = obj;
    }
  },
  actions: {
    setBus({ commit }, obj) {
      commit("SET_BUS", obj);
    },
    setBusStop({ commit }, obj) {
      commit("SET_BUS", obj);
    }
  }
});
