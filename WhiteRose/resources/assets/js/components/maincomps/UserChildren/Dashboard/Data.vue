<template>
  <div>

      
    <transition name="flip">
      <div v-if="!isVisibleBid">
        
        <div class="control_chart">
            <app-line :height="heig" />
        </div>  

        <h2 class="h2s">Top five pentesters</h2>
        <div class="control_table">

            <v-client-table
            :data='pentesters'
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
        
        </div>
        
      </div>
    
    </transition>

    <transition name="flip">
        <more-info
        v-if="isVisibleBid"
        :det.sync="details"
        >
        </more-info>
    </transition>


  </div>

</template>

<script>
import AppLine from "../DataComps/DoughnutChart";
import hardc from "../hardcode_pentesters";
import MoreInfo from '../UserParts/ContactPentester.vue';
import eventBus from '../../../../utils/eventBus';
import Icon from "vue-awesome/components/Icon";

import "vue-awesome/icons/eye";


export default {
  methods: {
    showDetails(props) {
      this.details = props.row;
      this.isVisibleBid = true;
    }
  },
  components: {
    AppLine,Icon,MoreInfo
  },
  mixins: [],
  mounted() {
       eventBus.$on("isVisibleMoreInfo", val => {
      this.isVisibleBid = val;
    });
  },
  data() {
    return {
        heig : 200,
      details: {},
      isVisibleBid: false,
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
.control_table
{
    width:70%;
    margin: 0 auto;
}
.control_chart{
    max-height: 5%;
    margin-bottom: 30px;
}
</style>
