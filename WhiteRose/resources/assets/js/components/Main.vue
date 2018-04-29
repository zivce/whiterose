<template>
    <div id="main">
      <transition name="fade">
        <matrix v-if="isVisibleMatrix"></matrix>
      </transition>
      <transition name="fade">
        <router-view v-if="!isVisibleMatrix"></router-view>
      </transition>
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
    }, 4000);
  },
  destroyed() {
    clearTimeout(this.timer);
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
