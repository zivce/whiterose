<template>
  <div>

    <!-- info deo -->
    <!-- komponenta? -->
    <!-- collapsible -->
    
    <transition  name="fade">
      <admin-info v-if="isVisibleAdminInfo" >
      </admin-info>
    </transition>

    <b-btn @click="hideShowInfo">
      Toggle info section
    </b-btn>

    <!-- control panel -->

      <b-nav class="row">
        <b-nav-item to="/admin/messagereplier">MessageReplier</b-nav-item>
        <b-nav-item to="/admin/postviewer">PostViewer</b-nav-item>
      </b-nav>
      
      <!-- <transition name="fade"> -->
        <router-view>
        </router-view>
      <!-- </transition> -->

  </div>


</template>

<script>
import logger from "../../../utils/groupLogger";
import { SnotifyPosition } from "vue-snotify";
import welcomeToastr from "../../toastr/welcometoastr";
import AdminInfo from "../AdminChildren/AdminParts/AdminInfo.vue";

export default {
  components: {
    AdminInfo
  },
  mixins: [welcomeToastr],
  methods: {
    hideShowInfo() {
      this.isVisibleAdminInfo = !this.isVisibleAdminInfo;
    }
  },
  mounted() {
    this.welcomeNotify("Admin");
  },
  data() {
    return {
      isVisibleAdminInfo: true
    };
  }
};
</script>

<style scoped>
</style>
