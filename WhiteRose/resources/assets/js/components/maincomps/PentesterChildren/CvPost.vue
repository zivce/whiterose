<template>
  <div>
      <h1>Hello pentester</h1>
  </div>
  

</template>

<script>
import logger from "../../../utils/groupLogger";
import welcomeToastr from "../../toastr/welcometoastr";

export default {
  mixins: [welcomeToastr],
  mounted() {
    logger(["hello", "pentester mounted"], "Pentester.vue");
    this.welcomeNotify("Pentester");
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
