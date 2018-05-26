
import {shallowMount, mount} from '@vue/test-utils';
import LoginClient from '@/Client/LoginClient.vue';

window.Vue = require("vue");
window.moment = require("moment");

/**
 * Imports block
 */
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);


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
  
  
  //const wrapper = mount(LoginClient);

  // ALL TEST PASSED SHALLOW MOUNT 
  const wrapper  = shallowMount(LoginClient);
  it("correctly sets the email value", () => {
    wrapper.setData({
      inputs : {
        email : {
          value : "hello"
        }
      }
    })
    
    expect(wrapper.vm.inputs.email.value).toBe('hello');
  });

  it("correctly sets the password value", () => {
    wrapper.setData({
      inputs : {
        password : {
          value : "hello"
        }
      }
    })
    
    expect(wrapper.vm.inputs.password.value).toBe('hello');
  });

  it("button log in is working" , () => {
    const btn = wrapper.find({ref : 'btn'});

      wrapper.setData({
        inputs : {
          email : {
            value : "zivkovicmilos5@r.com"
          },
          password: {
            value : "r"
          }
        }
      })
    
    btn.trigger('click');

    expect(wrapper.vm.clickPassed).toBe(true)
   })
   
   it("shows error for empty email", () => {
    
    wrapper.setData({
      inputs : {
        email : {
          value : ""
        }
      }
    })
    
    // const email_input = wrapper.find({ref : 'email'});

    wrapper.vm.checkAllFields();

    expect(wrapper.vm.all_fields_ok).toBe(false);
  });

  it("shows error for invalid email", () => {
    
    wrapper.setData({
      inputs : {
        email : {
          value : "rriiqkekqk"
        }
      }
    })
    
    wrapper.vm.checkAllFields();

    expect(wrapper.vm.all_fields_ok).toBe(false);
  });

});
