

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
import errorToaster from './components/toastr/FormErrorToaster';
import logg from './utils/groupLogger';
import successToastr from './components/toastr/welcometoastr';

import checkFields from './utils/checkAllFields';

/**
 * Mixins
 */

Vue.mixin(logg);
Vue.mixin(errorToaster);
Vue.mixin(checkFields);
Vue.mixin(successToastr);

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
        el: '#home',
        router: mainRouter,
        created(){

            let user = localStorage.getItem("r");
            
            console.log(user);
            
            user = JSON.parse(user);

            console.log(user[0]);

            //bind user to instance
            this.user_role = "pentst";
            console.log(this);
            let on_root_path = this.$router.app.$route.fullPath === "/";
            
            if(on_root_path)
            {
                //TODO: for each role
                if(this.user_role === "pentst")
                {
                    this.$router.push({
                        path:'/pentester'
                    })
                }
            }

            // localStorage.clear();

        },
        mounted(){
        }
    })
    
    mainRouter.beforeEach((to,from,next) => {
        
        if(to.path === "/")
        {   
            
            //TODO: dodaj rute razlicite u zavisnosti od role.
            
            //TODO: dodatno moze da se proverava i pre nego sto udje na neku rutu

            if(home.user_role === "client")
            {
                next({path:"/user"});
            }
            if(home.user_role === "pentst")
            {
                next({path:"/pentester"})
            }

        }
        else
        {
            next();
        }
    })
}
