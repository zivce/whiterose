<template>
  <div class="row">
      <h1>Message Replier Here.</h1>
  </div>
  

</template>

<script>
import logger from "../../../utils/groupLogger";

export default {
  mounted() {
    logger(
      ["hello", "message replier mounted"],
      "AdminChild/MessageReplier.vue"
    );
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
