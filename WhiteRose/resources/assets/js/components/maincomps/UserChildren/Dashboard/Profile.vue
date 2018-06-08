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
      
      @mouseover=" isChangeableAvatar = !isChangeableAvatar"
      @mouseout="isChangeableAvatar = !isChangeableAvatar"
      >
        <a>
          <img src="http://i.pravatar.cc/200?img=3">
        </a>
        
      </div>
      
      
      <span class="header_text">
          <p>
            {{info.name}} {{info.username}}
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
            <p>40</p>
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
            <p>40</p>
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
            <p>40</p>
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
            <p>5000</p>
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
            <p>40 unread</p>
          </div>

        </profile-data-wrapper> 
      </div>

      <div class="flex_data_first">
        <profile-data-wrapper
        @click="changeUIAction"
        goToRoute = "setup_client"
        >
          <icon 
          slot="data_icon" 
          name="globe">
          </icon>

          <div slot="header_desc" class="ps">
            <p>Sites added</p>
          </div>
          
          <div slot="quantity">
            <p>30</p>
          </div>

        </profile-data-wrapper> 
      </div>

    </div>

  </div>


</template>

<script>
import StarRating from "vue-star-rating";
import ProfileDataWrapper from './ProfileDataWrapper.vue';
// import AllInfo from "../../../../services/api/pentester_api/AllInfo.api";
import InfoHardcode from "./user.hardcode";
import Icon from "vue-awesome/components/Icon";


import "vue-awesome/icons/hourglass-start";
import "vue-awesome/icons/flag-checkered";
import "vue-awesome/icons/tasks";
import "vue-awesome/icons/globe";


//TODO: napuni info
export default {
  created() {
    // this.info =  AllInfo.getAllInfo();
  },
  components: {
    StarRating,ProfileDataWrapper,Icon
  },
  methods: {
   
    navigateToChangeAvatar() {

    },
    pretty_print(date) {
      return moment(date).format("DD.MM.YYYY");
    }
  },
  data() {
    return {
      isChangeableAvatar : false,
      info: InfoHardcode
    };
  }
};
</script>

<style scoped>
.flex_data_first{
  flex:1;
}


.main_profile_container
{
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

/* .proj_container { 
  margin-top: 2%;
  background-color: $bg-project-color;
  margin-bottom: 20px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  box-shadow: rgba(0, 6, 16, 0.31) 3px 3px 7px 2px;
  padding: 5%;
}*/

.user_stars >>> polygon {
  stroke: transparent !important;
}
</style>
