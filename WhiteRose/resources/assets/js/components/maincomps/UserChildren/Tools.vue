<template>
  <div  class="comp_container">
      <h2 class="h2s" >Select tool from sidebar.</h2>
      
      <div class="row" id="toolContainer">
        
        <b-nav vertical pills class="col-md-4">
          <b-nav-item :class="{'strong':isUdpVisible}" @click="pushToUdp()">
            UDP Nmap  
          </b-nav-item>  
        </b-nav>

          <div class="col-md-7 offset-md-1">
            <transition name="tool" mode="out-in">
              <router-view>
              </router-view>
            </transition>
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
      this.isUdpVisible = true;
      this.$router.push({ name: "udp_nmap" });
    }
  },
  data() {
    return {
      user_id: "",

      //Visibility
      isUdpVisible : false
    };
  }
};
</script>

<style scoped>
.strong {
  color: rgb(7, 8, 15);
  font-weight: 600;
}

#toolContainer {
  margin-top: 4%;
}
</style>
