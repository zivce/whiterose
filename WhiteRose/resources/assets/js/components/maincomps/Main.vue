<template>
  <div id="main_vue">
      <div class="row" id="header">
        <h1 >
        <router-link 
        to="/home"
        >

          <!-- :class = "{'red_ico':isHacker}" -->
          <icon
          id="rose_ico"
          height="64"
          width="64"
          name="logo"
          >
            
          </icon>

        </router-link>
      </h1>
        
        <div id="profile_container">
          

          <b-dropdown
          :text="username" 
          :class = "{'hacker':isHacker}"
          id="user"
          >
              <b-dropdown-item :to="profile_url">
                <slot name="button-content"><icon name="user"></icon> Profile</slot>
              </b-dropdown-item>


              <b-dropdown-item  :to="tokens_url">
                  <slot name="button-content"><icon name="check"></icon> Buy tokens</slot>
              </b-dropdown-item>

              <b-dropdown-item  @click="handleLogout()">
                  <slot name="button-content"><icon name="logout"></icon> Logout</slot>
              </b-dropdown-item>
              
  
          </b-dropdown>
          
        </div>

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

      <!-- adding token charger -->
      <!-- <token-charger v-if="isActiveTokenCharger"/> -->
      
  </div>

</template>

<script>
import TokenCharger from "./TokenCharger.vue";

import Home from "./Home.vue";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/user";
import "vue-awesome/icons/comment";

import "../../Icons/logout";
import "../../Icons/logo";

import eventBus from "../../utils/eventBus";

export default {
  components: {
    TokenCharger,
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
    this.user_role = this.$store.getters.returnRole;
    if (this.user_role === "pentester") {
      this.isHacker = true;
    }

    this.profile_url = `/${this.user_role}/${this.user_id}/dashboard/setup`;
    this.tokens_url = `/${this.user_role}/${this.user_id}/purchasetokens`;
  },
  computed: {
    home() {}
  },
  methods: {
    goToMsg() {
      this.$router.push({ path: this.messages_url });
    },
    handleLogout() {
      if (this.user_role === "pentester") {
        axios.get("/hackerlogout").then(res => {
          if (res.status === 200) {
            this.notifySuccess("Logged out!", "Success!");

            window.setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            this.errorToast("Error happened", "Error!");
          }
        });
      } else if (this.user_role === "client") {
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
    }
  },
  data() {
    return {
      tokens_url: "",
      isActiveTokenCharger: false,
      isHacker: false,
      messages_url: "",
      user_role: "",
      user_id: "",
      profile_url: ``,
      username: "",
      main_comp: false
    };
  }
};
</script>

<style  scoped>
#profile_container {
  display: flex;
  flex-direction: row;
}
#main_main {
  min-height: 90vh;
}

#header >>> #user__BV_toggle_ {
  margin: auto;
  height: 5vh;
  background-color: transparent;
  border: 0;
}
/* #header >>> .dropdown-menu.show {
  top: 4px !important;
  left: -70px !important;
} */

#rose_ico {
  fill: white;
}
.red_ico {
  fill: #ff1a00 !important;
}

#header >>> #msgs {
  position: absolute;
  right: 27vw;
  top: 5vh;
  cursor: pointer;
}

/* if hacker added this styles */

.hacker >>> button {
  color: #ff1a00;
}
.hacker >>> .dropdown-menu.show {
  background-color: #2c3340 !important;
}
.hacker >>> a {
  font-weight: 800;
  color: #ff1a00;
}

.hacker >>> a:hover {
  background-color: #020919;
}
.hacker >>> a:focus {
  background-color: #020919;
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
  margin: 0 auto;
  margin-top: 1%;
}
#main_vue {
  background-position-x: 2%;
  background-position-y: 22px;
  background: url("/img/logo.png") no-repeat;
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
  background: #000919de;
}
#header {
  margin-bottom: 3%;
  height: 13vh;
  color: white;
  background: #000919d1;
}

#main_vue {
  min-height: 100vh;
  /* background: #C33764;  /* fallback for old browsers */
  /* background: -webkit-linear-gradient(to right, #1D2671, #C33764);  Chrome 10-25, Safari 5.1-6 */
  /* background: linear-gradient(to right, #1D2671, #C33764); W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
