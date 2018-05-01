<template>
  <div>
      <h1>
          Welcome to the main vue. :..:
      </h1>

      <router-view>
      </router-view>

      
  </div>

</template>

<script>
import logger from "../../utils/groupLogger";

export default {
  mounted(){
    logger(["hellow"],"Main.vue");
  },
  data(){
    return {
      
    }
  }
}
</script>

<style scoped>

</style>
