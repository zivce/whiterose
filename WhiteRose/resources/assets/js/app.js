import "./bootstrap";
window.Vue = require("vue");
window.moment = require("moment");

/**
 * Imports block
 */
import { sync } from "vuex-router-sync";
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import logger from "./utils/groupLogger";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Snotify, { SnotifyPosition } from "vue-snotify";
import Vuex from "vuex";

import VeeValidate from "vee-validate";

import landerRouter from "./routes/routes";
import mainRouter from "./routes/routesMain";
import StoreAPI from "./services/api/store_api/Store.api";
import FetchTokensAPI from "./services/api/FetchTokens.api";

import { ClientTable, Event } from "vue-tables-2";
import errorToaster from "./components/toastr/FormErrorToaster";
import notifyInfo from "./components/toastr/infotoastr";

import logg from "./utils/groupLogger";
import successToastr from "./components/toastr/welcometoastr";
import VBar from "v-bar";

import checkFields from "./utils/checkAllFields";
import fixInputs from './mixins/fixNumberInput';

//hardcode
import SitesHardcode from "./client_sites.hardcode";

/**
 * Comps
 */

Vue.component("v-bar", VBar);

/**
 * Mixins
 */

Vue.mixin(logg);
Vue.mixin(errorToaster);
Vue.mixin(checkFields);
Vue.mixin(successToastr);
Vue.mixin(fixInputs);
Vue.mixin(notifyInfo);

/**
 * What Vue should globally use.
 */
Vue.use(ClientTable);
Vue.use(Snotify);
Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.use(Vuex);

/**
 * Lander part here
 * get the lander id
 * and add vues with router view
 * inside MainLander.vue
 */

let lander_exists = document.getElementById("lander") ? true : false;

if (lander_exists) {
  const lander = new Vue({
    
    el: "#lander",
    router: landerRouter,
    created() {},
    mounted() {}
  });
}

/**
 * Home part here
 * Logic goes here
 */
import store from "./store";

let home_exists = document.getElementById("home") ? true : false;
const TOKENS_HARDCODE = 5000;
if (home_exists) {
  const home = new Vue({
    store,
    el: "#home",
    router: mainRouter,
    created() {
      this.unsync = sync(this.$store, this.$router);

      let loggedInPromise = null;
      
      // _user.avatar = _user.avatar.replace("public\\","");
      // console.log(_user.avatar);
       
      //TODO: Resi... 
        
        let _user = localStorage.getItem("r");
        //on refresh
        let user_resolved = null;
        if(_user === null)
        {
          //fetch user data
          user_resolved = axios
          .get("getLoggedUser")
          .then((user) => {
            
            let payload = user.data;
            
            store.commit("setUser", payload);

            FetchTokensAPI.fetchTokens().then(
              numOfTok => {
                if (store.getters.returnTokens === null)
                store.commit("setTokens", { tokens: numOfTok });
              })

            
              
        
              StoreAPI.getSites()
              .then((res)=>{
                store.commit("setSites",res.data)
              })
        
              
        
              //TODO: fetch rating of user
              const RATING = 4;
        
              store.commit("setRating", { rating: RATING });
        
              let user_role = this.$store.getters.returnRole;
        
              this.user_id = this.$store.getters.returnId;

              //all loading is done put the 
              //vue in front of user
              //eyes

              this.fetched_user = true;
            
              
              this.$router.push({
                path: `/${user_role}/${this.user_id}/`
              });
          })

        }
        //do this first login.
        else {
          _user = JSON.parse(_user);

        
          store.commit("setUser", _user);

          
          FetchTokensAPI.fetchTokens().then(
            
            numOfTok => {
              if (store.getters.returnTokens === null)
              store.commit("setTokens", { tokens: numOfTok });
            }
            
            )

          
            
      
            StoreAPI.getSites()
            .then((res)=>{
              store.commit("setSites",res.data)
            })
      
            
      
            //TODO: fetch rating of user
            const RATING = 4;
      
            store.commit("setRating", { rating: RATING });
      
            let user_role = this.$store.getters.returnRole;
      
            this.user_id = this.$store.getters.returnId;


            //all loading is done put the 
            //vue in front of user
            //eyes

            this.fetched_user = true;
            
            this.$router.push({
              path: `/${user_role}/${this.user_id}/`
            });
           
        }
    
    },
    destroyed() {
      this.unsync();
      //window.localStorage.clear();
      //window.localStorage.setItem(r,null);
    },
    data() {
      return {
        fetched_user: false,
        user_id: "",
        role : undefined,
        unsync: new Function()
      };
    },
    mounted() {
      this.user_id = "";
    }
  });
}
