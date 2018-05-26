
import {shallowMount, mount} from '@vue/test-utils';
import FormInput from '@/utilcomps/FormInput.vue';

window.Vue = require("vue");
window.moment = require("moment");
window._ = require('lodash');
/**
 * Imports block
 */
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
window.axios = require('axios');

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


describe("LoginClient.vue", () => {
  
  const wrapper  = shallowMount(FormInput,{
      
          propsData : {
              prop : {
                login_c: true,
                ok: false,
                type: "email",
                id: "password",
                label: "e-mail address",
                value: "hello",
                validation: {
                  required: true
                }
              }
          }
      
  });

  it("correctly sets the prop value", () => {
    expect(wrapper.vm.prop.value).toBe('hello');
  });

  it("correctly sets the validation", () => {
    expect(wrapper.vm.vval.email).toBeFalsy();
  })

  it("correctly sets the upper value of email address", () => {
    expect(wrapper.vm.id_upper).toEqual("E-mail address");
  })
  it("correctly sets regex for password" , () => {
   
    expect(wrapper.vm.regex_set).toBe(true);
    expect(wrapper.vm.vval.regex).toEqual(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);
  })
});
