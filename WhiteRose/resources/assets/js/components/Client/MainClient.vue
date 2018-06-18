<template>
    <div id="lander_client_main" class="row">
       
        <!-- <matrix class="matrx">
        </matrix> -->
      <div id="wrapper">

          <!-- <h1 class="col-md-4 offset-md-4 headers">
              Welcome client.
          </h1>

          <div class="col-md-4 offset-md-4" id="btns">
            
            <b-button ref="log" size="lg" @click="loginTrue()" variant="outline-primary" id="log">
              Login
            </b-button>
          
            <b-button ref="reg" size="lg" @click="regTrue()"  variant="outline-primary" id="reg">
              Register
            </b-button>
          </div> -->

        <div class="row col-md-4 offset-md-4" style="height:100%;">

          <transition 
          name="lander" 
          mode="out-in">

            <router-view>

            </router-view>
          
          </transition>

          
  
        </div>
        
      </div>

    </div>
</template>


<script>
import LoginClient from "./LoginClient.vue";
import RegClient from "./RegClient.vue";
import { SnotifyPosition } from "vue-snotify";

export default {
  components: {
    LoginClient,
    RegClient
  },
  mounted() {},
  methods: {
    loginTrue() {
      this.$router.push({ name: "client_log" });

      // this.login = true;
      // this.reg = false;
    },
    regTrue() {
      this.$router.push({ name: "client_reg" });

      // this.$snotify.info("Verify your email.", "Verification", {
      //   position: SnotifyPosition.leftBottom,
      //   backdrop: 0.5
      // });

      // this.reg = true;
      // this.login = false;
    }
  },
  destroyed() {},
  data() {
    return {
      login: false,
      reg: true
    };
  }
};
</script>


<style scoped>
#log {
}

#btns {
  width: fit-content;
  margin: auto;
}

#wrapper * {
  margin-bottom: 10px;
}

#wrapper {
  width: 100%;
  height: 100%;
  background-color: transparent;
  /* box-shadow: 1px 1px inset; */
}

h1 {
  color: #e7e7e7ef;
  width: fit-content;
  margin: auto;
}

#lander_client_main {
  background-color: transparent;
  height: 100vh;
}

.matrx {
  width: 101vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
</style>
