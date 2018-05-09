<template>
  <div class="comp_container dashboard_container">
      <h2 class="h2s" >Dashboard</h2>
      
      <b-nav class="d-flex justify-content-center user_nav"  pills>
        <b-nav-item to="/user/dashboard/setup">Setup Profile</b-nav-item>
        <b-nav-item to="/user/dashboard/messages">Messages</b-nav-item>
        <b-nav-item to="/user/dashboard/data">Data</b-nav-item>
        <b-nav-item to="/user/dashboard/search">Search</b-nav-item>
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
  mounted() {},
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
