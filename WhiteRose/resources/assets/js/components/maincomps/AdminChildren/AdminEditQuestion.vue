<template>
  <div id="jobs_more_info" class="comp_container preview_from_table_container">
      
    <b-button  class="btn btn-danger btn-secondary" id="close_btn" @click="disableMoreInfo()">
      <icon
      name ="window-close">
      </icon>  
    </b-button>

     <transition name="flip" mode="out-in">
      <div v-if="!edited">

        <h2 class="h2s">Question: {{det.id}}</h2>

        
        <div class="d-flex flex-column">
                <textarea  
                type="text" 
                v-model="det.question" 
                required="true"
                />
        </div>

        <div class="d-flex flex-column">
        <span>Answer 1:</span>
            <input  
            type="text" 
            v-model="det.answ1" 
            required="true"
            />
        </div>

        <div class="d-flex flex-column">
        <span>Answer 2:</span>
        <input  
        type="text" 
        v-model="det.answ2" 
        required="true"
        />
        </div>

        <div class="d-flex flex-column">
        <span>Answer 3:</span>
        <input  
        type="text" 
        v-model="det.answ3" 
        required="true"
        />
        </div>

        <div class="d-flex flex-column">
        <span>Answer 4:</span>
        <input  
        type="text" 
        v-model="det.answ4" 
        required="true"
        />
        </div>

        <div class="d-flex flex-column">
        <span>Number of correct answer:</span>
        <input  
        type="text" 
        v-model="det.corransw" 
        required="true"
        />
        </div>


        <b-button  class="btn btn-danger btn-secondary" 
          @click="editQuestion()">
            Edit
            <icon
            id="ico"
            name ="times">
            </icon>  
        </b-button>

      </div>
     </transition>
    
      <transition name="flip" mode="out-in"> 

        <div v-if="edited">
            <h3 class="h3s">Edit job?</h3>
            <div class="btns">
            
                <b-button class="btn btn-danger btn-secondary" @click="forSureEditQuestion()">Yes</b-button>
                <b-button class="btn btn-success btn-secondary" @click="closeModal()">No</b-button>
            
            </div>    
        </div>
      </transition>

  </div>

</template>

<script>
import eventBus from "../../../utils/eventBus";
import EditQuestionAPI from "../../../services//api/admin_api/EditQuestionAPI.api";

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
    forSureEditQuestion() {
      //TODO: api call to remove job
      EditQuestionAPI.editQuestion(this.det);

      this.notifySuccess("Question edited", "Success");
      this.edited = false;

      let t = window.setTimeout(() => {
        eventBus.$emit("isVisibleMoreInfo", false);
        window.clearTimeout(t);
      }, 1000);
    },
    closeModal() {
      this.edited = false;
    },
    editQuestion() {
      this.edited = true;
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
      edited: false,
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
