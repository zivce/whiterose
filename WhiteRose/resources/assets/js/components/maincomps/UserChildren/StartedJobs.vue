<template>
  <div class="comp_container">
    <h2 class="h2s">Preview started jobs.</h2>

    <transition name="flip" mode="out-in">
    
      <v-client-table
      v-if="!isVisibleBid"
      :data='started_jobs'
      :columns='columns'
      :options='options'
      >
    
    <a  slot="more info" 
        slot-scope="props"
        class="cursorable"
        @click="showDetails(props)"
        >
        <icon id="eye_ico" name="eye"></icon>
      </a>

      
      </v-client-table >
    
    </transition>
    <transition name="flip" mode="out-in">
    
      <started-more-info
      :det.sync="details"
      v-if="isVisibleBid">

      </started-more-info>

    </transition>

  </div>

</template>

<script>
import logger from "../../../utils/groupLogger";
import Icon from "vue-awesome/components/Icon";

import welcomeToastr from "../../toastr/welcometoastr";

import hardcodepentst from "./hardcodestartedjobs";
import StartedMoreInfo from "./UserParts/StartedJobInfo.vue";
import eventBus from "../../../utils/eventBus";
import "vue-awesome/icons/eye";

export default {
  components: {
    StartedMoreInfo,
    Icon
  },
  mixins: [welcomeToastr],
  created() {
    //TODO: napuni started_jobs
    //TODO: skini hardcode
    //TODO: izbrisi import gore

    axios
      .get("startedJobs")
      .then(response => {
        console.log(response.data[0]);
        // this adapts response for show in vue tables 2
        this.jobs[0] = response.data[0];
        response.data.forEach(job_info => {
          //ovde sam hardkodirao da bi se uklopilo u tabelu
          //treba ovo sto je zakomentarisano pa da promenis tabelu
          this.jobs.push({
            job_info
          });
        });
      })
      .catch(err => {
        //error snotify here.
      });
    //TODO: napuni started_jobs
    //TODO: skini hardcode
    //TODO: izbrisi import gore
    //  axios
    //   .get("allbids")
    //   .then(response => {
    //     //this adapts response for show in vue tables 2
    //     response.data.data.forEach(scan_info => {
    //       this.table_data.push({
    //         pentester: bid_info.username,
    //         rating: bid_info.rating,
    //         bid_info
    //       });
    //     });
    //   })
    //   .catch(err => {
    //     //error snotify here.
    //   });
  },
  computed: {},
  mounted() {
    eventBus.$on("isVisibleStartedInfo", val => {
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
      columns: ["title", "price", "more info"],
      started_jobs: hardcodepentst,
      options: {
        columnsClasses: {
          price: "cursorable"
        },
        filterByColumn: true,
        filterable: ["title", "price"],
        sortable: ["price"],
        pagination: {
          dropdown: true,
          nav: "scroll"
        },
        jobs: []
      }
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
