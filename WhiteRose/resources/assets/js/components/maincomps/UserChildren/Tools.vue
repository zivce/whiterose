<template>
  <div  class="comp_container">
      <h2 class="h2s" >Select tool from sidebar.</h2>
      
      <div class="row" id="toolContainer">
        
        <b-nav vertical pills class="col-md-4">
          <b-nav-item @click="pushToUdp()">
            UDP Nmap  
          </b-nav-item>  
        </b-nav>

        <div class="col-md-7 offset-md-1">
          <router-view>
          </router-view>
        </div>


      </div>
  </div>

</template>

<script>
import logger from "../../../utils/groupLogger";
import welcomeToastr from "../../toastr/welcometoastr";

export default {
  mixins: [welcomeToastr],
  mounted() {
    this.user_id = this.$store.getters.returnId;
  },
  methods: {
    pushToUdp() {
      this.$router.push({ name: "udp_nmap" });
    }
  },
  data() {
    return {
      user_id: ""
    };
  }
};
</script>

<style scoped>
#toolContainer {
  margin-top: 4%;
}
</style>
