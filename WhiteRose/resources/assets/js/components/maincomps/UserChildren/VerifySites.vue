<template>
 <div class="d-flex col-5 comp_container" >

            <div class="dashboard_setup_container">
                
                    <h3 class="h3s">
                        Verify site
                    </h3>


                <div class="fform_input_job">
        
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
                class="col-12"
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

                <div style="display:flex;">

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
export default {
    data() {
        return {
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

</style>
