<template>
  <div id="root_data" class="setup_margin_top">
    <div class="d-flex flex-row">

    <div class="d-flex col-3" id="sidebar_dashboard">
        <b-nav class="flex-column">
            <h3 class="h3s">Select option from list.</h3>

            <b-nav-item @click="switchComponentNum(0)">
              <span :class="{'strong':isVisibleChart}">
                Spendings
              </span>
            </b-nav-item>

            <b-nav-item  @click="switchComponentNum(1)">
              <span :class="{'strong':isVisibleTopFive}">
                Top 5 Pentesters
              </span>
            </b-nav-item>
            
            <b-nav-item  @click="switchComponentNum(2)">
                <span :class="{'strong':isVisibleSites}">
                  Your verified sites
                </span>

            </b-nav-item>
            

        </b-nav>
      </div>
      
      <!-- CHART  -->
      <transition name="fade">
      <div class="col-8">
      
      <transition name="fade">

        <div v-show="isVisibleChart">
          
          <div class="control_chart">
              <app-line :height="heig" :width="width"/>
          </div>  
        
        </div>
      
      </transition>

      <!-- TOP FIVE PART  -->
      <transition name="fade">

      <div v-show="isVisibleTopFive">
          
          <div class="col-12"  v-if="!isVisibleBid">

            <h2 class="h2s">Top five pentesters</h2>

            <v-client-table
            :data='pentesters'
            :columns='columns'
            :options='options'
            >
            
            <a  slot="preview" 
                slot-scope="props"
                class="cursorable"
                @click="showDet(props)"
                >
                <icon id="eye_ico" name="eye"></icon>
            </a>

            
            </v-client-table >
          </div>
          
          <more-info
          v-if="isVisibleBid"
          :det.sync="details"
          >
          </more-info>

        
        </div>
      </transition>

        <!-- VERIFIED SITES -->
        <transition name="fade">

            <div v-show="isVisibleSites">

              <div class="col-12" >

                <h2 class="h2s">Verified sites</h2>

                <v-client-table
                :data='sites'
                :columns='columns_sites'
                :options='options_sites'
                >
                
                </v-client-table >
              </div>
            </div>

        </transition>


      </div>
    
      </transition>

    </div>
  </div>

</template>

<script>
import AppLine from "../DataComps/DoughnutChart";


import MoreInfo from "../UserParts/ContactPentester.vue";
import eventBus from "../../../../utils/eventBus";
import Icon from "vue-awesome/components/Icon";

//API services
import TopFiveApi from "../../../../services/api/user_api/topfive.api";

import "vue-awesome/icons/eye";

export default {
  created() {
    // this.pentesters = TopFiveApi.getTopFive();
  },
  components: {
    AppLine,
    Icon,
    MoreInfo
  },
  mixins: [],
  methods: {
    showDet(props) {
      this.details = props.row;
      this.isVisibleBid = true;
    },
    switchComponentNum(num) {
      if (num === 0) {
        this.isVisibleChart = true;

        this.isVisibleTopFive = false;
        this.isVisibleSites = false;
      } else if (num === 1) {
        this.isVisibleTopFive = true;

        this.isVisibleChart = false;
        this.isVisibleSites = false;
      } else if (num === 2) {
        this.isVisibleSites = true;

        this.isVisibleTopFive = false;
        this.isVisibleChart = false;
      }
    }
  },
  mounted() {
    eventBus.$on("isVisibleMoreInfo", val => {
      this.isVisibleBid = val;
    });
  },
  data() {
    return {
      //Chart props
      heig: 500,
      width: 800,

      details: {},

      //Visibility props
      isVisibleBid: false,
      isVisibleChart: true,
      isVisibleTopFive: false,
      isVisibleSites: false,

      //Table options
      columns: ["username", "rating", "preview"],
      columns_sites: ["domain"],

      //TODO: zameni stvarnim podacima

      // pentesters: hardc,
      // sites: DomainsHardcode,

      //...

      options_sites: {
        columnsClasses: {
          domain: "cursorable"
        },
        filterByColumn: true,
        filterable: ["domain"],
        pagination: {
          dropdown: true,
          nav: "scroll"
        }
      },

      options: {
        columnsClasses: {
          rating: "cursorable"
        },
        filterByColumn: true,
        filterable: ["rating"],
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
.strong {
  color: rgb(7, 8, 15);
  font-weight: 600;
}

.fade-enter-active,
.fade-leave-active {
  transition: ease-in 0.5s;
}
.fade-enter,
.fade-leave-to {
  transition: ease-out 0.5s;
  opacity: 0;
}

.control_table {
  width: 70%;
  margin: 0 auto;
}

.control_chart {
  /* max-width: 30%; */
  /* max-height: 30%; */
  margin-bottom: 30px;
}
</style>
