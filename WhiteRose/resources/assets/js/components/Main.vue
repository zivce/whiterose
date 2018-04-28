<template>
    <div id="main">
      <matrix v-if="isVisibleMatrix"></matrix>
      <router-view v-if="!isVisibleMatrix"></router-view>
    </div>
</template>


<script>
import logger from "../utils/groupLogger";
import Matrix from "./MatrixLoader.vue";

export default {
  components: {
    Matrix
  },
  mounted() {
    logger(["Component Main mounted", "happy hacking"], "Main.vue");

    this.timer = setTimeout(() => {
      this.isVisibleMatrix = false;
    }, 3000);
  },
  destroyed() {
    clearTimeout(timer);
  },
  data() {
    return {
      timer: undefined,
      isVisibleMatrix: true
    };
  }
};
</script>


<style scoped>
</style>
