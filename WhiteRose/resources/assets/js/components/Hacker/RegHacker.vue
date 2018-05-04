<template>
     <form class="fform">

            <!-- username reg form -->
          <b-tabs pills card>

            <b-tab title="Skills">

              <skills-input :skill.sync="regForm.inputs.skills[0]">
              </skills-input>
            
            </b-tab>

            <b-tab title="Info 1"  class="my-tab">
                <form-input :prop.sync="regForm.inputs.username" >
                </form-input>

                <form-input :prop.sync="regForm.inputs.firstname" >
                </form-input>


                <form-input :prop.sync="regForm.inputs.lastname" >
                </form-input>
            </b-tab>


            <b-tab title="Info" class="my-tab">
              <form-input :prop.sync="regForm.inputs.email" :vval="regForm.inputs.vvalidation">
              </form-input>
              
              
              <form-input :prop.sync="regForm.inputs.pw" >
              </form-input>
            

              <form-input :prop.sync="regForm.inputs.pwagain" :vval="regForm.vvalidation_pw_again">
              </form-input>


            <b-button class="fixbtn btn btn-info btn-secondary actionbtn" @click="regForm.submitHandler()">
              Register!
            </b-button>
          </b-tab>
        </b-tabs>
          
         </form>
</template>


<script>
import logger from "../../utils/groupLogger";
import bTabs from "bootstrap-vue/es/components/tabs/tabs";
import bTab from "bootstrap-vue/es/components/tabs/tab";
import SkillsInput from "../utilcomps/SkillsInput.vue";
import FormInput from "../utilcomps/FormInput.vue";

export default {
  components: {
    "b-tabs": bTabs,
    "b-tab": bTab,
    FormInput,
    SkillsInput
  },
  mounted() {},
  computed: {
    pwAgain(){
      return this.regForm.inputs.pw.value    
    },

    errSkills() {
      return this.errors.has(this.regForm.inputs.skills.id);
    },
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
  methods: {},
  destroyed() {},
  data() {
    let vm = this;

    return {
      skillsPresent: 0,
      regForm: {
        submitHandler() {
          axios
            .post("/hackerreg", {
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
        vvalidation_pw_again: {
          rules:{
            required:true
            ,is:this.pwAgain
        }},
        inputs: {
          email: {
            type: "text",
            id: "email",
            pholder: "your email here.",
            label: "e-mail address",
            value: "",
            vvalidation: {
              rules:{
                required:true,email:true
            }},
            validation: {
              required: true
            }
          },
          pw: {
            type: "password",
            pholder: "your password here.",
            id: "password",
            label: "password",
            value: "", 
            vvalidation: {
              rules:{
                required:true
            }},
            validation: {
              required: true
            }
          },
          pwagain: {
            type: "password",
            id: "same password",
            pholder: "repeat password here",
            value: "",
            label: "repeat password",
            
            validation: {
              required: true
            }
          },
          firstname: {
            type: "text",
            id: "firstname",
            pholder: "your firstname here.",
            label: "Name",
            value: "",
            
            vvalidation: {
              rules:{
                required:true
            }},
            
            validation: {
              required: true
            }
          },
          username: {
            type: "text",
            id: "username",
            label: "Username",
            pholder: "your username here.",
            value: "",
            vvalidation: {
              rules:{
                required:true
            }},
            validation: {
              required: true
            }
          },
          skills: [
            {
              type: "text",
              id: "skills",
              label: "Skills",
              pholder: "insert one skill here",
              value: "",
            vvalidation: {
              rules:{
                required:true
            }},
              validation: {
                required: true
              }
            }
          ],
          lastname: {
            type: "text",
            id: "lastname",
            label: "Last Name",
            vvalidation: {
              rules:{
                required:true
            }},
            pholder: "your last name here.",
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
#lander {
  height: 120vh !important;
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
