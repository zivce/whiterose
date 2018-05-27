
import {shallowMount, mount, createLocalVue} from '@vue/test-utils';
import MainClient from '@/Client/MainClient.vue';

window.Vue = require("vue");
window.moment = require("moment");

/**
 * Imports block
 */
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";


import Snotify, { SnotifyPosition } from "vue-snotify";
import Vuex from "vuex";

import VeeValidate from "vee-validate";


import axios from "axios";
import errorToaster from "@/toastr/FormErrorToaster";
import successToastr from "@/toastr/welcometoastr";

import checkFields from "../../utils/checkAllFields";
import fixInputs from '../../mixins/fixNumberInput';


/**
 * Comps
 */


/**
 * Mixins
 */

Vue.mixin(errorToaster);
Vue.mixin(checkFields);
Vue.mixin(successToastr);
Vue.mixin(fixInputs);
/**
 * What Vue should globally use.
 */
Vue.use(Snotify);
Vue.use(BootstrapVue);
Vue.use(VeeValidate);

const localVue = createLocalVue();
localVue.use(VueRouter);


const routes = [
    {
        name: "client_log",
        path: "login",
        component: require("@/Client/LoginClient.vue")
      },
      {
        name: "client_reg",
        path: "register",
        component: require("@/Client/RegClient.vue")
      }
]

const router = new VueRouter({
    routes
})

describe("MainClient.vue", () => {
    
    const wrapper = shallowMount(MainClient,{
        localVue,router
    });

    it("goes to login client vue after login btn clicked", () => {
        const login = wrapper.find({ref : 'log'})
        login.trigger('click');
        
        const t = wrapper.find({ref : "log_form_client"});
        console.log("login form "  + t);

        expect(t).toBeTruthy();
    })

    it("goes to register client vue register btn clicked", () => {
        const reg_btn = wrapper.find({ref : 'reg'})
        reg_btn.trigger('click');

        const t = wrapper.find({ref : "reg_form_client"});
        expect(t).toBeTruthy();
    })

});
