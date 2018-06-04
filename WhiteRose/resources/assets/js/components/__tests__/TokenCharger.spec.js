
import {shallowMount, mount, createLocalVue} from '@vue/test-utils';
import {createRenderer} from 'vue-server-renderer';

import Main from '@/maincomps/TokenCharger.vue';

window.jest = require("jest");
window.Vue = require("vue");
window.moment = require("moment");

window.jsdom = require("jsdom");

/**
 * Imports block
 */
import hardcodemyjobs from "@/maincomps/UserChildren/hardcodemyjobs";


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
import "vue-awesome/icons/times";
import "vue-awesome/icons/eye";
import "vue-awesome/icons/edit";

import store from '../../store';

const localVue = createLocalVue();

import axios from '../__mocks__/mockAxios';
import { wrap } from 'module';
window.axios = axios;

localVue.component(Icon);
localVue.use(VueRouter);
localVue.use(ClientTable);

//THIS MOCKS THE BIDS VUE 



localVue.config.ignoredElements = ['router-view']

describe("MyJobs.vue", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Main,
            {localVue,
            store,
            data:{
                hello : false,
            },
            computed: {
                completed () {
                    return this.hello;
                },
               
            },
            stubs : {
                'Messages' : '<div class="msgs"/>'
                
            }});
        
        
    })
    

    it("correctly mounts the vue instance", () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    })

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

    it("correctly calls button for paying the amount" , () => {
        wrapper.setData({
            hello : true
        })
        const mock = jest.spyOn(wrapper.vm, 'pay');
        
        const btn1 = wrapper.find({ref:"pay_button"})
        btn1.trigger('click');

        expect(mock).toHaveBeenCalled();

      })
    
    it("correctly disables button if form not completed" , () => {
        wrapper.setData({
            hello : false
        })
    const mock = jest.spyOn(wrapper.vm, 'pay');
    
    const btn1 = wrapper.find({ref:"pay_button"})
    
    btn1.trigger('click');

    expect(mock).toHaveBeenCalledTimes(0);
    })
});
