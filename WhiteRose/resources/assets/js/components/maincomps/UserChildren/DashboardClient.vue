<template>
  <div :class="{
    'profile_container': isProfile
    ,'comp_container' : true}">

      <!-- <h2 class="h2s" ref="dashboard_client" v-if="isSetup">Dashboard</h2> -->
<!--       
      <b-nav class="d-flex justify-content-center user_nav_main"  pills>
        <b-nav-item 
        active-class ="active_item_user"
        class="nav_item_user"

        :to="'/'+user_role+'/'+ user_id+ '/dashboard/setup'"
        >
        Setup Profile
        </b-nav-item>
        
        <b-nav-item
        class="nav_item_user"

        active-class ="active_item_user"
        :to="'/'+user_role+'/'+ user_id+ '/dashboard/messages'">
        Messages
        </b-nav-item>
        
        
        <b-nav-item 
        class="nav_item_user"

        active-class ="active_item_user"
        :to="'/'+user_role+'/'+ user_id+ '/dashboard/profile'"
        >
        Profile
        </b-nav-item>
        
      </b-nav> -->

      
     <transition name="main_user" mode="out-in">
      
      <router-view>
      </router-view>

     </transition>
  </div>

</template>

<script>
export default {
  mixins: [],
  mounted() {
    this.user_id = this.$store.getters.returnId;
    this.user_role = this.$store.getters.returnRole;
    let route = this.$store.getters.returnRoute;
    this.isSetup = route.includes("setup");
    //this.isProfile = route.indexOf("profile") !== -1 ;
  },
  computed: {
    isProfile() {
      return this.$store.getters.returnRoute.indexOf("profile") !== -1;
    }
  },
  data() {
    return {
      isSetup: false,
      user_id: "",
      user_role: ""
    };
  }
};
</script>

<style scoped>
</style>
