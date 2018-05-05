<template>
  <div>
      <h1>Post job</h1>
  </div>

</template>

<script>
import logger from "../../../utils/groupLogger";
import welcomeToastr from "../../toastr/welcometoastr";

export default {
  mixins: [welcomeToastr],
  mounted() {
    logger(["hellow", "user mounted"], "User.vue");
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
