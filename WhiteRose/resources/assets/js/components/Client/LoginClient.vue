<template>
    <form class="fform">
        <form-input :prop.sync="inputs.email"/>
        <form-input :prop.sync="inputs.password"/> 

        <b-button class="btn btn-info btn-secondary actionbtn" @click="submitHandler()">
          Log In!
        </b-button>


    </form>
</template>


<script>
import logger from "../../utils/groupLogger";
import { SnotifyPosition } from "vue-snotify";
import FormInput from "../utilcomps/FormInput.vue";
import eventBus from "../../utils/eventBus";
import errorToastr from '../toastr/FormErrorToaster';
import checkFields from '../../utils/checkAllFields';


export default {
  mounted() {
    eventBus.$on("field_ok", val => {
      this.inputs[val.id].ok = val.field_ok;
    });
  },
  components: {
    FormInput
  },
  mixins : [errorToastr,checkFields],
  computed: {},
  destroyed() {},
  data() {
    return {
      all_fields_ok: false,
      
      submitHandler() {
        let vm = this;
        
        this.checkAllFields();
        
        if (!vm.all_fields_ok) {
          this.errorNotify();
          return;
        }

        axios
          .post("/clientlogin", {
            email: this.inputs.email.value,
            pw: this.inputs.password.value
          })
          .then(function(response) {
            let user_exists = response.data !== "User does not exist";

            let email_not_verified =
              response.data === "Please verify your account";

            if (email_not_verified) {
              vm.$snotify.info("Verify your email.", "Verification", {
                position: SnotifyPosition.centerTop,
                backdrop: 0.5
              });

              return;
            } else if (user_exists) {
              //after login go to home and header should change

              axios.get("/home").then(() => {
                // window.setTimeout(() => {
                //   window.location.href = "/";
                // }, 5);

                return;
              });
            } else {
              //does not exist
              vm.$snotify.error("User does not exist!", "Error!", {
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
