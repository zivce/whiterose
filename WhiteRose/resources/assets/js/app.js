import "./bootstrap";
window.Vue = require("vue");
window.moment = require("moment");

/**
 * Imports block
 */
import store from "./store";
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

import { ClientTable, Event } from "vue-tables-2";
import Axios from "axios";
import errorToaster from "./components/toastr/FormErrorToaster";
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

let home_exists = document.getElementById("home") ? true : false;

if (home_exists) {
  const home = new Vue({
    store,
    el: "#home",
    router: mainRouter,
    beforeMount() {
      this.unsync = sync(this.$store, this.$router);

      //TODO: ruta da proverava koja je rola ..

      //TODO: izbaci moze da se ishakuje
      let user = localStorage.getItem("r");

      user = JSON.parse(user);
      // else
      // {
      //     //here goes sesh status
      //     //verify user role

      // }

      //TODO: negde se koristi role find out..

      this.$root.role = this.$store.getters.returnRole;
      //bind user to instance

      store.commit("setUser", user);

      //TODO: dodaj fetchovanje tokena

      if (store.getters.returnTokens === null)
        store.commit("setTokens", { tokens: 10 });

      //TODO: dodaj verifikovane sajtove u store
      // StoreAPI.getSites().then((res)=>{
      //     store.commit("setSites",res.data)
      // })

      // StoreAPI.getAllUserScans().then((res)=>{
      //     store.commit("setScans",res.data)
      // })

      store.commit("setSites", SitesHardcode);

      //TODO: fetch rating of user
      const RATING = 4;

      store.commit("setRating", { rating: RATING });

      let user_role = this.$store.getters.returnRole;

      this.user_id = this.$store.getters.returnId;

      this.$router.push({
        path: `/${user_role}/${this.user_id}/`
      });

      // localStorage.clear();
    },
    destroyed() {
      this.unsync();
    },
    data() {
      return {
        user_id: "",
        unsync: new Function()
      };
    },
    mounted() {
      this.user_id = "";
    }
  });
}
