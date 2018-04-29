<template>
    <div id="lander_hacker_main" class="row">
       
      <div id="wrapper">

          <h1 class="col-md-4 offset-md-4">
              Welcome hacker.
          </h1>

          <div class="col-md-4 offset-md-4" id="btns">
            
            <b-button size="lg" @click="loginTrue()" variant="outline-primary" id="log">
              Login
            </b-button>
          
            <b-button size="lg" @click="regTrue()"  variant="outline-primary" id="reg">
              Register
            </b-button>
          </div>

        <div class="row col-md-4 offset-md-4">

          <login-hacker v-if="login">
          </login-hacker> 

          <reg-hacker v-if="reg">
          </reg-hacker>

        </div>
        
      </div>

    </div>
</template>


<script>

import LoginHacker from './LoginHacker.vue';
import RegHacker from './RegHacker.vue';
import { SnotifyPosition } from "vue-snotify";

export default {
  components:{
    RegHacker,LoginHacker
  },
  mounted() {
  },
  methods : {
    loginTrue(){

      this.login = true;
      this.reg = false;
    },
    regTrue(){

      this.$snotify.info("Verify your email.", "Verification", {
        position: SnotifyPosition.leftBottom,
        backdrop: 0.5
      });
      
      this.reg = true;
      this.login = false;
    }
  },
  destroyed() {
  },
  data() {
    return {
      login:false,
      reg:true
    };
  }
};
</script>


<style scoped>

#log{
}

#btns
{

  width: fit-content;
  margin: auto;

}

#wrapper * {
  margin-bottom: 10px;
}

#wrapper{
  width: 100%;
  height:100%;
  background-color: rgba(24, 23, 23, 0.81);
  box-shadow: 1px 1px inset;
}

h1{
  color:#e7e7e7ef;
  width: fit-content;
  margin: auto;
}

#lander_hacker_main{
  background-color:transparent;
  height: 100vh;
}

.matrx{
    width: 101vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index : 0;
}
/* da se pomeri na dole kad predje na sledecu komponentu  */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
