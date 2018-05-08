<template>
     <form class="fform">

            <!-- username reg form -->
          <b-tabs pills card>

            <b-tab title="Skills">

              <skills-input :skill.sync="regForm.inputs.skills[0]">
              </skills-input>

              <skills-input v-for="num in skillsPresent" :skill.sync="regForm.inputs.skills[num]" :key="num">
              </skills-input>

              <b-button class="btn btn-info actionbtn btn-secondary" @click="addSkillsInput()">
                <icon name="plus"> </icon>
              </b-button>

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
              <form-input :prop.sync="regForm.inputs.email" >
              </form-input>
              
              
              <form-input :prop.sync="regForm.inputs.password" >
              </form-input>
            

              <!-- <form-input :prop.sync="regForm.inputs.pwagain" :compare.sync="regForm.inputs.pw">
              </form-input> moze sa event bus.. 
              da se emituje pw.. -->
              

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
                    required:true,is:regForm.inputs.password.value,
                    }}"
                  :name="regForm.inputs.pwagain.id"/>
                  <span v-if="errors.has(regForm.inputs.pwagain.id)" class="incorrect_input">
                    Not the same password!
                  </span>
                
                </div>


            <b-button class="btn btn-info btn-secondary actionbtn" @click="regForm.submitHandler()">
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
import { SnotifyPosition } from "vue-snotify";
import eventBus from "../../utils/eventBus";

import errorToastr from '../toastr/FormErrorToaster';
import checkFields from '../../utils/checkAllFields';

import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/plus";

export default {
  mixins : [errorToastr,checkFields],
  components: {
    Icon,
    "b-tabs": bTabs,
    "b-tab": bTab,
    FormInput,
    SkillsInput
  },
  mounted() {
     eventBus.$on("field_ok", val => {
      this.regForm.inputs[val.id].ok = val.field_ok;
    });
  },
  computed: {
    fillSkills() {},
    errorPwAgain() {
      return this.errors.has("same password");
    }
  },
  methods: {
    addSkillsInput() {
      this.skillsPresent++;

      this.regForm.inputs.skills.push({
        type: "text",
        id: "skills" + this.skillsPresent,
        label: `your skill number ${this.skillsPresent + 1}`,
        pholder: "insert one skill here",
        value: "",
        validation: {
          required: true
        }
      });
    }
  },
  destroyed() {},

  data() {
    let vm = this;
    console.log(vm);
    
    return {
      skills: [],
      skillsPresent: 0,

      all_fields_ok: false,
      
      regForm: {
        submitHandler() {

        this.checkAllFields();
        
        if (!vm.all_fields_ok) {
          this.errorNotify();
          return;
        }
          vm.regForm.inputs.skills.forEach(skill => {
            vm.skills.push(skill.value);
          });

          let registerInfo = {
            email: vm.regForm.inputs.email.value,
            password: vm.regForm.inputs.password.value,
            sameaspw: vm.regForm.inputs.pwagain.value,
            firstname: vm.regForm.inputs.firstname.value,
            lastname: vm.regForm.inputs.lastname.value,
            username: vm.regForm.inputs.username.value,
            skills: vm.skills
          };

          axios
            .post("/hackerreg", registerInfo)
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
        vvalidation_pw_again: {
          rules: {
            required: true,
            is: this.pwAgain
          }
        },
        inputs: {
          email: {
            ok: false,
            type: "text",
            id: "email",
            pholder: "your email here.",
            label: "e-mail address",
            value: "",
            vvalidation: {
              rules: {
                required: true,
                email: true
              }
            },
            validation: {
              required: true
            }
          },
          password: {
            ok: false,
            type: "password",
            pholder: "your password here.",
            id: "password",
            label: "password",
            value: "",
            vvalidation: {
              rules: {
                required: true
              }
            },

            validation: {
              required: true
            }
          },
          pwagain: {
            ok: false,

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
            ok: false,

            type: "text",
            id: "firstname",
            pholder: "your firstname here.",
            label: "Name",
            value: "",

            vvalidation: {
              rules: {
                required: true
              }
            },

            validation: {
              required: true
            }
          },
          username: {
            ok: false,

            type: "text",
            id: "username",
            label: "Username",
            pholder: "your username here.",
            value: "",
            vvalidation: {
              rules: {
                required: true
              }
            },
            validation: {
              required: true
            }
          },
          skills: [
            {
              ok: false,

              type: "text",
              id: "skills",
              label: "Skills",
              pholder: "insert one skill here",
              value: "",
              vvalidation: {
                rules: {
                  required: true
                }
              },
              validation: {
                required: true
              }
            }
          ],
          lastname: {
            ok: false,

            type: "text",
            id: "lastname",
            label: "Last Name",
            vvalidation: {
              rules: {
                required: true
              }
            },
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
