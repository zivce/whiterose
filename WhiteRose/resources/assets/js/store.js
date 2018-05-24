import Vue from 'vue';
import errorNotify from '../js/components/toastr/FormErrorToaster';

import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: {},
        role : '',
        email : '',
        id : '',
        sites : '',
        scans: '',
        tokens : null
    },
    mutations : {
        setUser(state,payload)
        {
            state.role = payload.role;
            state.user = payload;
            state.email = payload.email;
            state.id = payload.id;
        },
        setTokens(state,payload){
            state.tokens = Number(state.tokens) + Number(payload.tokens)
        },
        decrementTokens(state,payload)
        {
            let decremented_tokens = Number(state.tokens) - Number(payload.tokens);

            if(decremented_tokens < 0 )
                payload.vm.errorToast("Insufficient tokens", "Error!");
            else
                state.tokens =decremented_tokens
        },
        setSites(state,payload)
        {
            state.sites = payload;
        },
        setScans(state,payload)
        {
            state.scans  = payload;
        }
    },
    getters:{
        returnTokens : state => {
            return state.tokens;
        },
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