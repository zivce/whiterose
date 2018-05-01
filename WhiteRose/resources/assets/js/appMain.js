//DEFINE TWO COMPONENTS 
//MAIN AND LANDER 
//https://stackoverflow.com/questions/41539961/vuejs-js-for-multiple-pages-not-for-a-single-page-application?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
//OPTION 2






require('./bootstrap');

window.Vue = require('vue');

/**
 * Imports block 
 */

import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router';
import routes from './routes/routesMain';



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

let router = new VueRouter({
    // mode:'history',
    routes
})



const home = new Vue({

    el: '#home',
    router,
    created(){

        
    },
    mounted(){
        
    }
})