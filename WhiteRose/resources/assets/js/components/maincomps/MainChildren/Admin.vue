<template>
  <div>
      <h1>Hello admin</h1>
  </div>
  

</template>

<script>
import logger from "../../../utils/groupLogger";
import { SnotifyPosition } from "vue-snotify";
import welcomeToastr from "../../toastr/welcometoastr";

export default {
  mixins: [welcomeToastr],
  mounted() {
    this.welcomeNotify("Admin");
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
