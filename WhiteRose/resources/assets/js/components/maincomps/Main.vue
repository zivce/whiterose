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
          <b-dropdown-item :to="profile_url">
            <slot name="button-content"><icon name="user"></icon> Profile</slot>
          </b-dropdown-item>
        
          <b-dropdown-item  @click="handleLogout()">
              <slot name="button-content"><icon name="logout"></icon> Logout</slot>
          </b-dropdown-item>
          
        </b-dropdown>

      </div>
      
      <div id="main_main">

        <home v-if="home">
        </home>
<!--         
        <home v-if="main_comp" id="">
          
        </home> -->


        <transition name="fade" mode="out-in" >
          <router-view v-if="!home">
          </router-view>
        </transition>
      </div>
        <div id="footer" class="row">
          <p class="d-flex">You've reached rock bottom. Who lives in the pineapple under the sea...</p>
      </div>
      
      <vue-snotify/>

      
  </div>

</template>

<script>
import Home from "./Home.vue";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/user";
import "../../Icons/logout";
import eventBus from "../../utils/eventBus";

export default {
  components: {
    Home,
    Icon
  },
  mounted() {
    this.username = this.$store.getters.returnEmail;

    this.user_id = this.$store.getters.returnId;

    if (this.$store.state.route.path === "/") {
      this.main_comp = true;
    } else {
      this.main_comp = false;
    }

    this.profile_url = `/user/${this.user_id}/dashboard/setup`;
  },
  computed: {
    home() {}
  },
  methods: {
    handleLogout() {
      axios.get("/clientlogout").then(res => {
        if (res.status === 200) {
          this.notifySuccess("Logged out!", "Success!");

          window.setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          this.errorToast("Error happened", "Error!");
        }
      });
    }
  },
  data() {
    return {
      user_id: "",
      profile_url: ``,
      username: "",
      main_comp: false
    };
  }
};
</script>

<style scoped>
#main_main {
  min-height: 90vh;
}

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

#footer p {
  margin: auto;
}
#footer {
  text-align: center;
  margin-top: 5%;
  box-shadow: 3px 3px 7px 2px #e2e2e2;
  height: 13vh;
  color: white;
  background: rgba(0, 0, 53, 0.93);
}
#header {
  margin-bottom: 3%;
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
