<template>
  <div>

    <!-- control panel -->

      <b-nav class="d-flex justify-content-center user_nav_main"  pills>
        
        <b-nav-item
          active-class ="active_item_user"
          class="nav_item_user"
          :to="'/'+user_role+'/'+ user_id+ '/userbaner'">Ban user
        </b-nav-item>

        <b-nav-item 
       :to="'/'+user_role+'/'+ user_id+ '/alljobsreviewer'"
        active-class ="active_item_user"
        class="nav_item_user"
        >Manage Jobs
        </b-nav-item>

        <b-nav-item 
       :to="'/'+user_role+'/'+ user_id+ '/questions'"
        active-class ="active_item_user"
        class="nav_item_user"
        >Manage Questions
        </b-nav-item>

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
  mounted() {
    this.user_id = this.$store.getters.returnId;
    this.user_role = this.$store.getters.returnRole;
  },
  data() {
    return {
      user_role: null,
      user_id: null,
      isVisibleAdminInfo: false
    };
  }
};
</script>

<style scoped>
</style>
