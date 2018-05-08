<template>
    <div id="lander_before_main">
      <!-- <transition name="fade">
        <matrix v-if="isVisibleMatrix"></matrix>
      </transition> -->


      <transition name="flip" mode="out-in">
        <router-view v-if="!isVisibleMatrix"></router-view>
      </transition>
      
      <vue-snotify/>

    </div>
</template>


<script>
import Matrix from "./MatrixLoader.vue";

export default {
  components: {
    Matrix
  },
  mounted() {

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
</style>
