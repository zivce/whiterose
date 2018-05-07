<template>
  <div id="job_poster" class="comp_container">
    <h2 class="h2s">Post your new job.</h2>


    <div class="group_input_title group_input_title_first">
        
      <h3 class="h3s">
        Select your site.
      </h3>

      <b-form-select  
      
        :class="{'has-error':errSite}"
        v-model="selected_site"
        :options="options" 
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
    
    </div>

    <div class="group_input_title">
      <h3 class="h3s">
        Insert title.
      </h3>

      <job-form-input 
      
      :prop.sync="titleinput" 
      >
      
      </job-form-input>
    </div>

    <div class="group_input_title">

      <h3 class="h3s">
        Insert description.
      </h3>
      
      <textarea  
      :placeholder="descinput.label"
      :class="{'has-error':errDesc}"
      :type="descinput.type"
      :id="descinput.id" 
      v-model="descinput.value" 
      required:true
        v-validate="{
        rules:{
            required:true
        }}"
      :name="descinput.id">
      
      </textarea>


      <span v-if="errors.has(descinput.id)" class="incorrect_input">
          {{descinput.id_upper}} required!
      </span>
    
    </div>

    
    <div class="group_input_title">
      <h3 class="h3s">
        Insert price ($).
      </h3>

      <job-form-input 
      :prop.sync="priceinput"
      >
      </job-form-input>
    </div>

    
    <div class="group_input_title group_input_title_first">
        
      <h3 class="h3s">
        Select your scan. <span>(optional)</span>
      </h3>

      <b-form-select  
        v-model="selected_scan"
        :options="scans"         
        name="selectscan"
        >

        <template slot="first">
          <option :value ="null" 
          disabled>
            Please select your scan
          </option>
        </template>
      
      </b-form-select>
    </div>

    <div class="group_input_title">
      <h3 class="h3s">
        Insert document. <span>(optional)</span>
      </h3>

      <b-form-file accept=".pdf" v-model="scan_pdf" placeholder="Choose file">

      </b-form-file>
    </div>

    

    <b-button class="btn btn-info btn-secondary actionbtn" @click="submitHandler()">
      Submit  <icon name="handshake" id="hands_icon" scale="2"></icon>
    </b-button>
  </div>


</template>

<script>
import eventBus from "../../../utils/eventBus";

import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/handshake";

import welcomeToastr from "../../toastr/welcometoastr";
import JobFormInput from "../../utilcomps/JobPosterInput.vue";
export default {
  created() {
    //TODO: povuci sve verifikovane sajtove...
    //TODO: napuni options
  },
  computed: {
    errDesc() {
      return this.errors.has(this.descinput.id);
    },
    errSite() {
      return this.errors.has("selectsite");
    }
  },
  components: {
    JobFormInput,
    Icon
  },
  mixins: [welcomeToastr],
  mounted() {
    //ako je makar jedan field false
    //pukne ne ulazi u submitovanje forme.

    eventBus.$on("field_ok", val => {
      this.all_fields_ok &= val;
    });
  },
  methods: {
    submitHandler() {
      let vm = this;

      eventBus.$emit("validateAllFields");

      this.$validator.validateAll().then(form_ok => {
        if (form_ok && vm.all_fields_ok) {
          axios
            .post("/postjob", {
              selected_scan: this.selected_scan,
              selected_site: this.selected_site,
              title: this.titleinput.value,
              desc: this.descinput.value,
              price: this.priceinput.value
            })
            .then(function(response) {})
            .catch(function(error) {
              vm.$snotify.error("Error happened", "Error!", {
                position: SnotifyPosition.centerTop,
                backdrop: 0.5
              });
            });
        } else {
          //reset
          vm.all_fields_ok = true;
        }
      });
    }
  },
  data() {
    return {
      all_fields_ok: true,
      validator: this.$validator,
      scan_pdf: null,
      selected_site: "",
      selected_scan: "",
      scans: [
        { value: "scan1", text: "Scan1-Date1" },
        { value: "scan2", text: "Scan2-Date2" },
        { value: "scan3", text: "Scan3-Date3" }
      ],
      options: [
        { value: "www.gooogle.com", text: "Google" },
        { value: "www.facebook.com", text: "Face" },
        { value: "www.gooogle.com", text: "Google" }
      ],
      titleinput: {
        id: "title",
        label: "title",
        type: "text",
        value: ""
      },
      descinput: {
        id: "desc",
        label: "description",
        type: "text",
        value: "",
        id_upper: "Description"
      },
      priceinput: {
        id: "price",
        label: "price",
        type: "number",
        value: ""
      }
    };
  }
};
</script>

<style scoped>
#hands_icon {
  vertical-align: middle;
}
#job_poster {
}
.group_input_title {
  margin-bottom: 6%;
}
.group_input_title_first {
  margin-top: 3%;
}
textarea {
  box-shadow: 0px 0px 2px #949494;
  text-align: center;
  outline: none !important;
  border-bottom: 1px solid rgba(0, 8, 53, 0.603);
  background-color: transparent;
  border: 0px;
  width: 100%;
  min-height: 80px;
}

.has-error {
  border: 1px solid rgba(255, 0, 0, 1);
}
</style>
