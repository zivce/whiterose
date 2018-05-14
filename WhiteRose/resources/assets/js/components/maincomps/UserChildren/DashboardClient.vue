<template>
  <div class="comp_container dashboard_container">
      <h2 class="h2s" >Dashboard</h2>
      
      <b-nav class="d-flex justify-content-center user_nav"  pills>
        <b-nav-item 
        :to="'/user/'+ user_id+ '/dashboard/setup'"
        >
        Setup Profile
        </b-nav-item>
        
        <b-nav-item 
        :to="'/user/'+ user_id+ '/dashboard/messages'">
        Messages
        </b-nav-item>
        
        
        <b-nav-item 
        :to="'/user/'+ user_id+ '/dashboard/profile'"
        >
        Profile
        </b-nav-item>
        
      </b-nav>
     <transition name="fade" mode="out-in">
      
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
  },
  data() {
    return {
      user_id: ""
    };
  }
};
</script>

<style scoped>
</style>
