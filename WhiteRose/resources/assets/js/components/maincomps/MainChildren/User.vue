<template>
  <div id="user_comps">
      
      <b-button class="btn btn-info btn-secondary" @click="hideShowInfo">
        <icon name="info" ></icon>
      </b-button>

      <transition  name="fade" mode="in-out">
        <user-info 
        :textinside = "textinside"
        :title = "title"
        v-show="isVisibleUserInfo" >
        </user-info>
      </transition>


    <!-- control panel -->

      <b-nav class="d-flex justify-content-center user_nav"  pills>
        <b-nav-item to="/user/postjob">
        Post Job
        </b-nav-item>
        <b-nav-item to="/user/tools">
        Tools
        </b-nav-item>
        <b-nav-item to="/user/scans">
        Scans
        </b-nav-item>
        
        <b-nav-item to="/user/myjobs">
        My Jobs
        </b-nav-item>
        <b-nav-item to="/user/bids">
        Bids
        </b-nav-item>
        <b-nav-item to="/user/startedjobs">
        Started Jobs
        </b-nav-item>
        <b-nav-item to="/user/finishedjobs">
        Finished Jobs
        </b-nav-item>
        <b-nav-item to="/user/search">
        Search
        </b-nav-item>
      </b-nav>
      
      <!-- <transition name="fade"> -->
        <router-view>
        </router-view>
      <!-- </transition> -->


  </div>

</template>

<script>
import UserInfo from "../UserChildren/UserParts/UserInfo.vue";

import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/info";

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

export default {
  mixins: [],
  destroyed() {
    clearInterval(this.int1);
  },
  created() {},
  computed: {},
  mounted() {
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
      //Current route
      route: "",

      //interval
      int1: null,

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
          route: "/setup",
          textinside: SetupTxt.textinside,
          title: SetupTxt.title
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

.user_nav {
  margin-bottom: 20px;
}
#user_comps {
  min-height: 90vh;
}
</style>
