require('./bootstrap');

window.Vue = require('vue');

/**
 * Imports block 
 */

import BootstrapVue from 'bootstrap-vue'

import routes from './routes/routes';
import routesClient from './routes/routesClient';
import routesHacker from './routes/routesHacker';

import VueRouter from 'vue-router';

import logger from './utils/groupLogger';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';




 /**
  * What Vue should globally use.
  */

Vue.use(VueRouter);
Vue.use(BootstrapVue);


/**
 * Lander part here
 * get the lander id 
 * and add vues with router view
 * inside MainLander.vue
 */

let router; 

let lander_elem_exists = document.getElementById('lander') ? true : false;
logger(["lander", lander_elem_exists], "app.js");

if(lander_elem_exists)
{

    router = new VueRouter({
        routes
    })
    
    
    
    const lander = new Vue({
    
        el: '#lander',
        router,
        created(){
    
            
        },
        mounted(){
            //ASSERTION
            //HERE GOES ROUTE CHECKIFLOGGEDIN OR SESHSTATUS..
            
            // let seshStatus = true;
            // //or false.. 
    
    
            // logger(["user first time here",seshStatus],"App.js");
            
            // if(seshStatus)
            // {
            //     //Vue routing
            //     router.push({path:'/lander'})
            // }
            // else
            // {
            //     //Saceka matrix loader
            //     window.setTimeout(()=>{
            //         //Laravel routing
            //         window.location.href = "/home";
            //     },4000);
    
            // }
        }
    })
}

/**
 * Client part here
 * get the client id 
 * and add vues with router view
 * inside MainClient
 */

let client_elem_exists = document.getElementById('client');
logger(["client", client_elem_exists], "app.js");

if(client_elem_exists)
{
    
    //Client part..

    router = new VueRouter({
        routesClient
    })

    const client = new Vue({

        el: '#client',
        router,
        created(){

            
        },
        mounted(){
        }
    })
}


/**
 * Hacker part here
 * get the hacker id 
 * and add vues with router view
 * inside MainHacker
 */

let hacker_elem_exists = document.getElementById('hacker');

logger(["hacker", hacker_elem_exists], "app.js");

if(hacker_elem_exists)
{
    
    //Hacker part..

    router = new VueRouter({
        routesHacker
    })

    const hacker = new Vue({

        el: '#hacker',
        router,
        created(){

            
        },
        mounted(){
        }
    })
}

