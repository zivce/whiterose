<template>
  <div>
      <h1>Hello moderator</h1>
  </div>
  

</template>

<script>
import logger from "../../../utils/groupLogger";
import welcomeToastr from "../../toastr/welcometoastr";

export default {
  mixins: [welcomeToastr],
  mounted() {
    logger(["hello", "moderator mounted"], "Moderator.vue");
    this.welcomeNotify("Moderator");
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
