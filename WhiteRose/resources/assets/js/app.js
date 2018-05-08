

require('./bootstrap');

window.Vue = require('vue');
window.moment = require('moment');


/**
 * Imports block 
 */

import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import logger from './utils/groupLogger';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Snotify, { SnotifyPosition } from 'vue-snotify';

import VeeValidate from 'vee-validate';

import landerRouter from './routes/routes';
import mainRouter from './routes/routesMain';


import {ClientTable,Event} from 'vue-tables-2';
import Axios from 'axios';



/**
  * What Vue should globally use.
  */

Vue.use(ClientTable);
Vue.use(Snotify);
Vue.use(BootstrapVue);
Vue.use(VeeValidate);

/**
 * Lander part here
 * get the lander id 
 * and add vues with router view
 * inside MainLander.vue
 */

let lander_exists = document.getElementById("lander") ? true : false;

if(lander_exists)
{
    const lander = new Vue({

        el: '#lander',
        router:  landerRouter,
        created(){

            
        },
        mounted(){
            
        }
    })
}




/**
 * Home part here
 * Logic goes here
 */


let home_exists = document.getElementById("home") ? true : false;

if(home_exists)
{
    
    const home = new Vue({
        props:[role], 
        el: '#home',
        router: mainRouter,
        created(){
            console.log(this.role);
        },
        mounted(){
            
        }
    })
}
