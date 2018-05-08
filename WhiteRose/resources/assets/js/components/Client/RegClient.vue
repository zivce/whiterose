<template>
        <form class="fform">
          <form-input :prop.sync="inputs.firstname"/>
          <form-input :prop.sync="inputs.username"/>
          <form-input :prop.sync="inputs.lastname"/>
          <form-input :prop.sync="inputs.email"/>
          <form-input :prop.sync="inputs.pw"/>
        
        <!-- SAME PW AGAIN  -->

        <div  class="fform_input">
        
          <label :for="inputs.pwagain.id">{{inputs.pwagain.label}}</label>

          <input  
          autocomplete="on"

          :placeholder="inputs.pwagain.label"
          :class="{'has-error':errorPwAgain}"
          :type="inputs.pwagain.type" 
          :id="inputs.pwagain.id" 
          v-model="inputs.pwagain.value" 
          :required="inputs.pwagain.validation.required"
           v-validate="{
             rules:{
             required:true,is:inputs.pw.value,
            }}"
          :name="inputs.pwagain.id"/>
          <span v-if="errors.has('pwagain')" class="incorrect_input">
            Not the same password!
          </span>
        
        </div>
        <b-button class="fixbtn btn btn-info btn-secondary actionbtn" @click="submitHandler()">
          Register!
        </b-button>
         </form>
</template>


<script>
import logger from "../../utils/groupLogger";
import { SnotifyPosition } from "vue-snotify";
import FormInput from "../utilcomps/FormInput.vue";


import eventBusRegC from "../../utils/eventBusRegC";
import errorToastr from '../toastr/FormErrorToaster';
import checkFields from '../../utils/checkAllFields';


export default {
  mounted() {
    eventBusRegC.$on("field_ok", val => {
      let id = val.id;
        
      if(typeof this.inputs[id] === "undefined")
        return;
      this.inputs[id].ok = val.field_ok;

    });
   
  },
  destroyed() {},
  components: {
    FormInput
  },
  computed: {
    errorPwAgain() {
  
      if(this.inputs.pwagain.value === "")
        this.inputs.pwagain.ok = false;
      else
        this.inputs.pwagain.ok = !this.errors.has("pwagain");

      return this.errors.has("pwagain");
    }
  },
  mounted() {
  
  },
  mixins : [errorToastr,checkFields],
  data() {
    return {
      all_fields_ok: false,
        submitHandler() {
          let vm = this;
          debugger;
          this.checkAllFields();
          
          if (!vm.all_fields_ok) {
            this.errorNotify();
            return;
          }


          axios
            .post("/clientreg", {
              email: vm.inputs.email.value,
              password: vm.inputs.pw.value,
              sameaspw: vm.inputs.pwagain.value,
              firstname: vm.inputs.firstname.value,
              lastname: vm.inputs.lastname.value
            })
            .then(function(response) {
              if (response.data === "This mail already exist") {
                vm.$snotify.error("User exists!", "Error!", {
                  position: SnotifyPosition.centerTop,
                  backdrop: 0.5
                });

                return;
              } else if (response.status === 200) {
                // window.setTimeout(() => {
                //   window.location.href = "/";
                // });
                return;
              }
            })
            .catch(response => {
              vm.$snotify.error("An error has occured.", "Error", {
                position: SnotifyPosition.centerTop,
                backdrop: 0.5
              });

              // window.setTimeout(() => {
              //   window.location.reload();
              // }, 1500);
            });
        },
        inputs: {
          email: {
            reg_c:true,
            ok: false,
            type: "text",
            id: "email",
            label: "e-mail address",
            value: "",
            validation: {
              required: true
            }
          },
          pw: {
            reg_c:true,

            ok: false,
            type: "password",
            id: "pw",
            label: "password",
            value: "",
            validation: {
              required: true
            }
          },
          pwagain: {
            reg_c:true,

            ok: false,
            type: "password",
            id: "pwagain",
            value: "",
            label: "repeat password",
            validation: {
              required: true
            }
          },
          firstname: {
            reg_c:true,

            ok: false,
            type: "text",
            id: "firstname",
            label: "Name",
            value: "",
            validation: {
              required: true
            }
          },
          username: {
            reg_c:true,

            ok: false,
            type: "text",
            id: "username",
            label: "Username",
            value: "",
            validation: {
              required: true
            }
          },
          lastname: {
            reg_c:true,

            ok: false,
            type: "text",
            id: "lastname",
            label: "Last Name",
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
