<template>
  <div id="main_vue">
      <h1  class="row">
          Header here.
      </h1>

      <transition name="fade" mode="out-in" >
        <router-view>
        </router-view>
      </transition>
      

      <h1 id="footer" class="row">
        Footer here.
      </h1>
      <vue-snotify/>

      
  </div>

</template>

<script>
import logger from "../../utils/groupLogger";

export default {
  mounted() {
    logger(["hellow"], "Main.vue");
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
#footer {
  position: absolute;
  bottom: 0;
}

#main_vue {
  min-height: 100vh;
}
</style>
