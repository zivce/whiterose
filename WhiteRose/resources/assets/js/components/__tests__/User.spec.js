
import {shallowMount, mount, createLocalVue} from '@vue/test-utils';
import {createRenderer} from 'vue-server-renderer';

import Main from '@/maincomps/MainChildren/User.vue';

window.Vue = require("vue");
window.Vue = require("vue");
window.moment = require("moment");
import * as jsdom from 'jsdom';
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
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/info";
import "vue-awesome/icons/wrench";
import "vue-awesome/icons/comment";
import "vue-awesome/icons/user";

import store from '../../store';

const localVue = createLocalVue();

localVue.component(Icon);
localVue.use(VueRouter);


//THIS MOCKS THE USER VUE 

const routes = [
    {
        name:"root",
        path:"/",
        component : require('@/maincomps/MainChildren/User.vue')
    },
    {
        name:"messages",
        path : 'messages',
        component : require('../maincomps/MainChildren/Pentester.vue')
    }
]
const router = new VueRouter({
    routes
})
localVue.config.ignoredElements = ['router-view']

describe("MainClient.vue", () => {
    
    const wrapper = shallowMount(Main,
        {localVue,router,
        store,
        stubs : {
            'Messages' : '<div class="msgs"/>'
            
        }});
    it("correctly mounts the vue instance", () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    })
    it("correctly shows the info modal after click of info btn", () => {
        const info = wrapper.find({ref : 'info_btn'})
        info.trigger('click');
        const t = wrapper.find({ref : "user_info"});
        expect(t).toBeTruthy();
    })

    it("correctly renders the list of navigation buttons", () => {
        const btns = wrapper.find('.nav_btns')
    
        expect(btns).toBeTruthy();
    })

    it("correctly renders the list of user navigation", () => {
        const nav_user = wrapper.find('.user_nav_main')
    
        expect(nav_user).toBeTruthy();
    })
    
    it("has same html structure", () => {
        const renderer = createRenderer();
        renderer.renderToString(wrapper.vm, (err,str) => {
            if(err) throw new Error(err)
            expect(str).toMatchSnapshot();
        })
    })

    it("correctly renders the child component", () => {
        const chld = wrapper.findAll('.msgs');
        expect(chld).toBeTruthy();
    })
   

    it("correctly adds class to an active navigation button", () => {
        let btn = wrapper.find('.nav-item');
        btn.trigger('click');
        let anchor = btn.find('.active')
        expect(anchor).toBeTruthy();
    })


    it("correctly communicates with vuex ", () => {
        wrapper.vm.$store.commit("setTest",{test:3});
        expect(wrapper.vm.$store.getters.returnTest).toBe(3);
    })

    it("correctly uses vue router" , () => {
        wrapper.vm.$router.push({name: "messages"});
        const ref = wrapper.find({ref: "pentester"})
        expect(ref).toBeTruthy();

    })
});
