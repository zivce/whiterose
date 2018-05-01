//NE MOZE OVAKOOO!!!
//SVE U JEDAN FAJL RUTERI SE MESAJU!!!
//UBACI OBA RUTERA OVDE 

//DINAMICKI RUTIRAJ 
// U WEB PHP SE RAZRESAVA KOJI CE RUTER DA SE KORISTI
// OBA RUTERA KRECU RUTIRANJE OD / PA NA MAIN ILI LANDER 

// require('./appLander');
// require('./appMain');

require('./bootstrap');

window.Vue = require('vue');

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


/**
  * What Vue should globally use.
  */

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

        el: '#home',
        router: mainRouter,
        created(){
            
        },
        mounted(){
            
        }
    })
}
