<template>
<div id="root_setup" class="setup_margin_top">
    <div class="d-flex flex-row">

    <!-- TODO: probaj sa v-show da napravis -->
    <transition name="fade">

    <div class="d-flex col-5" id="sidebar_dashboard">
        <b-nav class="flex-column">
            <h3 class="h3s">Select option from list.</h3>

            <b-nav-item @click="switchComponentNum('resetpw')">
              <span :class="{'strong':isVisibleReset}">
                  Reset Password
                </span>
            </b-nav-item>

            <b-nav-item  @click="switchComponentNum('addesc')">
                <span :class="{'strong':isVisibleDesc}">
                  Add Description
                </span>
            </b-nav-item>

            
            <b-nav-item  @click="switchComponentNum('verifysite')">
                <span :class="{'strong':isVisibleVerifySite}">
                  Verify Sites
                </span>
            </b-nav-item>
            
            
            <b-nav-item  @click="switchComponentNum('avatar')">
                <span :class="{'strong':isVisibleChangeImage}">
                  Add Avatar
                </span>

            </b-nav-item>
            

        </b-nav>
    </div>

    
    </transition>

    <!-- ADD AVATAR  -->
    <!-- <transition name="fade"> -->

    <div class="d-flex col-5" v-if="isVisibleChangeImage">

            <div class="dashboard_setup_container">
                
                    <h3 class="h3s">
                        Insert new image.
                    </h3>

                    <b-form-file
                    name="avatar"
                    :state="!errAvatar"
                    v-validate="{
                      rules:{
                        required:true
                      }
                      }"
                    accept="image/jpg, image/png" 
                    @change="processFile($event)"
                    v-model="avatar_image" 
                    placeholder="Choose file">

                    </b-form-file>

                    <span v-if="errors.has('avatar')" 
                    class="incorrect_input">
                        Image required!
                    </span>

                <b-button class="btn btn-info btn-secondary actionbtn" @click="insertImageHandler()">
                    Insert  
                </b-button>
            </div>
        </div>
      <!-- </transition> -->


    <!-- VERIFY SITE  -->
    <!-- <transition name="fade"> -->

    <div class="d-flex col-5" v-if="isVisibleVerifySite">

            <div class="dashboard_setup_container">
                
                    <h3 class="h3s">
                        Verify site
                    </h3>

                <dashboard-input 
                v-if="isInputSitePart"
                :prop.sync="site_for_verification"
                >
                </dashboard-input>
                
                <!-- <div class="fform_input_job">
        
                    TODO : dodaj regex za sajt 

                    <input  
                    v-if="isInputSitePart"
                    :placeholder="site_for_verification.label"
                    :class="{'has-error':errSiteVerif}"
                    :type="site_for_verification.type"
                    id="site" 
                    v-model="site_for_verification.value" 
                    required="true"
                    v-validate="{rules:{
                      required:true
                      }}"
                      
                    :maxlength="10"
                    name="site"/>
                    
                    <span v-if="errors.has('site')" class="incorrect_input">
                        Site required!
                    </span>
                    
                </div> -->

                <!-- SECOND PART -->
                
                <v-client-table
                class="col-12"
                v-if="isKeyVerifPart"
                :data='client_sites'
                :columns='columns_sites'
                :options='options_sites'
                >
              
              <a  slot="verified" 
                  slot-scope="props"
                  class="cursorable"
              >
                  <icon v-if="props.row.verified" class="check_ico" name="check"></icon>
                  <icon v-if="!props.row.verified" class="times_ico" name="times"></icon>
               
              </a>
              <a  
                  v-if="!props.row.verified"
                  slot="verify" 
                  slot-scope="props"
                  class="cursorable"
                  href ="link_here"
                  @click="keyDownloaded"
                  download
              >key</a>
                
                </v-client-table >
                
                <p 
                v-if="isVerifySitePart"
                style="text-align:center">
                  Insert the downloaded file
                  to your <code>public</code>
                  directory and then click verify.                  
                </p>

                <!-- THIRD PART -->



                <!-- BUTTONS SECTION -->

                 <b-button 
                  v-if="isInputSitePart"
                 class="btn btn-info btn-secondary actionbtn" 
                 @click="newSiteHandler()">
                 
                    Next step > 
                
                </b-button>

                 <!-- <b-button 
                  v-if="isKeyVerifPart"
                 class="btn btn-info btn-secondary actionbtn" 
                 @click="keyDownloaded()">
                 
                    Next step > 
                
                </b-button> -->
                 <b-button 
                  v-if="isKeyVerifPart"
                 class="btn btn-info btn-secondary actionbtn" 
                 @click="getBackToFirstScreen()">
                 
                    Back 
                
                </b-button>
               
                <div style="display:flex;flex-direction:row;wrap:row;">
                  <b-button 
                    v-if="isVerifySitePart"
                  class="btn btn-info btn-secondary actionbtn" 
                  @click="getBackToSecondScreen()">
                  
                      Back 
                  
                  </b-button>


                  <b-button 
                    v-if="isVerifySitePart"
                  class="btn btn-info btn-secondary actionbtn" 
                  @click="verifySite()">
                  
                      Verify 
                  
                  </b-button>
                </div>
               

          
          
          </div>
    </div>
    <!-- </transition> -->
    <!-- RESET PW  -->
    <!-- <transition name="fade"> -->

    <div class="d-flex col-5" v-if="isVisibleReset">

            <div class="dashboard_setup_container">
                
                    <h3 class="h3s">
                        Reset password
                    </h3>

                <dashboard-input 
                :prop.sync="newpw"
                >

                </dashboard-input>

                <div class="fform_input_job">
        

                    <input  
                    :placeholder="newpwagain.label"
                    :class="{'has-error':errSamePw}"
                    :type="newpwagain.type" 
                    :id="newpwagain.id" 
                    v-model="newpwagain.value" 
                    required="true"
                    v-validate="{required:true,is:newpw.value}"
                    :maxlength="10"
                    :name="newpwagain.id"/>
                    
                    <span v-if="errors.has(newpwagain.id)" class="incorrect_input">
                        Same password required!
                    </span>
                    
                    </div>

                <b-button class="btn btn-info btn-secondary actionbtn" @click="resetHandler()">
                    Reset 
                </b-button>
            </div>
        </div>
    <!-- </transition> -->
    <!-- <transition name="fade"> -->

        <!-- ADD DESCRIPTION  -->

        <div class="d-flex col-5" v-if="isVisibleDesc">
            <div class="dashboard_setup_container">


                    <div class="group_input_title">

                    <h3 class="h3s">
                        Insert description.
                    </h3>
                    
                    <textarea  
                    class="textarea_everyone"
                    :placeholder="descinput.label"
                    :class="{'has-error':errDesc}"
                    :type="descinput.type"
                    :id="descinput.id" 
                    v-model="descinput.value" 
                    required:true
                        v-validate="{
                        rules:{
                            required:true
                        }}"
                    :name="descinput.id">
                    
                    </textarea>


                    <span v-if="errors.has(descinput.id)" class="incorrect_input">
                        {{descinput.id_upper}} required!
                    </span>
                    
                    <b-button class="btn btn-info btn-secondary actionbtn" @click="postDescription()">
                        Post 
                    </b-button>
            </div>
            </div>
        </div>
    <!-- </transition> -->

    </div>
    
</div>
</template>

<script>
import DashboardInput from "./Inputs/DashboardInput.vue";
import eventBus from "../../../../utils/eventBus";

import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/file";
import "vue-awesome/icons/times";

//API services

import PostDescApi from "../../../../services/api/user_api/postDescription.api";
import VerifySiteApi from "../../../../services/api/user_api/verifySite.api";
import PostAvatarApi from "../../../../services/api/user_api/postAvatar.api";
import ResetPwApi from "../../../../services/api/user_api/resetPw.api";
// import ClientSitesHardcode from './client_sites.hardcode';

export default {
  mounted() {
    this.client_sites = this.$store.state.sites;

    eventBus.$on("field_ok", val => {
      this.all_fields_ok &= val;
    });
  },
  computed: {
    errAvatar() {
      return this.errors.has("avatar");
    },
    errSiteVerif() {
      return this.errors.has(this.site_for_verification.id);
    },
    errDesc() {
      return this.errors.has(this.descinput.id);
    },
    errSamePw() {
      return this.errors.has("newpwagain");
    }
  },
  components: {
    DashboardInput,
    Icon
  },
  methods: {
    getKey() {
      //download logic here..
    },
    getBackToFirstScreen() {
      this.isInputSitePart = true;
      this.isKeyVerifPart = false;
      this.isVerifySitePart = false;
    },
    getBackToSecondScreen() {
      this.isInputSitePart = false;
      this.isKeyVerifPart = true;
      this.isVerifySitePart = false;
    },
    keyDownloaded() {
      this.isInputSitePart = false;
      this.isKeyVerifPart = false;
      this.isVerifySitePart = true;
    },

    verifySite() {
      this.isInputSitePart = true;
      this.isKeyVerifPart = false;
      this.isVerifySitePart = false;
    },

    checkImageInput() {
      return this.errAvatar ? false : true;
    },

    switchComponentNum(comp) {
      if (comp === "addesc") {
        this.errors.clear();
        this.isVisibleDesc = true;
        this.isVisibleChangeImage = false;
        this.isVisibleReset = false;
        this.isVisibleVerifySite = false;
      }

      if (comp === "resetpw") {
        this.errors.clear();
        this.isVisibleDesc = false;
        this.isVisibleChangeImage = false;
        this.isVisibleReset = true;
        this.isVisibleVerifySite = false;
      }

      if (comp === "verifysite") {
        this.errors.clear();
        this.isVisibleDesc = false;
        this.isVisibleChangeImage = false;
        this.isVisibleReset = false;
        this.isVisibleVerifySite = true;
      }

      if (comp === "avatar") {
        this.errors.clear();
        this.isVisibleDesc = false;
        this.isVisibleChangeImage = true;
        this.isVisibleReset = false;
        this.isVisibleVerifySite = false;
      }
    },
    processFile(event) {
      this.avatar_file.append("avatar", event.target.files[0]);
    },

    //HANDLERS FORMS
    newSiteHandler() {
      if (this.site_for_verification.value.length) {
        this.isInputSitePart = false;
        this.isKeyVerifPart = true;
        this.isVerifySitePart = false;
      } else {
        this.errorToast("Please insert site", "Error!");
      }
    },

    postDescription() {
      let vm = this;
      let valid = this.$validator;
      let desc = { desc: this.descinput.value };

      PostDescApi.postDescription(valid, vm, this.descinput.value);
    },

    //TODO: Check validation for site verification not working

    verifySiteHandler() {
      let vm = this;
      let valid = this.$validator;
      let send = { site: this.site_for_verification.value };

      VerifySiteApi.verifySite(valid, vm, send);
    },

    insertImageHandler(e) {
      let vm = this;
      let valid = this.$validator;

      PostAvatarApi.postAvatar(valid, vm, this.avatar_file);
    },

    resetHandler() {
      let vm = this;

      eventBus.$emit("validateAllFields");

      let valid = this.$validator;
      let send = { newpw: this.newpw.value };

      ResetPwApi.resetPw(valid, vm, send);
    }
  },
  data() {
    return {
      //Visibility variables
      isVisibleReset: true,
      isVisibleDesc: false,
      isVisibleChangeImage: false,
      isVisibleVerifySite: false,
      isInputSitePart: true,
      isKeyVerifPart: false,
      isVerifySitePart: false,

      //Validation helper
      all_fields_ok: false,
      //Site verification
      client_sites: [],
      columns_sites: ["domain", "verified", "verify"],
      options_sites: {
        columnsClasses: {
          verified: "cursorable",
          domain: "cursorable"
        },
        filterable: [],
        filterByColumn: true,
        pagination: {
          dropdown: true,
          nav: "scroll"
        }
      },
      //Props to send to backend
      avatar_file: new FormData(),
      avatar_image: null,
      descinput: {
        id: "desc",
        label: "description",
        type: "text",
        value: "",
        id_upper: "Description"
      },

      site_for_verification: {
        id: "site",
        label: "Site for verification",
        type: "text",
        value: "",
        id_upper: "Site"
      },
      newpw: {
        id: "newpw",
        label: "new password",
        type: "password",
        value: ""
      },
      newpwagain: {
        id: "newpwagain",
        label: "repeat password",
        type: "password",
        value: ""
      }
    };
  }
};
</script>

<style scoped>
.strong {
  color: rgb(7, 8, 15);
  font-weight: 600;
}

#icon_file {
  vertical-align: middle;
}
#sidebar_dashboard {
  /* background-color: blue; */
  border-radius: 0;
}

#second_input {
  margin-top: 3%;
}
.color_container {
  background-color: rgba(2, 2, 49, 0.76);
}
.has-error {
  border: 1px solid rgba(255, 0, 0, 1);
}
.check_ico {
  color: rgba(0, 128, 0, 0.726);
}
.times_ico {
  color: rgb(173, 6, 6);
}
</style>
