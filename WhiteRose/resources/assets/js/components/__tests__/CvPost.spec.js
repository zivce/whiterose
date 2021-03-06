
import {shallowMount, mount, createLocalVue} from '@vue/test-utils';
import {createRenderer} from 'vue-server-renderer';
import * as jest from 'jest'
import flushPromises from "flush-promises";

import Main from '@/maincomps/PentesterChildren/CvPost.vue';


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
import "../../Icons/bandcamp";

import store from '../../store.js';
import axios from '../__mocks__/mockAxios';
window.axios = axios;

const localVue = createLocalVue();


localVue.component(Icon);
localVue.use(VueRouter);

//THIS MOCKS THE BIDS VUE 




describe("CvPost.vue", () => {
    
    const wrapper = shallowMount(Main,
        {localVue,
        store,
        
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
    
    it("correctly calls the submit function" , async() => {
        const spy = spyOn(wrapper.vm,"submitHandler");
        

        const btn = wrapper.find(".btn_submit");

        btn.trigger('click');

        await flushPromises();
        
        expect(wrapper.vm.submitHandler).toHaveBeenCalledTimes(1);

    })

    it('correctly fetches data' , () => {
        const resolved = axios.get();
        
        resolved.then((response)=> {
            expect(response.data).toBe(3);
        });
    })


    it('correctly posts data' , () => {
        const resolved = axios.post();
        
        resolved.then((response)=> {
            expect(response.data).toBe(3);
        });
    })

    it("correctly communicates with vuex ", () => {
        wrapper.vm.$store.commit("setTest",{test:3});
        expect(wrapper.vm.$store.getters.returnTest).toBe(3);
    })

});
