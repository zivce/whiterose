<template>
  <div class="comp_container">
    
    <h2 class="h2s">Preview your jobs.</h2>
    <p> {{ jobs.domain }} </p>
    <transition name="flip" mode="out-in">
    
      <v-client-table
      v-if="!isVisibleBid"
      :data='jobs'
      :columns='columns'
      :options='options'
      >
    
    <a  slot="preview" 
        slot-scope="props"
        class="cursorable"
        @click="showDetails(props)"
        >
        <icon id="eye_ico" name="eye"></icon>
      </a>

      
      </v-client-table >
    
    </transition>
    <transition name="flip" mode="out-in">
    
      <more-info
      :det.sync="details"
      v-if="isVisibleBid">

      </more-info>

    </transition>

  </div>

</template>

<script>
import logger from "../../../utils/groupLogger";
import Icon from "vue-awesome/components/Icon";

import welcomeToastr from "../../toastr/welcometoastr";

//TODO: hardcode pentest izbaci

import hardcodemyjobs from "./hardcodemyjobs";
import MoreInfo from "./UserParts/JobsMoreInfo.vue";
import eventBus from "../../../utils/eventBus";
import "vue-awesome/icons/eye";

export default {
  components: {
    MoreInfo,
    Icon
  },
  mixins: [welcomeToastr],
  created() {
    //TODO: napuni my_jobs
    //TODO: izbrisi hardcode dodelu

     axios
      .get("returnmyjobs")
      .then(response => {
        console.log(response.data[0]);
        // this adapts response for show in vue tables 2
        this.jobs[0] = response.data[0];
        response.data.forEach(job_info => {
          //ovde sam hardkodirao da bi se uklopilo u tabelu
          //treba ovo sto je zakomentarisano pa da promenis tabelu
          this.jobs.push({
            title: job_info.title,
            startingPrice: job_info.maximum_price,
            description: job_info.description,
            //job_info
          });
        });
      })
      .catch(err => {
        //error snotify here.
      });
  },
  computed: {},
  mounted() {
    eventBus.$on("isVisibleMoreInfo", val => {
      this.isVisibleBid = val;
    });
  },
  computed: {},
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
      columns: ["title", "startingPrice", "preview"],
      my_jobs: hardcodemyjobs,
      options: {
        columnsClasses: {
          rating: "cursorable"
        },
        filterByColumn: true,
        filterable: ["title", "startingPrice"],
        sortable: ["pricing"],
        pagination: {
          dropdown: true,
          nav: "scroll"
        }
      },
      jobs:[]
    };
  }
};
</script>

<style scoped>
#eye_ico {
  color: var(--cyan);
  vertical-align: middle;
}

#eye_ico:hover {
  color: #000619d4;
  vertical-align: middle;
}
</style>
