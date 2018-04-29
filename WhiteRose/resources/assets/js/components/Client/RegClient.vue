<template>
    <div id="main">
        <h1>
            Register forma
        </h1>
    </div>
</template>


<script>
import logger from "../../utils/groupLogger";

export default {
 
  mounted() {
     logger(["Component LoginClient mounted", "happy hacking"], "LoginClient.vue");

  },
  destroyed() {
  },
  data() {
    return {
    };
  }
};
</script>


<style scoped>

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
