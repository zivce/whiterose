<template>
    <form class="fform" id="login_form_hacker">
        
        <h2 class="h2s">
          Whiterose
        </h2>
        
        <p class="text-muted">Login to continue to dashboard.</p>

        <form-input 
        :prop.sync="inputs.email"/>
        <form-input 
        :last="true"
        :prop.sync="inputs.password"/> 

        <div class="d-flex flex-column">
        
          <b-button class="btn btn-info btn-secondary actionbtn" @click="submitHandler()">
            Log In!
          </b-button>

          <router-link :to="{name : 'hacker_reg'}"> 
            Create an account here. 
          </router-link>
        
        </div>
    </form>
</template>


<script>
import { SnotifyPosition } from "vue-snotify";
import FormInput from "../utilcomps/FormInput.vue";
import eventBus from "../../utils/eventBus";

export default {
  mounted() {
    eventBus.$on("field_ok", val => {
      this.inputs[val.id].ok = val.field_ok;
    });
  },
  components: {
    FormInput
  },
  mixins: [],
  computed: {},
  destroyed() {},
  data() {
    let vm = this;
    return {
      all_fields_ok: false,

      submitHandler() {
        this.checkAllFields();

        if (!vm.all_fields_ok) {
          this.errorNotify();
          return;
        }

        axios
          .post("/hackerlogin", {
            email: this.inputs.email.value,
            pw: this.inputs.password.value
          })
          .then(function(response) {
            let wrong_info = response.data === "Wrong username or password";
            let user_exists = response.data !== "User does not exist";
            const banned_user = response.data === "Your account is suspended";
        
            if(banned_user)
            {
              vm.errorToast("You are banned from site!","Error!");
              return;
            }
            
            let email_not_verified =
              response.data === "Please verify your account";

            if (email_not_verified) {
              this.$snotify.info("Verify your email.", "Verification", {
                position: SnotifyPosition.centerTop,
                backdrop: 0.5
              });

              return;
            } else if (user_exists) {
               if (wrong_info) {
                vm.errorToast("Wrong info.", "Error!");
              } else {
                // vm.notifySuccess("User logged in", "Success");
                window.location.reload();
              }
            } 
            else {
              //does not exist
              this.errorToast("User does not exist!", "Error!")

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
          ok: false,
          type: "email",
          id: "email",
          label: "e-mail address",
          value: "",
          validation: {
            required: true
          }
        },
        password: {
          ok: false,
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
#login_form_hacker{
  margin: auto;
}

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
