<template>
    <div>

    <h1 class="row justify-content-center align-items-center headers">
        Welcome admin.
    </h1>

    <form class="fform">
        <form-input :prop.sync="inputs.email"/>

        <form-input :prop.sync="inputs.pw"/> 

        <b-button class="btn btn-info btn-secondary actionbtn" @click="submitHandler()">
          Log In!
        </b-button>


    </form>

    </div>    
</template>


<script>
import { SnotifyPosition } from "vue-snotify";
import FormInput from "../utilcomps/FormInput.vue";

export default {
  mounted() {},
  components: {
    FormInput
  },
  computed: {},
  destroyed() {},
  data() {
    let vm = this;
    return {
      submitHandler() {
        axios
          .post("/adminlogin", {
            email: vm.inputs.email.value,
            pw: vm.inputs.pw.value
          })
          .then(function(response) {
            let user_exists = response.data !== "User does not exist";

            if (user_exists) {
              //after login go to home and header should change
              window.location.reload();
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
</style>
