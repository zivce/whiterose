<template>
    <form class="fform">
      

        <div class="fform_input">
        
          <label :for="inputs.email.id">{{inputs.email.label}}</label>


          <input 
          autocomplete="on"
          :placeholder="inputs.email.label"
          :class="{'has-error':errorEmail}"
          :type="inputs.email.type" 
          :id="inputs.email.id" 
          v-model="inputs.email.value" 
          :required="inputs.email.validation.required"
          v-validate="{required:true,email:true}"
          :name="inputs.email.id"
          />
        
        
          <span v-if="errors.has('email')" class="incorrect_input">
            Invalid email!
          </span>
        
        </div>

        <!-- PASSWORD INPUT  -->
        
        <div class="fform_input">
        
          <label :for="inputs.pw.id">{{inputs.pw.label}}</label>

          <input   
          autocomplete="on"

          :placeholder="inputs.pw.label"
          :class="{'has-error':errorPw}"
          :type="inputs.pw.type" 
          :id="inputs.pw.id" 
          v-model="inputs.pw.value" 
          :required="inputs.pw.validation.required"
          v-validate="{
            rules:{
            required:true
            }
          }"

          :name="inputs.pw.id"/>

          <span v-if="errors.has('password')" class="incorrect_input">
            Put sample of Blood type A 
          </span>
       
        </div>


        <b-button class="btn btn-info btn-secondary actionbtn" @click.once="submitHandler()">
          Log In!
        </b-button>


    </form>
</template>


<script>
import logger from "../../utils/groupLogger";
import { SnotifyPosition } from "vue-snotify";

export default {
  mounted() {},
  computed: {
    errorEmail() {
      return this.errors.has("email");
    },
    errorPw() {
      return this.errors.has("password");
    }
  },
  destroyed() {},
  data() {
    return {
      submitHandler() {
        axios
          .post("/userLogin", {
            email: this.inputs.email.value,
            pw: this.inputs.pw.value
          })
          .then(function(response) {
            let user_exists = response.data !== "User does not exist";

            let email_not_verified =
              response.data === "Please verify your account";

            if (email_not_verified) {
              this.$snotify.info("Verify your email.", "Verification", {
                position: SnotifyPosition.centerTop,
                backdrop: 0.5
              });

              return;
            } else if (user_exists) {
              //after login go to home and header should change

              axios.get("/home").then(() => {
                window.setTimeout(() => {
                  window.location.href = "/";
                }, 5);

                return;
              });
            } else {
              //does not exist
              this.$snotify.error("User does not exist!", "Error!", {
                position: SnotifyPosition.centerTop,
                backdrop: 0.5
              });
            }
          })
          .catch(function(error) {
            vm.$snotify.error("Not logged in!", "Error!", {
              position: SnotifyPosition.centerTop,
              backdrop: 0.5
            });
          });
      },
      inputs: {
        email: {
          type: "email",
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
        }
      }
    };
  }
};
</script>


<style scoped>
.has-error {
  border: 1px solid rgba(255, 0, 0, 1);
}
/* da se pomeri na dole kad predje na sledecu komponentu  */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
