<template>
  <div class="comp_container">
    
    <h2 class="h2s">Preview your bids.</h2>

    <transition name="flip" mode="out-in">
      <v-client-table
      v-if="!isVisibleBid"
      :data='table_data'
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
    
      <pentester-bid 
      :det.sync="details"
      v-if="isVisibleBid">

      </pentester-bid>

    </transition>

  </div>

</template>

<script>
import logger from "../../../utils/groupLogger";
import Icon from "vue-awesome/components/Icon";

import welcomeToastr from "../../toastr/welcometoastr";

import hardcodepentst from "./hardcodepntst";
import PentesterBid from "./UserParts/PentesterBid.vue";
import eventBus from "../../../utils/eventBus";
import "vue-awesome/icons/eye";

export default {
  components: {
    PentesterBid,
    Icon
  },
  mixins: [welcomeToastr],
  created() {
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
    eventBus.$on("isVisiblePentesterBid", val => {
      this.isVisibleBid = val;
      console.log(this.details);

      //change the accepted
      if (this.details.accepted) {
        this.table_data.forEach(elem => {
          let job_got_accepted = elem.show.info === this.details.info;

          if (job_got_accepted) {
            //dodaj da je postao accepted u bazu nekako

            elem.show.accepted = true;
          }
        });
      }
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
      columns: ["pentester", "rating", "preview"],
      table_data: hardcodepentst,
      options: {
        columnsClasses: {
          rating: "cursorable"
        },
        filterByColumn: true,
        filterable: ["pentester", "rating"],
        sortable: ["rating"],
        pagination: {
          dropdown: true,
          nav: "scroll"
        }
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
