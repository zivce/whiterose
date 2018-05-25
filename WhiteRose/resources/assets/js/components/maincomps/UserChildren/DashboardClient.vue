<template>
  <div class="comp_container ">
      <h2 class="h2s" >Dashboard</h2>
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
  },
  data() {
    return {
      user_id: "",
      user_role: ""
    };
  }
};
</script>

<style scoped>
</style>
