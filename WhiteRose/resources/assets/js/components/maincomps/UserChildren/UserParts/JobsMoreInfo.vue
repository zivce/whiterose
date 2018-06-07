<template>
  <div id="jobs_more_info" class="comp_container">
      
    <b-button  class="btn btn-danger btn-secondary" id="close_btn" @click="disableMoreInfo()">
      <icon
      name ="window-close">
      </icon>  
    </b-button>
    
    
    <h2 v-if="!delclicked" style="margin-top:16%;" class="h2s">Description:</h2>
    <p v-if="!delclicked">{{det.description}}</p>
    
    <h3 v-if="delclicked" class="h3s" style="margin-top:16%;"> Are you sure you want to delete job 
      <strong>{{det.title}}</strong>?</h3>

    <b-button @click="deleteJob()" v-if="delclicked" class="btn btn-danger btn-secondary">
      Delete
    </b-button>
  </div>

</template>

<script>
import logger from "../../../../utils/groupLogger";
import welcomeToastr from "../../../toastr/welcometoastr";
import eventBus from "../../../../utils/eventBus";

import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/window-close";
import "vue-awesome/icons/check";

import DeleteJobAPI from "../../../../services/api/user_api/deleteJob.api";

export default {
  components: {
    Icon
  },
  mixins: [welcomeToastr],
  props: {
    det: {
      type: Object,
      twoWay: true
    },
    delclicked: {
      type: Boolean
    }
  },
  computed: {},
  methods: {
    deleteJob() {
      this.notifySuccess("Job deleted.", "Success!");
      eventBus.$emit("isVisibleMoreInfo", false);
      //TODO: implementacija
      // DeleteJobAPI.deleteJobWithId(id);
    },
    disableMoreInfo() {
      eventBus.$emit("isVisibleMoreInfo", false);
    }
  },
  mounted() {},
  data() {
    return {};
  }
};
</script>

<style scoped>
#ico {
  vertical-align: middle;
}
#close_btn {
  float: right;
}
#close_btn >>> svg {
  vertical-align: middle;
}
#pentester_bid {
}
</style>
