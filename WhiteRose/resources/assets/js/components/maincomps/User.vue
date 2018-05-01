<template>
  <div>
      <h1>Hello user</h1>
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
