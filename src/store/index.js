import { createStore } from "vuex";
import persistedstate from "vuex-persistedstate";

export default createStore({
  state: {
    user: {}
  },
  getters: {},
  mutations: {
    user(state, userData) {
      state.user = userData;
    }
  },
  actions: {},
  modules: {},
  plugins: [
    persistedstate({
      paths: ["user"]
    })
  ]
});
