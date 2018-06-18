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

import successToastr from "./components/toastr/welcometoastr";
import VBar from "v-bar";

import checkFields from "./utils/checkAllFields";
import fixInputs from './mixins/fixNumberInput';
import Matrix from './components/MatrixLoader.vue';

/**
 * Comps
 */

Vue.component("v-bar", VBar);


/**
 * Mixins
 */

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
    components :{
      Matrix
    },
    el: "#lander",
    router: landerRouter,
    created() {},
    mounted() {
     
    },
    data() {
      return {
       
      }
    }
  });
}

/**
 * Home part here
 * Logic goes here
 */
import store from "./store";

let home_exists = document.getElementById("home") ? true : false;
if (home_exists) {
  const home = new Vue({
    store,
    el: "#home",
    router: mainRouter,
    created() {
      this.unsync = sync(this.$store, this.$router);
      axios
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
          
          window.setTimeout(( ) => {
            this.fetched_user = true;
          },0)
        
          
          this.$router.push({
            path: `/${user_role}/${this.user_id}/`
          });
      })
      .catch((err)=> {
      
        window.location.reload();
      
      })
    
    },
    components :{
      Matrix
    },
    destroyed() {
      this.unsync();
      
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

  //Adding frontend guards
  

//forbid client routes for others.
home.$router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.client)) {
    
    let role = home.$store.getters.returnRole;
    let id = home.$store.getters.returnUser.id;

    if (role !== 'client') {
      home.$snotify.error("Not available for you", "Error", {
        position: SnotifyPosition.centerTop,
        backdrop: 0.5
      });

      next({
        path: `/${role}/${id}`
      });

    } else {
      next();
    }
  } else {
    //not the route needed login
    next();
  }
});

//forbid pentester routes for others.
home.$router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.pentester)) {
    
    let role = home.$store.getters.returnRole;
    let id = home.$store.getters.returnUser.id;

    if (role !== 'pentester') {
      home.$snotify.error("Not available for you", "Error", {
        position: SnotifyPosition.centerTop,
        backdrop: 0.5
      });

      next({
        path: `/${role}/${id}`
      });

    } else {
      next();
    }
  } else {
    //not the route needed login
    next();
  }
});



//forbid admin routes for others.
home.$router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.admin)) {
    
    let role = home.$store.getters.returnRole;
    let id = home.$store.getters.returnUser.id;

    if (role !== 'admin') {
      home.$snotify.error("Not available for you", "Error", {
        position: SnotifyPosition.centerTop,
        backdrop: 0.5
      });

      next({
        path: `/${role}/${id}`
      });

    } else {
      next();
    }
  } else {
    //not the route needed login
    next();
  }
});




}
