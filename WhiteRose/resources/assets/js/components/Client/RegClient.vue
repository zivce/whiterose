<template>
         <form class="fform">

            <!-- firstname reg form -->
          <div  class="fform_input">
            <label :for="regForm.inputs.firstname.id">{{regForm.inputs.firstname.label}}</label>

            <input  
            autocomplete="on"

            :class="{'has-error':errName}"
            :type="regForm.inputs.firstname.type" 
            :id="regForm.inputs.firstname.id" 
            :placeholder="regForm.inputs.firstname.label"
            v-model="regForm.inputs.firstname.value" 
            :required="regForm.inputs.firstname.validation.required"
            v-validate="{
              rules:{
                required:true
              }}"
            :name="regForm.inputs.firstname.id"/>
            <span v-if="errors.has('firstname')" class="incorrect_input">
              Name required!
            </span>
          
          </div>

          <div class="fform_input">
            <label :for="regForm.inputs.lastname.id">{{regForm.inputs.lastname.label}}</label>

            <input  
            autocomplete="on"

            :placeholder="regForm.inputs.lastname.label"
            :class="{'has-error':errLastName}"
            :type="regForm.inputs.lastname.type" 
            :id="regForm.inputs.lastname.id" 
            v-model="regForm.inputs.lastname.value" 
            :required="regForm.inputs.lastname.validation.required"
            v-validate="{
              rules:{
                required:true
              }}"
            :name="regForm.inputs.lastname.id"/>
            <span v-if="errors.has('lastname')" class="incorrect_input">
              Last name required!
            </span>
          
          </div>
          

        <!-- EMAIL INPUT -->
        
        <div class="fform_input">
        
          <label :for="regForm.inputs.email.id">{{regForm.inputs.email.label}}</label>


          <input 
          autocomplete="on"
          :placeholder="regForm.inputs.email.label"
          :class="{'has-error':errorEmail}"
          :type="regForm.inputs.email.type" 
          :id="regForm.inputs.email.id" 
          v-model="regForm.inputs.email.value" 
          :required="regForm.inputs.email.validation.required"
          v-validate="{required:true,email:true}"
          :name="regForm.inputs.email.id"
          />
        
        
          <span v-if="errors.has('email')" class="incorrect_input">
            Invalid email!
          </span>
        
        </div>
        
        <!-- PASSWORD INPUT  -->
        
        <div class="fform_input">
        
          <label :for="regForm.inputs.pw.id">{{regForm.inputs.pw.label}}</label>

          <input   
          autocomplete="on"

          :placeholder="regForm.inputs.pw.label"
          :class="{'has-error':errorPw}"
          :type="regForm.inputs.pw.type" 
          :id="regForm.inputs.pw.id" 
          v-model="regForm.inputs.pw.value" 
          :required="regForm.inputs.pw.validation.required"
          v-validate="{
            rules:{
            required:true
            }}"

          :name="regForm.inputs.pw.id"/>

          <span v-if="errors.has('password')" class="incorrect_input">
            turn verification for deployment.
          </span>
       
        </div>

        <!-- SAME PW AGAIN  -->

        <div  class="fform_input">
        
          <label :for="regForm.inputs.pwagain.id">{{regForm.inputs.pwagain.label}}</label>

          <input  
          autocomplete="on"

          :placeholder="regForm.inputs.pwagain.label"
          :class="{'has-error':errorPwAgain}"
          :type="regForm.inputs.pwagain.type" 
          :id="regForm.inputs.pwagain.id" 
          v-model="regForm.inputs.pwagain.value" 
          :required="regForm.inputs.pwagain.validation.required"
           v-validate="{
             rules:{
             required:true,is:regForm.inputs.pw.value,
            }}"
          :name="regForm.inputs.pwagain.id"/>
          <span v-if="errors.has('sameaspw')" class="incorrect_input">
            Not the same password!
          </span>
        
        </div>
        <b-button class="fixbtn btn btn-info btn-secondary actionbtn" @click="regForm.submitHandler()">
          Register!
        </b-button>
         </form>
</template>


<script>
import logger from "../../utils/groupLogger";
import { SnotifyPosition } from "vue-snotify";

export default {
  mounted() {
    logger(
      ["Component LoginClient mounted", "happy hacking"],
      "LoginClient.vue"
    );
  },
  destroyed() {},
  computed: {
    errName() {
      return this.errors.has("firstname");
    },
    errLastName() {
      return this.errors.has("lastname");
    },
    errorEmail() {
      return this.errors.has("email");
    },
    errorPw() {
      return this.errors.has("password");
    },
    errorPwAgain() {
      return this.errors.has("sameaspw");
    }
  },
  data() {
    let vm = this;

    return {
      regForm: {
        submitHandler() {
          axios
            .post("/clientreg", {
              email: vm.regForm.inputs.email.value,
              password: vm.regForm.inputs.pw.value,
              sameaspw: vm.regForm.inputs.pwagain.value,
              firstname: vm.regForm.inputs.firstname.value,
              lastname: vm.regForm.inputs.lastname.value
            })
            .then(function(response) {
              if (response.data === "This mail already exist") {
                vm.$snotify.error("User exists!", "Error!", {
                  position: SnotifyPosition.centerTop,
                  backdrop: 0.5
                });

                return;
              } else if (response.status === 200) {
                window.setTimeout(() => {
                  window.location.href = "/";
                });
                return;
              }
            })
            .catch(response => {
              vm.$snotify.error("An error has occured.", "Error", {
                position: SnotifyPosition.centerTop,
                backdrop: 0.5
              });

              window.setTimeout(() => {
                window.location.reload();
              }, 1500);
            });
        },
        inputs: {
          email: {
            type: "text",
            id: "email",
            label: "e-mail address",
            value: "",
            validation: {
              required: true
            }
          },
          pw: {
            type: "password",
            id: "password",
            label: "password",
            value: "",
            validation: {
              required: true
            }
          },
          pwagain: {
            type: "password",
            id: "sameaspw",
            value: "",
            label: "repeat password",
            validation: {
              required: true
            }
          },
          firstname: {
            type: "text",
            id: "firstname",
            label: "Name",
            value: "",
            validation: {
              required: true
            }
          },
          lastname: {
            type: "text",
            id: "lastname",
            label: "Last Name",
            value: "",
            validation: {
              required: true
            }
          }
        }
      }
    };
  }
};
</script>


<style scoped>
/* da se pomeri na dole kad predje na sledecu komponentu  */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.has-error {
  border: 1px solid rgba(255, 0, 0, 1);
}

.incorrect_input {
  float: left;
  width: 100%;
  color: red;
  font-size: 10px;
  font-weight: 700;
}

/* app  input css */
.fform_input label {
  font-size: 15px;
  font-weight: 700;
  padding-right: 0.5rem;
  margin: auto;
}
</style>
