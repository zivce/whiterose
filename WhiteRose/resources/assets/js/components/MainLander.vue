<template>
    <div id="lander_before_main">
      <!-- <transition name="fade">
        <matrix v-if="isVisibleMatrix"></matrix>
      </transition> -->


      <transition name="fade">
        <router-view v-if="!isVisibleMatrix"></router-view>
      </transition>
      <vue-snotify/>

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

    //CHANGE LATER FOR LOADER TO 4000
    let delay = 4;
    

    this.timer = setTimeout(() => {
      this.isVisibleMatrix = false;
    }, delay);
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
