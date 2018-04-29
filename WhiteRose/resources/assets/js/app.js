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


/**
 * imports end
 */




Vue.use(VueRouter);

Vue.use(BootstrapVue);


const router = new VueRouter({
    routes
})

const lander = new Vue({

    el: '#lander',
    router,
    created(){

        
    },
    mounted(){
        
        logger(["App mounted","Welcome"],"App.js")

        //ASSERTION
        //HERE GOES ROUTE CHECKIFLOGGEDIN OR SESHSTATUS..
        
        let seshStatus = true;
        //or false.. 


        logger(["user first time here",seshStatus],"App.js");
        
        if(seshStatus)
        {
            //Vue routing
            router.push({path:'/lander'})
        }
        else
        {
            //Laravel routing
            window.location.href = "/mainapp";
        }
    }


})