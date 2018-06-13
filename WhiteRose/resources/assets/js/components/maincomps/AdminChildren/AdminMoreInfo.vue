<template>
  <div id="jobs_more_info" class="comp_container preview_from_table_container">
      
    <b-button  class="btn btn-danger btn-secondary" id="close_btn" @click="disableMoreInfo()">
      <icon
      name ="window-close">
      </icon>  
    </b-button>

     <transition name="flip" mode="out-in">
      <div v-if="!removed">

        <h2 class="h2s">Job by {{det.user}}</h2>

        <h3 class="h3s">Rating:</h3>
        <p>{{det.user_rating}}</p>

        <h3 class="h3s">Title:</h3>
        <p>{{det.title}}</p>

        <h3 class="h3s">Message:</h3>
        <p>{{det.description}}</p>

        <b-button  class="btn btn-danger btn-secondary" 
          @click="removeJob()">
            Remove
            <icon
            id="ico"
            name ="times">
            </icon>  
        </b-button>

      </div>
     </transition>
    
      <transition name="flip" mode="out-in"> 

        <div v-if="removed">
            <h3 class="h3s">Remove job?</h3>
            <div class="btns">
            
                <b-button class="btn btn-danger btn-secondary" @click="forSureRemoveJob()">Yes</b-button>
                <b-button class="btn btn-success btn-secondary" @click="closeModal()">No</b-button>
            
            </div>    
        </div>
      </transition>

  </div>

</template>

<script>
import eventBus from "../../../utils/eventBus";
import RemoveJobAPI from "../../../services//api/admin_api/RemoveJob.api";

import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/window-close";
import "vue-awesome/icons/check";

export default {
  components: {
    Icon
  },
  mixins: [],
  props: {
    det: {
      type: Object,
      twoWay: true
    }
  },
  computed: {
    errPrice() {
      return this.errors.has(this.priceinput.id);
    },
    errDesc() {
      return this.errors.has(this.descinput.id);
    }
  },
  methods: {
    forSureRemoveJob() {
      //TODO: api call to remove job
      // RemoveJobAPI.removeJob(this.det.id);

      this.notifySuccess("Job removed", "Success");
      this.removed = false;

      let t = window.setTimeout(() => {
        eventBus.$emit("isVisibleMoreInfo", false);
        window.clearTimeout(t);
      }, 1000);
    },
    closeModal() {
      this.removed = false;
    },
    removeJob() {
      this.removed = true;
    },
    sendInfo() {
      let vm = this;
      this.$validator.validateAll().then(form_ok => {
        if (form_ok) {
          axios
            .post("/postbid", {
              id: this.det.id,
              title: this.det.title,
              maximum_price: this.det.maximum_price,
              domain: this.det.domain,
              description: this.det.description,
              user: "hardcode"
              // desc: this.descinput.value,
              // price: this.priceinput.value,
              // det
            })
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              vm.errorToast("An error happened.", "Error!");
            });
        }
      });
    },
    disableMoreInfo() {
      eventBus.$emit("isVisibleMoreInfo", false);
    }
  },
  mounted() {},
  data() {
    return {
      removed: false,
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
.send_info {
  margin-top: 4%;
}
#ico {
  vertical-align: middle;
}
#close_btn {
  float: right;
}

.has-error {
  border: 1px solid rgba(255, 0, 0, 1);
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
</style>
