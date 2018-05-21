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
      
      <textarea  class="textarea_everyone"
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

      <b-form-file 
      accept=".pdf"
      @change="processFile($event)"
      name="file"
      placeholder="Choose file">

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


//Services part 
import PostJobAPI from '../../../services/api/user_api/PostJob.api';


export default {
  created() {
    //TODO: povuci sve verifikovane sajtove...


    // PostJobAPI.getAllUserScans().then(
    //   (response) => {
    //     this.scans = response.data;
    //   }
    // )

   
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
    
    //get only verified sites.

    let sites = this.$store.state.sites
    .filter(site=> site.verified)
    .map ( site => {
      return {
        value : site.domain,
        text : site.domain
      }
    })

    this.options = sites;

    eventBus.$on("field_ok", val => {
      this.all_fields_ok &= val;
    });
  },
  methods: {
    processFile(event)
    {
      this.formData.append("file", event.target.files[0]);
    },
    submitHandler() {
      let vm = this;
      eventBus.$emit("validateAllFields");
      this.$validator.validateAll().then(form_ok => {
        if (form_ok && vm.all_fields_ok) {
         
        //  //api call to send document
        //  PostJobAPI
        //  .postDoc(this.formData)
        //  .then(res => {
        //    console.log(res);
        //  });

        
          this.formData.append("selected_scan",this.selected_scan);
          this.formData.append("selected_site",this.selected_site);

          this.formData.append("title",this.titleinput.value);
          this.formData.append("desc", this.descinput.value);
          this.formData.append("price",this.priceinput.value);
          
          //api call to send form data
          PostJobAPI
            .postForm(this.formData)
            .then(res=>{
              console.log(res);
            })
          
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

      //TODO: Povuci iz baze verified scans
      formData : new FormData(),
      scans: [
        { value: "scan1", text: "Scan1-Date1" },
        { value: "scan2", text: "Scan2-Date2" },
        { value: "scan3", text: "Scan3-Date3" }
      ],
      //TODO: Napuni ovaj niz..
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

.has-error {
  border: 1px solid rgba(255, 0, 0, 1);
}
</style>
