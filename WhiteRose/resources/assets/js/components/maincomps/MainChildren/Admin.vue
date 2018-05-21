<template>
  <div>

    <!-- control panel -->

      <b-nav class="d-flex justify-content-center user_nav_main"  pills>
        
        <b-nav-item
          active-class ="active_item_user"
          class="nav_item_user"
          to="/admin/userbaner">Ban user</b-nav-item>
        <b-nav-item 
        to="/admin/alljobsreviewer"
        active-class ="active_item_user"
        class="nav_item_user"
        >Preview jobs</b-nav-item>

      </b-nav>
      
      <!-- <transition name="fade"> -->
        
        <router-view>
        </router-view>
      
      <!-- </transition> -->

  </div>


</template>

<script>
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/info";

export default {
  components: {
    Icon
  },
  mixins: [],
  methods: {},
  mounted() {},
  data() {
    return {
      isVisibleAdminInfo: false
    };
  }
};
</script>

<style scoped>
</style>
