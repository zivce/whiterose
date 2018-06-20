<template>
  <div class="comp_container">
    
    <h2 class="h2s">Preview all questions.</h2>

    <transition name="flip" mode="out-in">
      
      <v-client-table
      v-if="!isVisibleBid"
      :data='all_questions'
      :columns='columns'
      :options='options'
      >
    
    <a  slot="preview" 
        slot-scope="props"
        class="cursorable"
        @click="showDetails(props)"
        >
        <icon id="eye_ico" name="edit"></icon>
      </a>

      
      </v-client-table >
    
    </transition>
    <transition name="flip" mode="out-in">
    
      <edit-info
      :det.sync="details"
      v-if="isVisibleBid">

      </edit-info>

    </transition>

  </div>

</template>

<script>
import Icon from "vue-awesome/components/Icon";
import eventBus from "../../../utils/eventBus";
import AllQuestionsAPI from '../../../services/api/admin_api/AllQuestions.api';
// import AllJobsAPI from '../../../services/api/pentester_api/AllJobs.api';
import MoreInfo from "./AdminMoreInfo.vue";
import EditInfo from "./AdminEditQuestion.vue";
import "vue-awesome/icons/eye";

export default {
  components: {
    EditInfo,
    Icon
  },
  mixins: [],
  created() {
    //TODO: napuni alljobs
    //TODO: izbrisi hardcode dodelu

    let vm = this;
    const questions = AllQuestionsAPI.getAllQuestions();

    questions.then(questions => vm.all_questions = questions);
  },
  computed: {},
  mounted() {
    eventBus.$on("isVisibleMoreInfo", val => {
      this.isVisibleBid = val;
    });


  },
  methods: {
    showDetails(props) {
      this.details = props.row;
      this.isVisibleBid = true;
    }
  },
  data() {
    return {
      details: {},
      isVisibleBid: false,
      columns: ["question","preview"],
      all_questions: [],
      options: {
        
        filterByColumn: true,
        filterable: ["question"],
        sortable: ["question"],
        pagination: {
          dropdown: true,
          nav: "scroll"
        }
      },
      questions: []
    };
  }
};
</script>

<style scoped>
* >>> .VueTables__limit-field
{
  display:flex;
}

* >>> .VueTables__limit-field > label
{
  margin-right: 10%;
}

* >>> .VueTables__dropdown-pagination > label
{
  margin-right: 2%;
}


* >>> .VueTables__dropdown-pagination
{
  display:flex;
  flex-direction: row;
}
#eye_ico {
  color: var(--cyan);
  vertical-align: middle;
}

#eye_ico:hover {
  color: #000619d4;
  vertical-align: middle;
}
</style>
