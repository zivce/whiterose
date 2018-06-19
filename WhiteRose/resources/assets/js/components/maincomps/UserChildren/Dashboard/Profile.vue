<template>
<div v-cloak>
    
    <!-- <h2 class="h2_profile">Profile</h2> -->
    <div class="profile">
      <!-- TODO: add changeable  -->
      <!-- <span v-if="isChangeableAvatar">
        <icon name="bandcamp">
        </icon>
      </span> -->

      <div 
      :class="{
        avatar:true
      }" 
      style="cursor:pointer;"
      @click="goToChangeAvatar()"
      >
        <a>
          <img :src="avatar_url">
        </a>
        
      </div>
      
      
      <span class="header_text">
          <p>
            {{info.name}} 
          </p>
          
          <star-rating
          :class =  "{'user_stars':true}"
          :star-size = "20"
          :read-only = "true"
          :rating="info.rating"
          :show-rating = "false"
          >
          
          </star-rating>
      </span>
    </div>
    
    <div class="main_profile_container">
      <!-- SECTION FOR ICONS  -->
      
      <div class="flex_data_first">
        <profile-data-wrapper
        goToRoute = "myjobs"
        >
          <icon 
          slot="data_icon" 
          name="tasks">
          </icon>

          <div slot="header_desc" class="ps">
            <p>All Jobs</p>
          </div>
          
          <div slot="quantity">
            <p>{{all_jobs_number}}</p>
          </div>

        </profile-data-wrapper> 
      </div>


      <div class="flex_data_first">
        <profile-data-wrapper
        goToRoute = "startedjobs"
        >
          <icon 
          slot="data_icon" 
          name="hourglass-start">
          </icon>

          <div slot="header_desc" class="ps">
            <p>Started Jobs</p>
          </div>
          
          <div slot="quantity">
            <p>{{started_jobs_number}}</p>
          </div>

        </profile-data-wrapper> 
      </div>

      <div class="flex_data_first">
        <profile-data-wrapper
        goToRoute = "finjobs"
        >
          <icon 
          slot="data_icon" 
          name="flag-checkered">
          </icon>

          <div slot="header_desc" class="ps">
            <p>Finished Jobs</p>
          </div>
          
          <div slot="quantity">
            <p>{{finished_jobs_number}}</p>
          </div>

        </profile-data-wrapper> 
      </div>

    </div>


    <div class="main_profile_container">
      <!-- SECTION FOR ICONS  -->
      
      <div class="flex_data_first">
        <profile-data-wrapper
        goToRoute = "tokens"
        >
          <icon 
          slot="data_icon" 
          name="bandcamp">
          </icon>

          <div slot="header_desc" class="ps">
            <p>Tokens</p>
          </div>
          
          <div slot="quantity">
            <p>{{tokens}}</p>
          </div>

        </profile-data-wrapper> 
      </div>


      <div class="flex_data_first">
        <profile-data-wrapper
        goToRoute = "client_messages"
        >
          <icon 
          slot="data_icon" 
          name="comment">
          </icon>

          <div slot="header_desc" class="ps">
            <p>Messages</p>
          </div>
          
          <div slot="quantity">
            <p>{{num_messages}}</p>
          </div>

        </profile-data-wrapper> 
      </div>

      <div class="flex_data_first">
        <profile-data-wrapper
        goToRoute = "sites_all"
        >
          <icon 
          slot="data_icon" 
          name="globe">
          </icon>

          <div slot="header_desc" class="ps">
            <p>Sites added</p>
          </div>
          
          <div slot="quantity">
            <p>{{sitesNumber}}</p>
          </div>

        </profile-data-wrapper> 
      </div>

    </div>

  </div>


</template>

<script>
import StarRating from "vue-star-rating";
import ProfileDataWrapper from "./ProfileDataWrapper.vue";
import InfoHardcode from "./user.hardcode";
import Icon from "vue-awesome/components/Icon";

import eventBus from "./../../../../utils/eventBus";

import MessagesAPI from '../../../../services/api/user_api/messagesClient.api';

import "vue-awesome/icons/hourglass-start";
import "vue-awesome/icons/flag-checkered";
import "vue-awesome/icons/tasks";
import "vue-awesome/icons/globe";

import { mapGetters } from "vuex";

//TODO: napuni info
export default {
  computed: {
    ...mapGetters({
      avatar_url: "returnAvatar"
    })
  },
  created() {
    this.info.name = this.$store.getters.returnUsername;
    this.info.rating = 3;

    this.tokens = this.$store.getters.returnTokens;
    this.sitesNumber = this.$store.getters.returnSitesNumber;
      
      MessagesAPI.getMessages()
      .then(resp => this.num_messages = resp.length);

      axios
        .get("returnmyjobs")
        .then(response => {
          response.data.forEach(job_info => {
            this.jobs.push({
              title: job_info.title,
              startingPrice: job_info.maximum_price,
              description: job_info.description,
              inprogress: job_info.inprogress,
              completed: job_info.completed,
              job_id: job_info.id
            });
            
            this.$store.commit("setJobs", this.jobs);
            this.all_jobs_number = this.$store.getters.returnJobsNumber;
            this.started_jobs_number = this.$store.getters.returnStartedJobsNumber;
            this.finished_jobs_number = this.$store.getters.returnFinishedJobsNumber;
          });
        })
        .catch(err => {
          console.error(err);
        });
    
  },
  components: {
    StarRating,
    ProfileDataWrapper,
    Icon
  },
  methods: {
    goToChangeAvatar() {
      eventBus.$emit("getToAvatar", true);

      this.$router.push({ name: "setup_client" });
    },
    pretty_print(date) {
      return moment(date).format("DD.MM.YYYY");
    }
  },
  data() {
    return {
      isChangeableAvatar: false,

      tokens: undefined,
      sitesNumber: undefined,

      info: {},
      jobs : [],
      num_messages : 0,
      all_jobs_number: undefined,
      started_jobs_number: undefined,
      finished_jobs_number: undefined
    };
  }
};
</script>

<style scoped>
.flex_data_first {
  flex: 1;
}

.main_profile_container {
  display: flex;
  flex-direction: row;
  margin-top: 4%;
}

.dates {
  color: white;
  display: flex;
  flex-direction: row;
  width: 50%;
  margin: 0 auto;
}
.dates p {
  flex: 0.7;
}
.header_text * {
  margin: 0;
}
.header_text {
  width: 50%;
  font-weight: bold;
  color: white;
  margin-left: 2%;
  display: flex;
  flex-direction: column;
}

.user_stars {
  height: fit-content;
}

.profile {
  display: flex;
  flex-direction: row;
}
.avatar img {
  border-radius: 50%;
  width: 7vw;
  box-shadow: 0px 0px 0px 8px #fff;
}

.user_stars >>> polygon {
  stroke: transparent !important;
}
</style>
