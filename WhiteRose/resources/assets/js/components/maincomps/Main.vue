<template>
  <div id="main_vue">
      <h1  class="row">
        <router-link 
        to="/home"
        >
          Home
        </router-link>
        <b-dropdown  
        :text="username" id="user"

        >
          <b-dropdown-item href="/#/user/dashboard">
            <slot name="button-content"><icon name="user"></icon> Profile</slot>
          </b-dropdown-item>
        
          <b-dropdown-item  href="/clientlogout">
              <slot name="button-content"><icon name="logout"></icon> Logout</slot>
          </b-dropdown-item>
          
        </b-dropdown>
      </h1>

      <home v-if="home">
      </home>

      <transition name="fade" mode="out-in" >
        <router-view v-if="!home">
        </router-view>
      </transition>
      

      <h1 id="footer" class="row">
        Footer here.
      </h1>
      <vue-snotify/>

      
  </div>

</template>

<script>
import Home from "./Home.vue";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/user";
import "../../Icons/logout";

export default {
  components: {
    Home,
    Icon
  },
  mounted() {},
  computed: {
    home() {}
  },
  data() {
    return {
      username: this.$parent.user.email
    };
  }
};
</script>

<style scoped>
#footer {
  bottom: 0;
}

#main_vue {
  min-height: 100vh;
  /* background: #C33764;  /* fallback for old browsers */
  /* background: -webkit-linear-gradient(to right, #1D2671, #C33764);  Chrome 10-25, Safari 5.1-6 */
  /* background: linear-gradient(to right, #1D2671, #C33764); W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
