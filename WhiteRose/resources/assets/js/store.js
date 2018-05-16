import Vue from 'vue';

import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: {},
        role : '',
        email : '',
        id : ''
    },
    mutations : {
        setUser(state,payload)
        {
            state.role = payload.role;
            state.user = payload;
            state.email = payload.email;
            state.id = payload.id;
        },
        
    },
    getters:{
        returnParams : state => {
            return state.route.params;
        },
        returnRoute : state => {
            return state.route.fullPath;
        },
        returnRole : state =>{
            return state.role;
        },
        returnUser : state => {
            return state.user;
        },
        returnEmail : state =>{
            return state.email;
        },
        returnId : state => {
            return state.id;
        }

    }

})   
export default store;