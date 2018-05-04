<template>
    <div>

    <h1 class="row justify-content-center align-items-center headers">
        Welcome admin.
    </h1>

    <form class="fform">
        <form-input :prop.sync="inputs.email"/>

        <form-input :prop.sync="inputs.pw"/> 

        <b-button class="btn btn-info btn-secondary actionbtn" @click.once="submitHandler()">
          Log In!
        </b-button>


    </form>

    </div>    
</template>


<script>
import logger from "../../utils/groupLogger";
import { SnotifyPosition } from "vue-snotify";
import FormInput from "../utilcomps/FormInput.vue";

export default {
  mounted() {},
  components:{
    FormInput
  },
  computed: {
  
  },
  destroyed() {},
  data() {
    return {
      submitHandler() {
        axios
          .post("/adminlogin", {
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
