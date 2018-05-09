<template>
<div id="root_setup" class="setup_margin_top">
    <div class="d-flex flex-row">
    
    <div class="d-flex col-5" id="sidebar_dashboard">
        <b-nav class="flex-column">
            <h3 class="h3s">Select option from list.</h3>

            <b-nav-item @click="switchComponentNum('resetpw')">
                Reset Password
            </b-nav-item>

            <b-nav-item  @click="switchComponentNum('addesc')">
                Add Description
            </b-nav-item>

            
            <b-nav-item  @click="switchComponentNum('verifysite')">
                Verify Sites
            </b-nav-item>
            
            
            <b-nav-item  @click="switchComponentNum('avatar')">
                Add Avatar
            </b-nav-item>
            

        </b-nav>
    </div>
    
    <!-- ADD AVATAR  -->

    <div class="d-flex col-5" v-if="isVisibleChangeImage">

            <div class="dashboard_setup_container">
                
                    <h3 class="h3s">
                        Insert new image.
                    </h3>

                    <b-form-file accept="image/jpg, image/png" v-model="avatar_image" placeholder="Choose file">

                    </b-form-file>

    

                <b-button class="btn btn-info btn-secondary actionbtn" @click="insertImageHandler()">
                    Insert  
                </b-button>
            </div>
        </div>


    <!-- VERIFY SITE  -->

    <div class="d-flex col-5" v-if="isVisibleVerifySite">

            <div class="dashboard_setup_container">
                
                    <h3 class="h3s">
                        Verify site
                    </h3>

                <div id="second_input" class="fform_input_job">
        

                    <input  
                    :placeholder="site_for_verification.label"
                    :class="{'has-error':errSiteVerif}"
                    :type="site_for_verification.type" 
                    :id="site_for_verification.id" 
                    v-model="site_for_verification.value" 
                    required="true"
                    v-validate="{rules:{
                      required:true
                      }}"
                    :maxlength="10"
                    :name="site_for_verification.id"/>
                    
                    <span v-if="errors.has(site_for_verification.id)" class="incorrect_input">
                        Site required!
                    </span>
                    
                    </div>

                <p style="text-align:center">
                  
                  
                  Insert this txt file  
                  <a href="link/file.txt" download>
                    <icon name="file" id="icon_file"></icon>
                  </a> 
                  to your <code>public</code>
                  directory and then click verify.
                  
                </p>
                 <b-button class="btn btn-info btn-secondary actionbtn" @click="verifySiteHandler()">
                    Verify 
                </b-button>
          </div>
    </div>

    <!-- RESET PW  -->

    <div class="d-flex col-5" v-if="isVisibleReset">

            <div class="dashboard_setup_container">
                
                    <h3 class="h3s">
                        Reset password
                    </h3>

                <dashboard-input 
                :prop.sync="newpw"
                >

                </dashboard-input>

                <div id="second_input" class="fform_input_job">
        

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


    </div>
    
</div>
</template>

<script>
import DashboardInput from "./Inputs/DashboardInput.vue";
import eventBus from "../../../../utils/eventBus";

import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/file";
export default {
  mounted(){

    //make fields ok
    
    eventBus.$on("field_ok", val => {
      this.all_fields_ok &= val;
    });

    //Define starting component
    this.arr_comps['resetpw'] = true ;
    this.arr_comps['addesc'] = false ;
    this.arr_comps['avatar'] = false ;
    this.arr_comps[ 'verifysite'] = false ;
    

    },
  computed: {
    errSiteVerif(){
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
    DashboardInput,Icon
  },
  methods: {

      //ne radi .get za Map
      // isVisible(comp)
      // {

      // },
      switchComponentNum(comp){

        if(comp === 'addesc')
        {
          this.isVisibleDesc = true;
          this.isVisibleChangeImage = false;
          this.isVisibleReset = false;
          this.isVisibleVerifySite = false;
        }

        if(comp === 'resetpw')
        {
          this.isVisibleDesc = false;
          this.isVisibleChangeImage= false;
          this.isVisibleReset = true;
          this.isVisibleVerifySite = false;
        }

        if(comp === 'verifysite')
        {
          this.isVisibleDesc = false;
          this.isVisibleChangeImage = false;
          this.isVisibleReset = false;
          this.isVisibleVerifySite = true;
        }
        
        if(comp === 'avatar')
        {
          this.isVisibleDesc = false;
          this.isVisibleChangeImage = true;
          this.isVisibleReset = false;
          this.isVisibleVerifySite = false;
        }
        
      },


      postDescription() {
      let vm = this;

      //   eventBus.$emit("validateAllFields");

      this.$validator.validateAll().then(form_ok => {
        if (form_ok) {
          axios
            .post("/postdescription", {
              desc: this.descinput.value
            })
            .then(function(response) {
              vm.successToast("Description added.", "Success.");
            })
            .catch(function(error) {
              vm.errorToast("An error happened.", "Error.");
            });
        } else {
          //reset
          vm.errorToast("Please fill out form correctly.", "Error.");
          vm.all_fields_ok = true;
        }
      });
    },

    
    //TODO: Check validation for site verification not working

    verifySiteHandler() {
      let vm = this;
      this.$validator.validateAll().then(form_ok => {
        if (form_ok) {
          axios
            .post("/verifysite", {
              desc: this.avatar_image
            })
            .then(function(response) {
              vm.successToast("Site verified.", "Success.");
            })
            .catch(function(error) {
              vm.errorToast("An error happened.", "Error.");
            });
        } else {
          //reset
          vm.errorToast("Please fill out form correctly.", "Error.");

          vm.all_fields_ok = true;
        }
      });
    },

    insertImageHandler() {
      let vm = this;

      //   eventBus.$emit("validateAllFields");

      this.$validator.validateAll().then(form_ok => {
        if (form_ok) {
          axios
            .post("/changeImage", {
              desc: this.avatar_image
            })
            .then(function(response) {
              vm.successToast("Avatar added.", "Success.");
            })
            .catch(function(error) {
              vm.errorToast("An error happened.", "Error.");
            });
        } else {
          //reset
          vm.all_fields_ok = true;
        }
      });
    },

    resetHandler() {
      let vm = this;

      eventBus.$emit("validateAllFields");

      this.$validator.validateAll().then(form_ok => {
        if (form_ok && vm.all_fields_ok) {
          axios
            .post("/resetPw", {
              newpw: this.newpw.value
            })
            .then(function(response) {
              vm.successToast("Password reseted.", "Success");
            })
            .catch(function(error) {
              vm.notifySuccess("An error happened.", "Error!");
            });
        } else {
          //reset
          vm.errorToast("Please fill out form correctly.", "Error.");
          vm.all_fields_ok = true;
        }
      });
    }

  },
  data() {
    return {
      //Visibility variables
      isVisibleReset: true,
      isVisibleDesc: false,
      isVisibleChangeImage : false,
      isVisibleVerifySite : false,

      //Validation helper
      all_fields_ok: false,
      
      arr_comps : {},

      //Props to send to backend
      avatar_image : null,
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
#icon_file
{
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
</style>
