<template>
     <div class="comp_container">
    
        <v-client-table
        ref="bids_table"
        class="bids_table"
        v-if="!isVisibleBid"
        :data='bids_filter'
        :columns='columns'
        :options='options'
        >
        
         <a  slot="preview" 
            ref="preview_btn"
            slot-scope="props"
            class="cursorable"
            @click="showDetails(props)"
            >
            <icon id="eye_ico" name="eye"></icon>
        </a>
        
        </v-client-table >
        
        <!-- <transition name="flip" mode="out-in">
        
        <pentester-bid 
        ref="pentester_bid"
        :det.sync="details"
        v-if="isVisibleBid">

        </pentester-bid>

        </transition>
     -->
    </div>
</template>

<script>
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/eye";


import PentesterBid from "./UserParts/PentesterBid.vue";
import eventBus from "../../../utils/eventBus";


export default {
    components: {
        PentesterBid,
        Icon
    },
    methods : {
        showDetails(props) {
            this.details = props.row;
            this.isVisibleBid = true;
        }
    },
    props: {
    },
    mounted () {
        const props = this.$route.params;
        /**different view if job completed */
        if(props.completed)
        {
            /**Logic to get accepted bid to top of table */
            let index = this.props.bids.findIndex((bid) => {
                return bid.accepted === 1;
            })

            let accepted_bid = this.props.bids.splice(index,1);

            this.props.bids.unshift(accepted_bid);

            this.bids_filter  = this.props.bids;

        }
        else
        {
            this.bids_filter = this.props.bids;
        }
    },
    data() {
        return {
            //Visibility variables
            isVisibleBid : false,

            //table details
            bids_filter : [],
            columns: ["pentester", "rating", "title", "preview"],
             options: {
                sortIcon:{
                    base:'glyphicon',
                    is:'glyphicon-sort',
                    up: 'glyphicon-chevron-up',
                    down: 'glyphicon-chevron-down'
                },
                columnsClasses: {
                rating: "cursorable"
                },
                filterByColumn: true,
                filterable: ["pentester", "rating", "title"],
                rowClassCallback(row) 
                {
                const accepted_suffix = 
                row.bid_info.accepted === 1 ? "_accepted" : "_not_accepted";
                
                return "row" + accepted_suffix;

                },
                sortable: ["rating"],
                pagination: {
                dropdown: true,
                nav: "scroll"
                }
            }
            
        }
    }

    
    
}
</script>
<style lang="scss" scoped>
$accepted_bg_color : #3BC14A;
$accepted_color_text : #000923;
$not_accepted_bg_color : #A22C29;
$in_progress_color : #2E86AB;




.completed_bid {
  font-weight: 500;
  color : $accepted_bg_color;
}

.inprogress_bid {
  font-weight: 500;
  color : $in_progress_color;
}


.bids_table /deep/ .row_accepted td {
  background-color: $accepted_bg_color !important;
  color: $accepted_color_text !important;
  #eye_ico {
    color: $accepted_color_text !important; 
  }
  
  #eye_ico:hover {
    color: lighten( $accepted_color_text, 30% ) !important; 
  }
}

.bids_table /deep/ .row_not_accepted td {
  background-color: $not_accepted_bg_color !important;
}

.bids_wrapper {
  height: 73vh;
  margin-top: 3%;
}
#eye_ico {
  color: var(--cyan);
  vertical-align: middle;
}

#eye_ico:hover {
  color: #000619d4;
  vertical-align: middle;
}
</style>


