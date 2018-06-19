<template>
  <div id="main_vue">
      <div class="row" id="header">
        <h1 >
        <div 
        style="cursor:pointer;"
        @click="rel()"
        >

          <!-- :class = "{'red_ico':isHacker}" -->
          <icon
          id="rose_ico"
          height="64"
          width="64"
          name="logo"
          >
            
          </icon>

        </div>
      </h1>
        
        <div id="profile_container">
          
          <img 
          :src="avatar_url"
          /> 
          <div 
          id = "admin_container"
          style="margin:auto;
          margin-right: 1vw;"
          class="d-flex flex-row"
          v-if="isAdmin"> 
          
            <p
            style="    
            margin-right: 7px;
            margin-left: 7px;"
            > 
              {{name}} 
            </p>
            
            <div 
             v-b-tooltip.hover.left="'Logout'"
            style="cursor:pointer;"
            @click="handleLogout()">
            
              <icon 
              style="
              fill:red;
              vertical-align:middle;
              "
              name="logout"></icon>
            
            </div>
          
          </div>



          <b-dropdown
          v-if="!isAdmin"
          right
          :text="username" 
          :class = "{'hacker':isHacker}"
          @show = "clicked_user = !clicked_user"
          @hide = "clicked_user = !clicked_user"
          id="user"
          >

          <transition name="setup" mode="out-in">
        
            <div v-if="clicked_user">
              
              <b-dropdown-item 
              style="
                font-weight: bolder;
                color: #2c3340;
                font-size: 20px;"> 
                <span>
                  <icon 
                  style="vertical-align:middle;"   
                  height="25"
                  width="25" name="bandcamp">
                  </icon> {{tokens1}}
                </span>
              </b-dropdown-item>

              <b-dropdown-item>

                <star-rating
                :class =  "{'hacker_stars':isHacker}"
                :active-color = 'activeColorChecker'
                :star-size = "rating_options.size"
                :read-only = "rating_options.read_only"
                :rating="stars1"
                :show-rating = "rating_options.show_rating"
                >
                
                </star-rating>

              </b-dropdown-item>
              <b-dropdown-item :to="profile_url">
                <slot name="button-content"><icon name="user"></icon> Profile</slot>
              </b-dropdown-item>


              <b-dropdown-item  :to="tokens_url">
                  <slot name="button-content"><icon name="check"></icon> Buy tokens</slot>
              </b-dropdown-item>


              <b-dropdown-item 
              v-if="!isHacker" 
              :to="{name:'sites_all'}">
                  <slot name="button-content"><icon name="globe"></icon> Sites </slot>
              </b-dropdown-item>

              <b-dropdown-item  @click="handleLogout()">
                  <slot name="button-content"><icon name="logout"></icon> Logout</slot>
              </b-dropdown-item>
              
              </div>      

            </transition>
      
         
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
          <p class="d-flex">© Whiterose 2017</p>
      </div>
      
      <vue-snotify/>

      <!-- adding token charger -->
      <!-- <token-charger v-if="isActiveTokenCharger"/> -->
      
  </div>

</template>

<script>
import TokenCharger from "./TokenCharger.vue";
import StarRating from "vue-star-rating";
import Home from "./Home.vue";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/user";
import "vue-awesome/icons/comment";
import "vue-awesome/icons/globe";

import "../../Icons/logout";
import "../../Icons/logo";

import eventBus from "../../utils/eventBus";

import { mapGetters } from "vuex";

export default {
  components: {
    StarRating,
    TokenCharger,
    Home,
    Icon
  },
  destroyed() {
  },
  mounted() {
    this.username = this.$store.getters.returnUsername;
    this.name = this.$store.getters.returnUser.name;
    // this.avatar_url = this.$store.getters.returnAvatar;
    // this.avatar_url = this.avatar_url.substring(this.avatar_url.indexOf("/uploads"))

    /**
     * for dropdown animation
     */
    //  eventBus.$on("bv::tooltip::show", () => {
    //    this.clicked_user = !this.clicked_user;
    //  })
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
    if (this.user_role === "admin") {
      this.isAdmin = true;
    }

    this.profile_url = `/${this.user_role}/${this.user_id}/dashboard/profile`;
    this.tokens_url = `/${this.user_role}/${this.user_id}/purchasetokens`;
  },
  computed: {
    ...mapGetters({
      avatar_url: "returnAvatar",
      tokens1: "returnTokens",
      stars1: "returnRating"
    }),
    home() {},
    activeColorChecker() {
      return this.isHacker ? this.hacker_stars_color : this.user_stars_color;
    }
  },
  methods: {
    rel(){
      window.location.reload();
    },
    goToMsg() {
      this.$router.push({ path: this.messages_url });
    },
    handleLogout() {
      if (this.user_role === "pentester") {
        axios.get("/hackerlogout").then(res => {
          
          if (res.status === 200) {
            
            // this.notifySuccess("Logged out!", "Success!");
            window.location.reload();
          
          } else {
            this.errorToast("Error happened", "Error!");
          }
        });
      } else if (this.user_role === "client" 
                || this.user_role === "admin" )  {
        
        //TODO: promeni u adminlogout? 

        axios.get("/clientlogout").then(res => {
          if (res.status === 200) {
          
            // this.notifySuccess("Logged out!", "Success!");
            window.location.reload();
          
          } else {
            this.errorToast("Error happened", "Error!");
          }
        });
      } else if (this.user_role === "admin") {
        
         axios.get("/adminLogout").then(res => {
          if (res.status === 200) {
          
            // this.notifySuccess("Logged out!", "Success!");
            window.location.reload();
          
          } else {
            this.errorToast("Error happened", "Error!");
          }
        });
      } 
    }
  },
  data() {
    return {
      rating_options: {
        read_only: true,
        size: 20,
        show_rating: false
      },

      //coloring dropdown
      hacker_stars_color: "#D80032",
      user_stars_color: "#ffd055",

      clicked_user: false,
      tokens: undefined,
      tokens_url: "",
      name:"",

      //visibility vars
      isActiveTokenCharger: false,
      isHacker: false,
      isAdmin : false,

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
#admin_container * {
  margin: 0;
}


#profile_container > img {
  margin: auto;
  width: 40px;
  border-radius: 50%;
}
#profile_container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
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

#header >>> #user {
  /* position: absolute;
  right: 5vw;
  top: 4vh; */
}
#header >>> #user__BV_toggle_:focus {
  outline: none;
  border: none;
  box-shadow: none;
}
#header h1 {
  margin: auto;
  margin-left: 34px;
}
#main_vue {
  background-position-x: 2%;
  background-position-y: 22px;
  /* background: url("/img/logo.png") no-repeat; */
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

.hacker_stars >>> polygon {
  stroke: transparent !important;
}
#main_vue {
  min-height: 100vh;
  /* background: #C33764;  /* fallback for old browsers */
  /* background: -webkit-linear-gradient(to right, #1D2671, #C33764);  Chrome 10-25, Safari 5.1-6 */
  /* background: linear-gradient(to right, #1D2671, #C33764); W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
