<template>
  <div id="root_data" class="setup_margin_top">
    <div class="d-flex flex-row">

    <div class="d-flex col-3" id="sidebar_dashboard">
        <b-nav class="flex-column">
            <h3 class="h3s">Select option from list.</h3>

            <b-nav-item @click="switchComponentNum(0)">
                Spendings
            </b-nav-item>

            <b-nav-item  @click="switchComponentNum(1)">
                Top 5 Pentesters
            </b-nav-item>
            

        </b-nav>
      </div>
      
      <div class="col-8">

        <div v-if="isVisibleChart">
          
          <div class="control_chart">
              <app-line :height="heig" :width="width"/>
          </div>  
        
        </div>
    
        <div v-if="isVisibleTopFive">
          
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
      </div>
    

    </div>
  </div>

</template>

<script>
import AppLine from "../DataComps/DoughnutChart";
import hardc from "../hardcode_pentesters";
import MoreInfo from "../UserParts/ContactPentester.vue";
import eventBus from "../../../../utils/eventBus";
import Icon from "vue-awesome/components/Icon";

import "vue-awesome/icons/eye";

export default {
 
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
    switchComponentNum(num)
    {
      if(num === 0)
      {
        this.isVisibleChart = true;
        this.isVisibleTopFive = false;

      }
      else if( num === 1)
      {
        this.isVisibleChart= false;
        this.isVisibleTopFive = true;
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
      isVisibleChart : true,
      isVisibleTopFive : false,

      //Table options
      columns: ["username", "rating", "preview"],
      pentesters: hardc,
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
