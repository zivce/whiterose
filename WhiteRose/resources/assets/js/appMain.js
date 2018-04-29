require('./bootstrap');

window.Vue = require('vue');

/**
 * Imports block 
 */

import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router';




import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';




 /**
  * What Vue should globally use.
  */

Vue.use(VueRouter);
Vue.use(BootstrapVue);


/**
 * Home part here
 * Logic goes here
 */




const home = new Vue({

    el: '#home',
    created(){

        
    },
    mounted(){
        
    }
})