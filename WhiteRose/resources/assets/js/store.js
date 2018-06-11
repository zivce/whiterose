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
    sites: [],
    scans: "",
    tokens: null,
    stars: 0,
    test: 1,
    job_for_edit : null,
    jobs:[],
    avatar_convo_path : undefined,

    //UI state
    

  },
  mutations: {
    setAvatarConvoPath(state, payload){
      state.avatar_convo_path = payload;
    },
    setJobs(state, payload) {
      state.jobs = payload;
    },
    setAvatar(state, payload) {

      let _user = localStorage.getItem("r");
      _user = JSON.parse(_user);
      _user.avatar = payload; 
      _user = JSON.stringify(_user);
      localStorage.setItem("r",_user);

      state.user.avatar = payload;
    },
    setTest (state,payload) {
      state.test = payload.test;
    },
    setUser(state, payload) {
      state.role = payload.role;
      state.user = payload;
      state.email = payload.email;
      state.id = payload.id;
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
    returnAvatarPath : state => {
      return state.avatar_convo_path;
    },
    returnJobsNumber : state => {
      return state.jobs.length
    },

    returnStartedJobsNumber : state => {
      return 
      state.jobs
      .filter(elem => elem.inprogress===1)
      .length
    },

    returnFinishedJobsNumber : state => {
      return state.jobs
      .filter(elem => elem.completed===1)
      .length
    },

    returnJobs : state => {
      return state.jobs;
    },
    returnStartedJobs : state => {
      return state.jobs.filter(elem => elem.inprogress===1);
    },
    returnFinishedJobs : state => {
      return state.jobs.filter(elem => elem.completed===1);
    },
    returnAvatar : state => {

      if(state.user.avatar)
      {
        return state.user.avatar.replace("public\\","")        
      }
      else 
        return ''

    },
    returnSitesNumber : state => state.sites.length,
    returnSites: state => state.sites,
    returnUsername : state => state.user.username,
    returnMappedVerifiedSites : state => {
      
      let sites = state.sites
      .filter(site => site.confirmed === 1)
      .map(site => {
        return {
          value: site.domain,
          text: site.domain
        };
      });

      return sites;

    },
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
