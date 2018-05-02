<template>
  <div class="row">
      <h1>Post viewer here.</h1>
  </div>
  

</template>

<script>
import logger from "../../../utils/groupLogger";

export default {
  mounted() {
    logger(["hello", "postviewer mounted"], "AdminChild/PostViewer.vue");
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
