<template>
  <div 
  @click="clickedOutside($event)"
  id="user_comps" ref="user_main">
      <div class="nav_btns">
        
        <b-button 
        ref = "info_btn"
        id="btn_info"
        v-b-tooltip.hover.right="'Info'"
        class="btn btn-client" 
        @click="hideShowInfo">
        
          <icon 
          id="btn_info_icon"
          name="info" 
          :width="icon_fix_width"
          >
          </icon>
        
        </b-button>
        
        <b-button 
        ref = "messages_btn"
        v-b-tooltip.hover.right="'Messages'"
        class="btn btn-client"
        :to="messages_url">
        
          <icon name="comment" 
          :width="icon_fix_width"
           ></icon>
        
        </b-button>
        
        <b-button 
        v-b-tooltip.hover.right="'Profile'"
        class="btn btn-client"
        :to="profile_url">
          <icon name="user" 
          :width="icon_fix_width"
           ></icon>
        </b-button>

         <b-button  
        v-b-tooltip.hover.right="'Setup'"
        class="btn btn-client"
        :to="setup_url">
          <icon name="wrench" 
          :width="icon_fix_width"
           ></icon>
        </b-button>


      </div>
      <transition  name="flip" mode="in-out">
        <user-info 
        ref="user_info"
        :textinside = "textinside"
        :title = "title"
        v-show="isVisibleUserInfo" >
        </user-info>
      </transition>


    <!-- control panel -->

      <b-nav class="d-flex justify-content-center user_nav_main"  pills>
        <b-nav-item 
        ref="btn_in_nav"
        active-class ="active_item_user"
        class="nav_item_user"
        :to="'/'+user_role+'/'+ user_id+ '/postjob'">
        Post Job
        </b-nav-item>
        <b-nav-item 
        active-class ="active_item_user"
        class="nav_item_user"
        :to="'/'+user_role+'/'+ user_id + '/tools'">
        Tools
        </b-nav-item>
        <b-nav-item 
        active-class ="active_item_user"
        class="nav_item_user"
        :to="'/'+user_role+'/'+ user_id+ '/scans'">
        Scans
        </b-nav-item>
        
        <b-nav-item
        active-class ="active_item_user"
        class="nav_item_user"
         :to="{name:'jobs',params:{id:user_id}}">
        Jobs
        </b-nav-item>

        <b-nav-item
        active-class ="active_item_user"
        class="nav_item_user"
        :to="{name:'sites_all'}">
        Sites
        </b-nav-item>
        
        
        <b-nav-item 
        active-class ="active_item_user"
        class="nav_item_user"
        :to="'/'+user_role+'/'+ user_id+ '/bids'">
        Bids
        </b-nav-item>
       
      </b-nav>
      
      <transition name="main_user">

        <router-view>
        </router-view>
      
      </transition>


      <!-- <div v-if="main_client_visible">
        <p>Main CLient</p>
      </div> -->

  </div>

</template>

<script>
import UserInfo from "../UserChildren/UserParts/UserInfo.vue";
// import * as Icon from 'vue-awesome';
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/info";
import "vue-awesome/icons/wrench";

//txt files
import PostJobTxt from "./Data/post_job.txt";
import ToolsTxt from "./Data/tools.txt";
import StartedJobsTxt from "./Data/started_jobs.txt";
import ScansTxt from "./Data/scans.txt";
import MyJobsTxt from "./Data/my_jobs.txt";
import FinishedJobsTxt from "./Data/finished_jobs.txt";
import BidsTxt from "./Data/bids.txt";
import DataTxt from "./Data/data.txt";
import MessagesTxt from "./Data/messages.txt";
import SearchTxt from "./Data/search.txt";
import SetupTxt from "./Data/setup.txt";
import AllSitesTxt from "./Data/allsites.txt";
import ProfileTxt from "./Data/profile.txt";
import PurchaseTokensTxt from "./Data/purchasetokens.txt";



import eventBus from "../../../utils/eventBus";

export default {
  name: "user__MAIN__COMPONENT",
  mixins: [],
  destroyed() {
    clearInterval(this.int1);
  },
  created() {},
  computed: {},
  mounted() {
    this.user_id = this.$store.getters.returnId;
    this.user_role = this.$store.getters.returnRole;

    this.messages_url = `/${this.user_role}/${this.user_id}/dashboard/messages`;
    this.profile_url = `/${this.user_role}/${this.user_id}/dashboard/profile`;
    this.setup_url = `/${this.user_role}/${this.user_id}/dashboard/setup`;

    if (this.$route.path === `/${this.user_role}/${this.user_id}/`) {
      this.main_client_visible = true;
    } else {
      this.main_client_visible = false;
    }

    this.helper();
  },
  components: {
    Icon,
    UserInfo
  },
  watch: {
    route: function() {
      let txt_info = _.find(this.collection_txts, obj => {
        return obj.route === this.route;
      });
      if (txt_info) {

        this.textinside = txt_info.textinside;
        this.title = txt_info.title;
      }
    }
  },
  methods: {
    clickedOutside(e)
    {
      const btn_info = document.getElementById("btn_info");
      const btn_info_icon = document.getElementById("btn_info_icon");
      const inside_btn = e.target == btn_info || e.target == btn_info_icon;

      if(!inside_btn)
      {
        if(this.isVisibleUserInfo)
          this.isVisibleUserInfo = !this.isVisibleUserInfo;
      }
      

    },

    //Updates route to be watched by watcher and
    // compute the text to show .
    helper() {
      this.int1 = window.setInterval(() => {
        let root = this.$router.app.$route.fullPath;
        let ind = root.lastIndexOf("/");
        root = root.slice(ind, root.length);
        this.route = root;
      }, 1);
    },
    hideShowInfo() {
      this.isVisibleUserInfo = !this.isVisibleUserInfo;
    }
  },
  data() {
    return {
      //info part
      textinside: PostJobTxt.textinside,
      title: PostJobTxt.title,

      isVisibleUserInfo: false,
      main_client_visible: false,

      //width fixes
      icon_fix_width: 57,

      //Current route
      route: "",
      user_id: "",
      user_role: "",

      //interval
      int1: null,
      messages_url: "",
      profile_url: "",
      setup_url: "",
      //collection of texts to insert
      collection_txts: [
        {
          route: "/postjob",
          textinside: PostJobTxt.textinside,
          title: PostJobTxt.title
        },
        {
          route: "/tools",
          textinside: ToolsTxt.textinside,
          title: ToolsTxt.title
        },
        {
          route: "/scans",
          textinside: ScansTxt.textinside,
          title: ScansTxt.title
        },
        {
          route: "/myjobs",
          textinside: MyJobsTxt.textinside,
          title: MyJobsTxt.title
        },
        {
          route: "/bids",
          textinside: BidsTxt.textinside,
          title: BidsTxt.title
        },
        {
          route: "/finishedjobs",
          textinside: FinishedJobsTxt.textinside,
          title: FinishedJobsTxt.title
        },
        {
          route: "/startedjobs",
          textinside: StartedJobsTxt.textinside,
          title: StartedJobsTxt.title
        },
        {
          route: "/messages",
          textinside: MessagesTxt.textinside,
          title: MessagesTxt.title
        },
        {
          route: "/data",
          textinside: DataTxt.textinside,
          title: DataTxt.title
        },
        {
          route: "/search",
          textinside: SearchTxt.textinside,
          title: SearchTxt.title
        },
        {
          route : "/allsites",
          textinside : AllSitesTxt.textinside,
          title : AllSitesTxt.title
        },
        {
          route: "/setup",
          textinside: SetupTxt.textinside,
          title: SetupTxt.title
        },
        {
          route: "/profile",
          textinside: ProfileTxt.textinside,
          title: ProfileTxt.title
        },
        {
          route: "/purchasetokens",
          textinside: PurchaseTokensTxt.textinside,
          title: PurchaseTokensTxt.title
        }
      ]
    };
  }
};
</script>

<style scoped>
.flip-enter-active {
  transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.flip-leave-active {
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.flip-enter,
.flip-leave-to {
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}
.nav_btns {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 3%;
}
.nav_btns svg {
  vertical-align: middle;
}
.nav_btns button {
  margin-bottom: 25%;
}
.nav_btns a {
  margin-bottom: 25%;
}
.active_item {
  color: white !important;
  background-color: #007effe3 !important;
  border-radius: 0 !important;
}
#user_comps {
  margin-top: 3vh;
  min-height: 90vh;
}
</style>
