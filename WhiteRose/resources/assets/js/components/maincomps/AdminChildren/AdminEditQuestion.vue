<template>
  <div id="jobs_more_info" class="comp_container preview_from_table_container">
      
    <b-button  class="btn btn-danger btn-secondary" id="close_btn" @click="disableMoreInfo()">
      <icon
      name ="window-close">
      </icon>  
    </b-button>

     <transition name="flip" mode="out-in">
      <div v-if="!edited" id="edit_question_form">

        <h2 class="h2s">Question: {{det.id}}</h2>

        
        <div class="d-flex flex-column editable_question">
                <textarea  
                type="text" 
                v-model="det.question" 
                required="true"
                />
        </div>

        <div 
        v-for ="(answ,index) in det.answers"
        :key ="answ"
        class="d-flex flex-column editable_question">

        <span>Answer {{index + 1 }} :</span>
            <input  
            type="text"
            @change="changeAnsw($event,index)"  
            :value="answ"
            required="true"
            />

        </div>
<!-- 
        <div class="d-flex flex-column editable_question">
        <span>Answer 1:</span>
            <input  
            type="text" 
            v-model="det.answ1" 
            required="true"
            />
        </div>

        <div class="d-flex flex-column editable_question">
        <span>Answer 2:</span>
        <input  
        type="text" 
        v-model="det.answ2" 
        required="true"
        />
        </div>

        <div class="d-flex flex-column editable_question">
        <span>Answer 3:</span>
        <input  
        type="text" 
        v-model="det.answ3" 
        required="true"
        />
        </div>

        <div class="d-flex flex-column editable_question">
        <span>Answer 4:</span>
        <input  
        type="text" 
        v-model="det.answ4" 
        required="true"
        />
        </div>
  -->

      <div class="d-flex flex-column editable_question">
      
        <span>Select correct answer</span>
        <b-form-select  
          id="select_quest"
          v-model="correct_answer"
          :options="arr_of_answers" 
          v-validate="{
          rules:{
              required:true
          }}"
          name="selectsite"
          >
          <template slot="first">
            <option :value ="null" 
            disabled>
              Please select correct answer
            </option>
          </template>
        </b-form-select>
      
      </div>
        <b-button  class="btn btn-success actionbtn"  
          @click="editQuestion()">
            Edit
            
            <icon
            id="ico"
            name ="edit">
            </icon> 

        </b-button>

      </div>
     </transition>
    
      <transition name="flip" mode="out-in"> 

        <div v-if="edited">
            <h3 class="h3s">Edit question?</h3>
            <div class="btns">
            
                <b-button class="btn btn-danger removebtn" @click="forSureEditQuestion()">Yes</b-button>
                <b-button class="btn btn-success actionbtn" @click="closeModal()">No</b-button>
            
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
    arrOfAnswers () {
      this.det.answers.map((answ, index) => {
        return {
          'text' : answ,
          'value' : index + 1
        }
      })
    },

    errPrice() {
      return this.errors.has(this.priceinput.id);
    },
    errDesc() {
      return this.errors.has(this.descinput.id);
    }
  },
  methods: {
    changeAnsw(event, indexx)
    {
      const ans = `answ${indexx + 1}`;

      const changed_value_input = event.target.value;

      this.det.answers[indexx] = changed_value_input;
      this.det[ans] = changed_value_input;

    },
    forSureEditQuestion() {
      const for_send = {...this.det, 'corransw' : this.correct_answer}

      EditQuestionAPI.editQuestion(for_send);

      this.notifySuccess("Question edited", "Success");
      this.edited = false;

      let t = window.setTimeout(() => {
        eventBus.$emit("isVisibleMoreInfo", false);

        window.clearTimeout(t);
        window.location.reload();
      }, 1000);
    },
    closeModal() {
      this.edited = false;
    },
    editQuestion() {
      this.edited = true;
    },
    disableMoreInfo() {
      eventBus.$emit("isVisibleMoreInfo", false);
    }
  },
  mounted() { 
       this.arr_of_answers = this.det.answers.map((answ, index) => {
          return {
            'text' : `Answer ${index + 1}`,
            'value' : index + 1
          }
        })
   

  },
  destroyed () {
  },
  data() {
    return {
      correct_answer : undefined,
      arr_of_answers : [],
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
#select_quest
{
  margin-bottom : 5%;
}

.editable_question {

  margin-top: 5%;
  margin-bottom: 5%;
}

#edit_question_form > *
{
  padding:2%;

}
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
