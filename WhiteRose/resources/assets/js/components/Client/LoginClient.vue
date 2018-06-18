<template>
    <form class="fform" ref="log_form_client" id="login_form_client">
        <h2 class="h2s">
          Whiterose</h2>
        <p class="text-muted">Login to continue to dashboard.</p>

        <form-input ref="email" :prop.sync="inputs.email"/>
        <form-input ref = "pw" :prop.sync="inputs.password"/> 
        <div class="d-flex flex-column">
          <b-button ref="btn" class="btn btn-info btn-secondary actionbtn" @click="submitHandler()">
            Login
          </b-button>

          <router-link :to="{name : 'client_reg'}"> 
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
      let id = val.id;

      if (typeof this.inputs[id] === "undefined") return;

      this.inputs[id].ok = val.field_ok;
    });
  },
  components: {
    FormInput
  },
  mixins: [],
  computed: {},
  destroyed() {},
  data() {
    return {
      all_fields_ok: false,

      loggedIn: false,
      clickPassed: false,
      submitHandler() {
        let vm = this;
        this.clickPassed = true;
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
            let wrong_info = response.data === "Wrong username or password";
            let email_not_verified =
              response.data === "Please verify your account";

            if (email_not_verified) {
              vm.$snotify.info("Verify your email.", "Verification", {
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
            } else {
              //does not exist
              vm.errorToast("User does not exist!", "Error!");
            }
          })
          .catch(function(error) {
            vm.errorToast("An error has occured!", "Error!");

            window.setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
      },
      inputs: {
        email: {
          login_c: true,
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
          login_c: true,
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
#login_form_client
{
  margin:auto;
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
