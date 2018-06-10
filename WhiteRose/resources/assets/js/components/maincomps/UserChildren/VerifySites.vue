<template>
 <div class="comp_container" >

            <div class="dashboard_setup_container">
                
                    <h2 class="h2s">
                        Verify site
                    </h2>


                <div 
                style="margin: auto;"
                class="fform_input_job col-6">
        
                    <input  
                    v-if="isInputSitePart"
                    :placeholder="site_for_verification.label"
                    :class="{'has-error':errSiteVerif}"
                    :type="site_for_verification.type" 
                    :id="site_for_verification.id" 
                    v-model="site_for_verification.value" 
                    required="true"
                    v-validate="{required:true,is:site_for_verification.value}"
                    :name="site_for_verification.id"/>
                    
                    <span v-if="errors.has(site_for_verification.id)" class="incorrect_input_">
                        Site required!
                    </span>
                    
                </div>
             

                <!-- SECOND PART -->
                
                <v-client-table
                class="col-12 table_sites"
                ref="sites"
                v-if="isKeyVerifPart"
                :data='client_sites'
                :columns='columns_sites'
                :options='options_sites'
                >
              
              <a  slot="confirmed" 
                  slot-scope="props"
                  class="cursorable"
              >
                  <icon v-if="props.row.confirmed" class="check_ico" name="check"></icon>
                  <icon v-if="!props.row.confirmed" class="times_ico" name="times"></icon>
               
              </a>
                  <a  
                  v-if="!props.row.confirmed"
                  slot="verify" 
                  slot-scope="props"
                  class="cursorable"
                  :href="makeGetKeyUrl(props.row.domain)"
                  @click="redirectToVerifySite(props.row.domain)"
                  >key</a>



                  <!-- @click="getKey(props)" -->
                </v-client-table >
                
                <p 
                v-if="isVerifySitePart"
                style="text-align:center">
                  Insert the downloaded file
                  to your <code>public</code>
                  directory and then click verify.                  
                </p>

                <!-- THIRD PART -->



                <!-- BUTTONS SECTION -->

                <div 
                style="
                display:flex;
                margin: auto;"
                
                class="col-6 ">

                  <b-button 
                    v-if="isInputSitePart"
                  class="btn btn-info btn-secondary actionbtn" 
                  @click="newSiteHandler()">
                  
                      Next step > 
                  
                  </b-button>

                  <b-button 
                    v-if="isInputSitePart"
                  class="btn btn-info btn-secondary actionbtn" 
                  @click="viewSites()">
                  
                    View sites
                  
                  </b-button>
                
                </div>
                
                 <!-- <b-button 
                  v-if="isKeyVerifPart"
                 class="btn btn-info btn-secondary actionbtn" 
                 @click="keyDownloaded()">
                 
                    Next step > 
                
                </b-button> -->
                 <b-button 
                  v-if="isKeyVerifPart"
                 class="btn btn-info btn-secondary actionbtn" 
                 @click="getBackToFirstScreen()">
                 
                    Back 
                
                </b-button>
               
                <div style="display:flex;flex-direction:row;wrap:row;">
                  <b-button 
                    v-if="isVerifySitePart"
                  class="btn btn-info btn-secondary actionbtn" 
                  @click="getBackToSecondScreen()">
                  
                      Back 
                  
                  </b-button>


                  <b-button 
                    v-if="isVerifySitePart"
                  class="btn btn-info btn-secondary actionbtn" 
                  @click="verifySiteHandler()">
                  
                      Verify 
                  
                  </b-button>
                </div>
               

          
          
          </div>
    </div>
    </template>
<script>
import VerifySiteApi from "../../../services/api/user_api/verifySite.api";
import { mapGetters } from "vuex";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/file";
import "vue-awesome/icons/times";

export default {
    components: {
        Icon
    },
    computed: {

        ...mapGetters({ client_sites: "returnSites" }),
        errSiteVerif() {
            return this.errors.has(this.site_for_verification.id);
        }
    },
    methods : {
        makeGetKeyUrl(site) {
            return `getkey/${site}`;
        },
        getKey(props) {
        VerifySiteApi.getKey(props.row.domain, this).then(() => {
            this.verifySite();
        });
        },

        //HANDLERS FORMS
        newSiteHandler() {
            if (this.site_for_verification.value.length !== 0) {
                VerifySiteApi.addNewSite(this, this.site_for_verification.value).then(
                resolved => {
                    //site already exists
                    if (!resolved) return;

                    this.isInputSitePart = false;
                    this.isKeyVerifPart = true;
                    this.isVerifySitePart = false;
                }
                );
            } else {
                this.errorToast("Please insert site", "Error!");
            }
        },
        redirectToVerifySite(site) {
            this.for_verify_site = site;

            this.isInputSitePart = false;
            this.isKeyVerifPart = false;
            this.isVerifySitePart = true;
        },

        viewSites() {
            this.isInputSitePart = false;
            this.isKeyVerifPart = true;
            this.isVerifySitePart = false;
        },
        getBackToFirstScreen() {
            this.isInputSitePart = true;
            this.isKeyVerifPart = false;
            this.isVerifySitePart = false;
        },
        getBackToSecondScreen() {
            this.isInputSitePart = false;
            this.isKeyVerifPart = true;
            this.isVerifySitePart = false;
        },
        
    verifySiteHandler() {
      let vm = this;
      let valid = this.$validator;
      let send = { site: this.for_verify_site };

      VerifySiteApi.verifySite(valid, vm, send);
    },
    },
    data() {
        return {
             //Site verification
            columns_sites: ["domain", "confirmed", "verify"],
            options_sites: {
                columnsClasses: {
                confirmed: "cursorable",
                domain: "cursorable"
                },
                filterable: ["domain"],
                filterByColumn: true,
                pagination: {
                dropdown: true,
                nav: "scroll"
                }
            },


            //Visibility variables
            isInputSitePart: true,
            isKeyVerifPart: false,
            isVerifySitePart: false,

            site_for_verification: {
                id: "site",
                label: "Site for verification",
                type: "text",
                value: "",
                id_upper: "Site"
            }, 

        }

    }
}
</script>

<style scoped>
.table_sites >>> td {
    text-align: center;
}

.check_ico {
  color: rgba(0, 128, 0, 0.726);
}
.times_ico {
  color: rgb(173, 6, 6);
}
.has-error {
  border: 1px solid rgba(255, 0, 0, 1);
}
.incorrect_input_ {
  width: 100%;
  color: red;
  font-size: 10px;
  font-weight: 700;
}
</style>
