<template>
  <div id="user_comps">
      
      <b-button @click="hideShowInfo">
        <icon name="info" ></icon>
      </b-button>

      <transition  name="fade">
        <user-info v-if="isVisibleUserInfo" >
        </user-info>
      </transition>


    <!-- control panel -->

      <b-nav class="d-flex justify-content-center user_nav"  pills>
        <b-nav-item to="/user/postjob">Post Job</b-nav-item>
        <b-nav-item to="/user/tools">Tools</b-nav-item>
        <b-nav-item to="/user/scans">Scans</b-nav-item>
        <b-nav-item to="/user/myjobs">My Jobs</b-nav-item>
        <b-nav-item to="/user/bids">Bids</b-nav-item>
        <b-nav-item to="/user/startedjobs">Started Jobs</b-nav-item>
        <b-nav-item to="/user/finishedjobs">Finished Jobs</b-nav-item>

      </b-nav>
      
      <!-- <transition name="fade"> -->
        <router-view>
        </router-view>
      <!-- </transition> -->


  </div>

</template>

<script>
import logger from "../../../utils/groupLogger";
import welcomeToastr from "../../toastr/welcometoastr";
import UserInfo from "../UserChildren/UserParts/UserInfo.vue";

import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/info";

export default {
  mixins: [welcomeToastr],
  mounted() {
    logger(["hellow", "user mounted"], "User.vue");
    // this.welcomeNotify("User");
  },
  components: {
    Icon,
    UserInfo
  },
  methods: {
    hideShowInfo() {
      this.isVisibleUserInfo = !this.isVisibleUserInfo;
    }
  },
  data() {
    return {
      isVisibleUserInfo: true
    };
  }
};
</script>

<style scoped>
.user_nav{
  margin-bottom:20px;
}
#user_comps {
  min-height: 90vh;
}
</style>
