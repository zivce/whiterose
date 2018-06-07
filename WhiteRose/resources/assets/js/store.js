import Vue from "vue";
import errorNotify from "../js/components/toastr/FormErrorToaster";

import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
    role: "",
    email: "",
    id: "",
    sites: "",
    scans: "",
    tokens: null,
    stars: 0,
    test: 1,
    job_for_edit : null
  },
  mutations: {
    setTest (state,payload) {
      state.test = payload.test;
    },
    setUser(state, payload) {
      state.role = payload.role;
      state.user = payload;
      state.email = payload.user.email;
      state.id = payload.user.id;
    },
    setTokens(state, payload) {
      state.tokens = Number(state.tokens) + Number(payload.tokens);
    },
    decrementTokens(state, payload) {
      let decremented_tokens = Number(state.tokens) - Number(payload.tokens);

      if (decremented_tokens < 0)
        payload.vm.errorToast("Insufficient tokens", "Error!");
      else state.tokens = decremented_tokens;
    },
    setJobForEdit(state,payload){
      state.job_for_edit = payload
    },
    setRating(state, payload) {
      state.stars = payload.rating;
    },
    setSites(state, payload) {
      state.sites = payload;
    },
    setScans(state, payload) {
      state.scans = payload;
    }
  },
  getters: {
    returnSites: state => state.sites,
    returnTest : state => state.test,
    returnJobForEdit : state => state.job_for_edit,
    returnRating: state => state.stars,
    returnTokens: state => {
      return state.tokens;
    },
    returnParams: state => {
      return state.route.params;
    },
    returnRoute: state => {
      return state.route.fullPath;
    },
    returnRole: state => {
      return state.role;
    },
    returnUser: state => {
      return state.user;
    },
    returnEmail: state => {
      return state.email;
    },
    returnId: state => {
      return state.id;
    }
  }
});
export default store;
