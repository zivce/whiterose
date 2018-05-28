import Vue from "vue";
import errorNotify from "@/toastr/FormErrorToaster";

import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  
    test: 1,
  },
  mutations: {
    setTest (state,payload) {
      state.test = payload.test;
    },
  },
  getters: {
    returnTest : state => state.test,
  }
});
export default store;
