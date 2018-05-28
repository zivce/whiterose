
import {shallowMount, mount, createLocalVue} from '@vue/test-utils';
import {createRenderer} from 'vue-server-renderer';
import * as jest from 'jest'
import Main from '@/maincomps/UserChildren/Jobs.vue';

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
import errorToaster from "@/toastr/FormErrorToaster";
import successToastr from "@/toastr/welcometoastr";

import checkFields from "../../utils/checkAllFields";
import fixInputs from '../../mixins/fixNumberInput';
import { ClientTable, Event } from "vue-tables-2";

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
import axios from '../__mocks__/mockAxios';
window.axios = axios;

const localVue = createLocalVue();


localVue.component(Icon);
localVue.use(VueRouter);
localVue.use(ClientTable);

//THIS MOCKS THE BIDS VUE 
const routes = [
    {
        name:'myjobs',
        path:'myjobs',
        component: require('@/maincomps/UserChildren/MyJobs.vue')
    },

    {
        name:'finjobs',
        path:'finishedjobs',
        component: require('@/maincomps/UserChildren/FinishedJobs.vue')

    },
    {
        name:'startedjobs',                    
        path:'startedjobs',
        component: require('@/maincomps/UserChildren/StartedJobs.vue')

    },
]
const router = new VueRouter({
    routes
})



localVue.config.ignoredElements = ['router-view']

describe("FinishedJobs.vue", () => {
    
    const wrapper = shallowMount(Main,
        {localVue,router,
        store,
        mocks : {
            get : () => Promise.resolve({data:3})
        },
        stubs : {
            'Messages' : '<div class="msgs"/>'
            
        }});
        
    it("correctly mounts the vue instance", () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    })


    //HASH is changeable every render
    // it("has same html structure", () => {
    //     const renderer = createRenderer();
    //     renderer.renderToString(wrapper.vm, (err,str) => {
    //         if(err) throw new Error(err)
    //         expect(str).toMatchSnapshot();
    //     })
    // })

    it("correctly renders the child component", () => {
        const chld = wrapper.findAll('.msgs');
        expect(chld).toBeTruthy();
    })

    it("correctly goes to my jobs component" , () => {
        wrapper.vm.$router.push({name: "myjobs"});
        const ref = wrapper.find({ref: "my_jobs"})
        expect(ref).toBeTruthy();
    })
    
    it("correctly goes to finished jobs component" , () => {
        wrapper.vm.$router.push({name: "finjobs"});
        const ref = wrapper.find({ref: "fin_jobs"})
        expect(ref).toBeTruthy();
    })
    
    it("correctly goes to started jobs component" , () => {
        wrapper.vm.$router.push({name: "startedjobs"});
        const ref = wrapper.find({ref: "fin_jobs"})
        expect(ref).toBeTruthy();
    })
    it("correctly communicates with vuex ", () => {
        wrapper.vm.$store.commit("setTest",{test:3});
        expect(wrapper.vm.$store.getters.returnTest).toBe(3);
    })

});
