import Vue from "vue";

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

      // let _user = localStorage.getItem("r");
      // _user = JSON.parse(_user);
      // _user.avatar = payload; 
      // _user = JSON.stringify(_user);
      // localStorage.setItem("r",_user);

      state.user.image_path = payload;
    },
    setTest (state,payload) {
      state.test = payload.test;
    },
    setUser(state, payload) {
      state.role = payload.role;
      state.user = payload.user;
      state.email = payload.user.email;
      state.id = payload.user.id;
    },
    
    setUserLoggedIn(state, payload) {
      state.role = payload.role;
      state.user = payload;
      state.email = payload.email;
      state.id = payload.id;
    },
    setTokens(state, payload) {
      state.tokens = Number(state.tokens) + Number(payload.tokens);
    },
    withdrawTokens(state, payload) {
      let decremented_tokens = Number(state.tokens) - Number(payload.tokens);

      if (decremented_tokens < 0)
        payload.vm.errorToast("Insufficient tokens", "Error!");
      else 
      {
        payload.vm.notifyInfo("Your PayPal email is added for payment","Info.")
        state.tokens = decremented_tokens;
      }
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
    returnRating : state => {
      (state.user);
      return state.user.rating
    },
    returnAvatarPath : state => {
      return state.avatar_convo_path;
    },
    returnJobsNumber : state => {
      return state.jobs.length
    },

    returnStartedJobsNumber : state => {
      return state.jobs
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

      if(state.user.image_path)
      {
        return state.user.image_path.replace("public\\","")        
      }
      else 
        return ''

    },
    returnSkillsScore  : state => state.user.skills_score,
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
    returnDesc : state => {
      return state.user.description
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
