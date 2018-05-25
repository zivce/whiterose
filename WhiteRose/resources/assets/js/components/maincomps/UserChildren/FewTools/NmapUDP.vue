<template>
    <div >
      
            <h4 class="d-flex justify-content-center">UDP Port Scan with Nmap</h4>

        
        <b-form-select  
        
            :class="{'has-error':errSite}"
            v-model="selected_site"
            :options="sites" 
            v-validate="{
            rules:{
                required:true
            }}"
            name="selectsite"
            >
            <template slot="first">
            <option :value ="null" 
            disabled>
                Please select your site
            </option>
            </template>
        </b-form-select>


        <span v-if="errors.has('selectsite')" class="incorrect_input">
            Site required!
        </span>
        
<!-- 
        <div class="input-group input-url" id="inputElem">
            <p class="left_col">Target : </p>
            <input type="text" value="url" placeholder="Hostname,IP or IP range" ref="url" required v-model="url" id="url"
            name="ip" 
            :class="{'has-error':errIp}"
            v-validate="{
            required:true,
            regex:/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))?$|(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/}" 
            >

            
            <span v-if="errors.has('ip')" class="incorrect_input fix_error">
                Invalid ip or url!
            </span>
        </div>
f -->
        <div  id="portsScan" class="comp_container">

            <div>
                <b-nav class="row">
                    <b-nav-item class="col-md-4" @click="commonActive()">
                        Common
                    </b-nav-item>
                    
                    <b-nav-item class="col-md-4" @click="rangeActive()">
                        Range
                    </b-nav-item>
                    
                    <b-nav-item class="col-md-4" @click="listActive()">
                        List
                    </b-nav-item>
                
                </b-nav>

                <div id="optionsContainer">
                    
                    <nmap-common v-if="is_common_active">

                    </nmap-common>

                    <nmap-list v-if="is_list_active"
                    :min = "rangeMin"
                    :max = "rangeMax">

                    </nmap-list>
                
                    <nmap-range 
                    v-model="arrOfPorts"
                    :portOk = "isPortListOk"
                    v-if="is_range_active">
                    
                    </nmap-range>

                </div>

            </div>
        </div>
        

        <!-- OnOff Buttons -->


        <div id="scanOptions">
              <p class="left_col">Scan Options :</p>

            <!-- <p>Detect service version</p> -->

            <div class="btnContainer">
                <b-form-checkbox v-model="detectServiceVersion" ref="allowed">Detect service version</b-form-checkbox>
            </div>



            <div class="btnContainer">
                <b-form-checkbox v-model="detectOperatingSystem" ref="allowed">Detect operating system</b-form-checkbox>
            </div>

            
            
            <!-- <p>Don't ping host (-Pn)</p> -->


            <div class="btnContainer">
                <b-form-checkbox v-model="dontPingHost" ref="allowed">Don't ping host (-Pn)</b-form-checkbox>
            </div>

            
        </div>

        <span 
        class="d-flex justify-content-center" 
        style="margin-top: 7%;"
        >One scan will cost you &nbsp;
          <strong> {{COST_OF_SUBMISSION}} </strong> 
          &nbsp;
          <icon 
          style="vertical-align:middle;" 
          width="20" 
          height="20" 
          name="bandcamp"></icon>

        </span>


        <b-button 
        
        class="btn-primary actionbtn" @click="getData()">
            Start Scan!
        </b-button>

        
        <textarea v-if="isVisible " readonly name="" id="backLog" cols="100"    
        style="margin-top: 36px;margin-bottom: 0px;height: 118px;width: 100%;" 
        :rows="lines" 
        v-model="currentLog">
           
        </textarea>
       

    </div>
</template>

<script>
import bFormCheckboxGroup from "bootstrap-vue/es/components/form-checkbox/form-checkbox-group";
import eventBus from "../../../../utils/eventBus";


//IMPORT TABS
import NmapCommon from "./NmapUDPTabs/NmapCommon.vue";
import NmapRange from "./NmapUDPTabs/NmapRange.vue";
import NmapList from "./NmapUDPTabs/NmapList.vue";
import Icon from "vue-awesome/components/Icon";
export default {
  components: {
    Icon,
    bFormCheckboxGroup,
    NmapCommon,
    NmapRange,
    NmapList
  },
  
  created() {
    //TODO: do ajax call here to get verified sites
  },
  mounted() {
    //listeneri za komponente

    let sites = this.$store.state.sites
      .filter(site => {
        if(site)
          return site.verified
      })
      .map(site => {
        if(site)
        {
          return {
            value: site.domain,
            text: site.domain
          };
        }
          
      });

    this.sites = sites;

    eventBus.$on("portOk", value => {
      this.isPortListOk = value;
    });

    eventBus.$on("minPort", value => {
      this.rangeMin = value;
    });

    eventBus.$on("maxPort", value => {
      this.rangeMax = value;
    });
  },
  computed: {
   
    errIp() {
      return this.errors.has("ip");
    },
    errSite() {
      return this.errors.has("selectsite");
    }
  },
  data() {
    return {
      COST_OF_SUBMISSION : 5,


      //sites heres
      selected_site: null,
      sites: null,

      //data for what is active
      is_range_active: true,
      is_common_active: false,
      is_list_active: false,

      //data from checkboxes
      detectServiceVersion: true,
      detectOperatingSystem: true,
      doTraceroute: true,
      dontPingHost: true,
      isAllowedToScanURL: true,
      //data from inputs

      stdPorts: true,
      rangePorts: null,
      listPorts: null,

      //util variables
      rangeMin: 0,
      rangeMax: 1,
      arrOfPorts: "443,80",
      isCommonChecked: true,
      isRangeChecked: false,
      isListChecked: false,
      isPortListOk: true,

      cmd: "",

      //other data

      isVisible: false,
      isVisLoader: false,
      url: "",
      currentLog: "",
      lines: null,
      urlGood: true
    };
  },
  methods: {
    commonActive() {
      this.is_common_active = true;
      this.isCommonChecked = true;

      this.is_range_active = false;
      this.is_list_active = false;
    },
    rangeActive() {
      this.is_range_active = true;
      this.isRangeChecked = true;

      this.is_common_active = false;
      this.is_list_active = false;
    },
    listActive() {
      this.is_list_active = true;
      this.isListChecked = true;

      this.is_range_active = false;
      this.is_common_active = false;
    },

    buildCmd() {
      let resultCmd = "nmap -sU ";

      //ranges common list...

      if (this.isCommonChecked) resultCmd += "-F --top-ports 100";

      if (this.isRangeChecked)
        resultCmd += ` -p${this.rangeMin}-${this.rangeMax}`;

      if (this.isListChecked) {
        resultCmd += ` -p${this.arrOfPorts}`;
      }

      //checkbox vals

      if (this.detectServiceVersion) resultCmd += " -sV";

      if (this.detectOperatingSystem) resultCmd += " -O";

      if (this.doTraceroute) resultCmd += " --traceroute";

      if (this.dontPingHost) resultCmd += " -Pn";

      resultCmd += ` ${this.url}`;

      return resultCmd;
    },
    getCmd() {
      return this.buildCmd();
    },
    getData() {
      this.$validator.validateAll().then(result => {
        if (result && this.isAllowedToScanURL) {
          //this.selectedTab();

          if (!this.isPortListOk) return;

          this.cmd = this.buildCmd();

          this.error = "";
          this.isVisLoader = true;
          const vm = this;

          //hide for new scan..
          vm.isVisible = false;

          this.$store.commit("decrementTokens",
          {tokens:this.COST_OF_SUBMISSION,vm:this})
          
          axios
            .post("/scanning", {
              url: this.selected_site,
              cmd: this.cmd,
              scan: "UDP Nmap"
            })
            .then(function(response) {
              vm.lines = response.data.split(/\r\n|\r|\n/).length;

              vm.currentLog = response.data;
              vm.isVisible = true;
              vm.isVisLoader = false;
            })
            .catch(function(error) {});
        } else {
          this.isVisLoader = false;
        }
      });
    }
  }
};
</script>

<style scoped>
#optionsContainer {
  height: fit-content;
  width: fit-content;
  margin: 20px auto;
}
#scanOptions {
  text-align: center;
  margin: 0 auto;
}

.fix_error {
  position: absolute;
  bottom: 0;
  left: 30%;
  top: 130%;
}
.fix_error_mod {
  margin: 0 auto;
  width: fit-content;
}

.has-error {
  box-shadow: 0 0 5px rgb(255, 0, 0);
  border: 1px solid rgba(255, 0, 0, 1);
}

#firstPart input {
  width: 60px;
}
#secondPart input {
  width: 60px;
}
#allowed {
  width: fit-content;
  margin: 0 auto;
}

#portsScan {
  margin-bottom: 5%;
  margin: 20px auto;
}

#contList {
  margin: auto;
  display: flex;
  flex-direction: column;
}

#contList input {
  width: 50%;
  margin: 0 auto;
}

#contList p {
  padding-right: 1rem;
}

#firstPart {
  flex: 0.8;
}

#firstPart p {
  margin-bottom: 0px;
  text-align: left;
}
#secondPart p {
  text-align: left;
  margin-bottom: 0px;
}

.left_col {
  font-size: 15px;
  font-weight: 500;
  padding-right: 0.5rem;
  margin: auto;
}
#inputElem {
  display: flex;
  line-height: 0.8;
}
#inputElem p {
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  padding-right: 0.5rem;
  margin: auto;
}

.btnGrp {
  height: 20px;
  width: 14rem;
  margin: auto;
  margin-bottom: 20px;
}

#header {
  margin: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
.input-group {
  width: fit-content;
  margin: 20px auto;
}
</style>
