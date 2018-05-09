<template>
<div id="root_setup" class="setup_margin_top">
    <div class="d-flex flex-row">
    
    <div class="d-flex col-5" id="sidebar_dashboard">
        <b-nav class="flex-column">
            <h3 class="h3s">Select option from list.</h3>

            <b-nav-item @click="switchComponentNum(0)">
                Reset Password
            </b-nav-item>

            <b-nav-item  @click="switchComponentNum(1)">
                Add Description
            </b-nav-item>
            

        </b-nav>
    </div>
    

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

export default {
  mounted(){
    
    for(let i = 0;i< this.num_of_links ; i++)
        this.arr_of_comps_visible[i] = false;

    this.arr_of_comps_visible[1] = true;
    
    },
  computed: {
    
    errDesc() {
      return this.errors.has(this.descinput.id);
    },
    errSamePw() {
      return this.errors.has("newpwagain");
    }
  },
  components: {
    DashboardInput
  },
  methods: {

      switchComponentNum(num){
          if(num === 0)
          {
              this.isVisibleReset = true;
              this.isVisibleDesc = false;
          }
          else if(num === 1)
          {
              this.isVisibleReset = false;
              this.isVisibleDesc = true;
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
              vm.notifySuccess("An error happened.", "Error.");
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


        num_of_links : 2,
      arr_of_comps_visible: [],

      all_fields_ok: false,
      descinput: {
        id: "desc",
        label: "description",
        type: "text",
        value: "",
        id_upper: "Description"
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
