<template>
  <div class="comp_container d-flex flex-row">
    

    <div class="nav_btns col-2">
          
        <b-button 
        v-b-tooltip.hover.right="'All jobs'"
        class="btn btn-client " 
        :to="{name:'myjobs'}">
          <icon name="tasks" ></icon>
        </b-button>
        
        <b-button 
        v-b-tooltip.hover.right="'Started jobs'"
        class="btn btn-client"
        :to="{name:'startedjobs'}">
          <icon name="hourglass-start" ></icon>
        </b-button>
        
        <b-button 
        v-b-tooltip.hover.right="'Finished jobs'"
        class="btn btn-client"
        :to="{name:'finjobs'}">
          <icon name="flag-checkered" ></icon>
        </b-button>

    </div>

    <transition name="job" mode="out-in">
      
      <router-view class="col-10 job">
      </router-view>

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

import "vue-awesome/icons/hourglass-start";
import "vue-awesome/icons/flag-checkered";
import "vue-awesome/icons/tasks";

import StartedJobs from "../UserChildren/StartedJobs.vue";
import FinishedJobs from "../UserChildren/FinishedJobs.vue";

export default {
  components: {
    StartedJobs,
    FinishedJobs,
    MoreInfo,
    Icon
  },
  mixins: [welcomeToastr],
  created() {
    //TODO: napuni my_jobs
    //TODO: izbrisi hardcode dodelu
    // axios
    //   .get("returnmyjobs")
    //   .then(response => {
    //     console.log(response.data[0]);
    //     // this adapts response for show in vue tables 2
    //     // this.jobs[0] = response.data[0];
    //     response.data.forEach(job_info => {
    //       //ovde sam hardkodirao da bi se uklopilo u tabelu
    //       //treba ovo sto je zakomentarisano pa da promenis tabelu
    //       this.jobs.push({
    //         title: job_info.title,
    //         startingPrice: job_info.maximum_price,
    //         description: job_info.description
    //         //job_info
    //       });
    //     });
    //   })
    //   .catch(err => {
    //     //error snotify here.
    //   });
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
      jobs: []
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

#eye_ico {
  color: var(--cyan);
  vertical-align: middle;
}

#eye_ico:hover {
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
