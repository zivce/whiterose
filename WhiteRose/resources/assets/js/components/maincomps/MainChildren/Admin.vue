<template>
  <div>

    <!-- info deo -->
    <!-- komponenta? -->
    <!-- collapsible -->
    
    <b-button @click="hideShowInfo">
      <icon name="info" ></icon>
    </b-button>

    <transition  name="fade">
      <admin-info v-if="isVisibleAdminInfo" >
      </admin-info>
    </transition>


    <!-- control panel -->

      <b-nav class="d-flex justify-content-center"  pills>
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

import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/info";

export default {
  components: {
    Icon,
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
      isVisibleAdminInfo: false
    };
  }
};
</script>

<style scoped>
</style>
