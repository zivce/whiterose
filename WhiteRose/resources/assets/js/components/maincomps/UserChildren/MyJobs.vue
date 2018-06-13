<template>
  <div class="comp_container_jobs" ref="my_jobs">
    
    <!-- My Jobs -->
    <div class="col-12">
      
      <h2 class="h2s">Preview all your jobs.</h2>
      <transition name="flip" mode="out-in">
      
        <v-client-table
        ref="my_jobs_table"
        v-if="!isVisibleBid"
        :data='jobs'
        :columns='columns'
        :options='options'
        >
      
      <a  slot="preview" 
          slot-scope="props"
          class="cursorable centered"
          @click="showDetails(props,false)"
          >
          <icon class="eye_ico" name="eye"></icon>
        </a>

      <a  slot="delete" 
          slot-scope="props"
          class="cursorable centered"
          @click="showDetails(props,true)"
          
          >
          <icon class="eye_ico" name="times"></icon>
        </a>

      <a  slot="edit" 
          ref="edit_the_job"
          slot-scope="props"
          class="cursorable centered edit_job"
          @click="editJob(props)"
          >
          <icon class="eye_ico" name="edit"></icon>
        </a>
        
        
        </v-client-table >
      
      </transition>


      <transition name="flip" mode="out-in">
      
        <more-info
        :delclicked= "delete_this"
        :det.sync="details"
        v-if="isVisibleBid">

        </more-info>

      </transition>
    
    </div>



  </div>

</template>

<script>
import Icon from "vue-awesome/components/Icon";



//TODO: hardcode pentest izbaci

//import hardcodemyjobs from "./hardcodemyjobs";
import MoreInfo from "./UserParts/JobsMoreInfo.vue";
import eventBus from "../../../utils/eventBus";
import "vue-awesome/icons/eye";
import { mapGetters } from "vuex";

import "vue-awesome/icons/edit";

// import StartedJobs from "../UserChildren/StartedJobs.vue";
// import FinishedJobs from "../UserChildren/FinishedJobs.vue";

export default {
  components: {
    // StartedJobs,
    // FinishedJobs,
    MoreInfo,
    Icon
  },
  mixins: [],
  created() {
    //TODO: napuni my_jobs
    //TODO: izbrisi hardcode dodelu
  },
  computed: {
    ...mapGetters({ jobs: "returnJobs" })
  },
  mounted() {
    eventBus.$on("isVisibleMoreInfo", val => {
      this.isVisibleBid = val;
    });
    // this.jobs = this.$store.getters.returnJobs;
  },
  methods: {
    editJob(props) {
      // console.log(props);
      let job_edit_id = props.index;

      let job_for_edit = {
        ...props.row,
        job_edit_id
      };

      this.$store.commit("setJobForEdit", job_for_edit);
      this.$router.push({ name: "postj" });
    },
    showDetails(props, del) {
      this.delete_this = del;
      this.details = props.row;
      this.isVisibleBid = true;
    }
  },
  data() {
    return {
      delete_this: false,
      details: {},
      isVisibleBid: false,
      columns: ["title", "startingPrice", "preview", "delete", "edit"],
      //my_jobs: hardcodemyjobs,
      options: {
        columnsClasses: {
          startingPrice: "cursorable",
          title: "cursorable",
          preview: "centered",
          delete: "centered",
          edit: "centered"
        },
        filterByColumn: true,
        headings: {
          startingPrice: "Starting price"
        },
        filterable: ["title", "startingPrice"],
        sortable: ["title", "startingPrice"],
        pagination: {
          dropdown: true,
          nav: "scroll"
        }
      }
      // jobs: []
    };
  }
};
</script>

<style scoped>
.btn-client {
  width: 3vw;
  color: #f6f6f6;
  background-color: #2c3340;
  border-color: #2c3340;
}

.eye_ico {
  color: var(--cyan);
  vertical-align: middle;
}

.eye_ico:hover {
  color: #000619d4;
  vertical-align: middle;
}

.nav_btns {
  display: flex;
  flex-direction: column;
  width: 5%;
}
.nav_btns svg {
  vertical-align: middle;
}
.nav_btns button {
  margin-bottom: 25%;
}
.nav_btns a {
  margin-bottom: 25%;
}
.active_item {
  color: white !important;
  background-color: #007effe3 !important;
  border-radius: 0 !important;
}
</style>
