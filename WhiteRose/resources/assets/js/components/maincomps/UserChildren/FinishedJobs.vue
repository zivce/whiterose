<template>
  <div 
  ref="fin_jobs"
  class="comp_container_jobs">
    <h2 class="h2s">Preview finished jobs.</h2>

    <transition name="flip" mode="out-in">
    
      <v-client-table
      v-if="!isVisibleBid"
      :data='finished_jobs'
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
    
      <started-more-info
      :det.sync="details"
      v-if="isVisibleBid">

      </started-more-info>

    </transition>

  </div>

</template>

<script>
import Icon from "vue-awesome/components/Icon";



import StartedMoreInfo from "./UserParts/StartedJobInfo.vue";
import eventBus from "../../../utils/eventBus";
import "vue-awesome/icons/eye";
import { mapGetters } from "vuex";

export default {
  components: {
    StartedMoreInfo,
    Icon
  },
  mixins: [],
  created() {},
  computed: {
    ...mapGetters({ finished_jobs: "returnFinishedJobs" })
  },
  mounted() {
    eventBus.$on("isVisibleStartedInfo", val => {
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
      columns: ["title", "startingPrice", "preview"],
      options: {
        columnsClasses: {
          price: "cursorable"
        },
        headings: {
          startingPrice: "Price"
        },
        filterByColumn: true,
        filterable: ["title", "price"],
        sortable: ["price"],
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
