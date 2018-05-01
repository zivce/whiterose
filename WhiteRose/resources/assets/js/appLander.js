require('./bootstrap');

window.Vue = require('vue');

/**
 * Imports block 
 */

import BootstrapVue from 'bootstrap-vue'
import routes from './routes/routes';
import VueRouter from 'vue-router';

import logger from './utils/groupLogger';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Snotify, { SnotifyPosition } from 'vue-snotify';

import VeeValidate from 'vee-validate';

 /**
  * What Vue should globally use.
  */

Vue.use(Snotify);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VeeValidate);

/**
 * Lander part here
 * get the lander id 
 * and add vues with router view
 * inside MainLander.vue
 */

let router = new VueRouter({
        mode:'history',
        routes
    })

let lander_exists = document.getElementById("lander") ? true : false;

if(lander_exists)
{
    const lander = new Vue({

        el: '#lander',
        router,
        created(){

            
        },
        mounted(){
            
        }
    })
}


// /**
//  * Client part here
//  * get the client id 
//  * and add vues with router view
//  * inside MainClient
//  */

// let client_elem_exists = document.getElementById('client');
// logger(["client", client_elem_exists], "app.js");

// if(client_elem_exists)
// {
    
//     //Client part..

//     router = new VueRouter({
//         // mode:'history'
//         routesClient
//     })

//     const client = new Vue({

//         el: '#client',
//         router,
//         created(){

            
//         },
//         mounted(){
//         }
//     })
// }


// /**
//  * Hacker part here
//  * get the hacker id 
//  * and add vues with router view
//  * inside MainHacker
//  */

// let hacker_elem_exists = document.getElementById('hacker');

// logger(["hacker", hacker_elem_exists], "app.js");

// if(hacker_elem_exists)
// {
    
//     //Hacker part..

//     router = new VueRouter({
//         // mode:'history'
//         routesHacker
//     })

//     const hacker = new Vue({

//         el: '#hacker',
//         router,
//         created(){

            
//         },
//         mounted(){
//         }
//     })
// }

