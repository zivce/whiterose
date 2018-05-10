<template>
  <div id="main_vue">
      <div class="row" id="header">
        <h1 >
        <router-link 
        to="/home"
        >
          Home
        </router-link>
      </h1>
        
        <b-dropdown  
        :text="username" id="user"

        >
          <b-dropdown-item href="/#/user/dashboard/setup">
            <slot name="button-content"><icon name="user"></icon> Profile</slot>
          </b-dropdown-item>
        
          <b-dropdown-item  href="/clientlogout">
              <slot name="button-content"><icon name="logout"></icon> Logout</slot>
          </b-dropdown-item>
          
        </b-dropdown>

      </div>
      

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
#header >>> #user__BV_toggle_ {
  margin: auto;
  height: 5vh;
  background-color: transparent;
  border: 0;
}
#header >>> .dropdown-menu.show {
  top: 4px !important;
  left: -70px !important;
}
#header >>> #user {
  position: absolute;
  right: 5vw;
  top: 4vh;
}
#header >>> #user__BV_toggle_:focus {
  outline: none;
  border: none;
  box-shadow: none;
}
#header h1 {
  height: 5vh;
  margin: 0 auto;
}

#footer {
  bottom: 0;
}
#header {
  box-shadow: 3px 3px 7px 2px #e2e2e2;
  height: 13vh;
  color: white;
  background: rgba(0, 0, 53, 0.93);
}

#main_vue {
  min-height: 100vh;
  /* background: #C33764;  /* fallback for old browsers */
  /* background: -webkit-linear-gradient(to right, #1D2671, #C33764);  Chrome 10-25, Safari 5.1-6 */
  /* background: linear-gradient(to right, #1D2671, #C33764); W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
