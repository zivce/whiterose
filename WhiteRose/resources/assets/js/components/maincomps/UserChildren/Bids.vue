<template>
  <div>
    <transition name="flip" mode="out-in">
    
      <v-client-table
      v-if="!isVisibleBid"
      :data='table_data'
      :columns='columns'
      :options='options'
      >
    
    <a  slot="details" 
        slot-scope="props"
        class="cursorable"
        @click="showDetails(props)"
        >
        view details
      </a>

      
      </v-client-table >
    
    </transition>
    <transition name="flip" mode="out-in">
    
      <pentester-bid 
      :details="details"
      v-if="isVisibleBid">

      </pentester-bid>

    </transition>

  </div>

</template>

<script>
import logger from "../../../utils/groupLogger";

import welcomeToastr from "../../toastr/welcometoastr";

import hardcodepentst from "./hardcodepntst";
import PentesterBid from "./UserParts/PentesterBid.vue";
import eventBus from "../../../utils/eventBus";

export default {
  components: {
    PentesterBid
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
  mounted() {
    eventBus.$on("isVisiblePentesterBid", val => {
      this.isVisibleBid = val;
      console.log(this.isVisibleBid)
  });
  },
  methods: {
    showDetails(props) {
      this.details = props.row.show;
      this.isVisibleBid = true;
    }
  },
  data() {
    return {
      columnsClasses: {
          details: "cursorable"
        },
      details: {},
      isVisibleBid: false,
      columns: ["pentester", "rating", "details"],
      table_data: hardcodepentst,
      options: {
        filterByColumn: true,
        filterable: ["pentester", "rating"],
        sortable: ["pentester"],
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
.cursorable{
  cursor:pointer;
  cursor: hand;
}
</style>
