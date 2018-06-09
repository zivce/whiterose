<template>
  <div id="job_poster" class="comp_container">
    
    
    <h2 
    v-if="itIsEditJobForm"
    ref="post_job_header"
    class="h2s">Edit your job.</h2>
    
    <h2 
    v-else
    ref="post_job_header"
    class="h2s">Post your new job.</h2>
    

    <div class="group_input_title group_input_title_first">
        
      <h3 class="h3s">
        Select your site.
      </h3>

      <b-form-select  
        ref="verified_sites"
        :class="{'has-error':errSite}"
        v-model="selected_site"
        :options="verified_sites_only" 
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
        Insert amount of tokens for this job.
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

    <span
    v-if="itIsEditJobForm">
    Editing will cost 
      <strong>0</strong> 
      <icon 
      style="vertical-align:middle;" 
      width="20" 
      height="20" 
      name="bandcamp"></icon>
    
    </span>
    
    <span
    v-else
    >This submission will cost 
      <strong> {{ COST_OF_SUBMISSION + new Number(priceinput.value) }}  </strong> 
      <icon 
      style="vertical-align:middle;" 
      width="20" 
      height="20" 
      name="bandcamp"></icon>
    
    </span>

    <b-button 
    v-if="itIsEditJobForm"
    ref ="submit_btn"
    class="btn_submit btn btn-info btn-secondary actionbtn" @click="editJob()">
      Edit  <icon id="edit_icon" name="edit"></icon>
    </b-button>

    <b-button 
    v-else
    ref ="submit_btn"
    class="btn_submit btn btn-info btn-secondary actionbtn" @click="submitHandler()">
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
import PostJobAPI from "../../../services/api/user_api/PostJob.api";
import { mapGetters } from 'vuex';

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
    ...mapGetters({verified_sites_only: "returnMappedVerifiedSites" }),
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
    /**
     * Get job for edit if such
     *
     */
    let job_for_edit = this.$store.state.job_for_edit;

    if (job_for_edit) {
      this.itIsEditJobForm = true;


      this.titleinput.value = job_for_edit.title;
      this.priceinput.value = job_for_edit.startingPrice;
      this.descinput.value = job_for_edit.description;

      this.$store.commit("setJobForEdit", null);
    }


    eventBus.$on("field_ok", val => {
      this.all_fields_ok &= val;
    });
  },
  methods: {
    processFile(event) {
      this.formData.append("file", event.target.files[0]);
    },
    editJob() {
      let vm = this;
      eventBus.$emit("validateAllFields");
      this.$validator.validateAll().then(form_ok => {
          if (form_ok && vm.all_fields_ok) {

            this.formData.append("selected_scan", this.selected_scan);
            this.formData.append("selected_site", this.selected_site);

            this.formData.append("title", this.titleinput.value);
            this.formData.append("desc", this.descinput.value);
            this.formData.append("price", this.priceinput.value);

            //api call to send form data
            PostJobAPI.editJob(this.formData,vm)
            .then(res => {
              console.log(res);
            });
        } else {
          //reset
          vm.all_fields_ok = true;
        }
      });
    },
    submitHandler() {
      let vm = this;
      eventBus.$emit("validateAllFields");
      this.$validator.validateAll().then(form_ok => {
        if (form_ok && vm.all_fields_ok) {
         
          let whole_cost_of_transaction =
            Number(this.COST_OF_SUBMISSION) + Number(this.priceinput.value);

          this.$store.commit("decrementTokens", {
            tokens: whole_cost_of_transaction,
            vm: this
          });

          this.formData.append("selected_scan", this.selected_scan);
          this.formData.append("selected_site", this.selected_site);

          this.formData.append("title", this.titleinput.value);
          this.formData.append("desc", this.descinput.value);
          this.formData.append("price", this.priceinput.value);

          //api call to send form data
          PostJobAPI.postForm(this.formData,vm).then(res => {
            console.log(res);
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
      //consts
      COST_OF_SUBMISSION: 5,


      //visibility part 
      itIsEditJobForm : false,

      all_fields_ok: true,
      validator: this.$validator,
      scan_pdf: null,
      selected_site: "",
      selected_scan: "",

      //TODO: Povuci iz baze verified scans
      formData: new FormData(),
      scans: [
        { value: "scan1", text: "Scan1-Date1" },
        { value: "scan2", text: "Scan2-Date2" },
        { value: "scan3", text: "Scan3-Date3" }
      ],
      titleinput: {
        id: "title",
        label: "title",
        type: "text",
        maxlen_input : 100,
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
        value: "",
        maxlen_input : 5,
        disableEsAndMinus : true,
      }
    };
  }
};
</script>

<style scoped>
#hands_icon {
  vertical-align: middle;
}

#edit_icon {
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
