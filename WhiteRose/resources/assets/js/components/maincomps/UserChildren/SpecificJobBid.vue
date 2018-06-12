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
        
        <transition name="flip" mode="out-in">
        
            <pentester-bid 
            ref="pentester_bid"
            :title ="title"
            :det.sync="details"
            v-if="isVisibleBid">

            </pentester-bid>

        </transition>
    
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
        eventBus.$on("isVisiblePentesterBid",(val) => {
            this.isVisibleBid = val;
        })
    },
    created () {
        const props = this.$route.params;
        /**different view if job completed */
        // if(props.completed)
        // {
        //     /**Logic to get accepted bid to top of table */
        //     const new_bids = _.sortBy(props.bids, (item) => {
        //         return item.accepted === 1 ? 0  : 1;
        //     })
            

        //     this.bids_filter = props.bids;
        
        //     /**Logic for accepting already inprogress */
        //     /**add inprogress to each */
        //     this.bids_filter = this.bids_filter.map(( bid ) => {
        //        return {
        //            ...bid,
        //            declined_flag : bid.accepted != 1
        //        } 
        //     })
        //     // console.log("declined",this.bids_filter);
        // }
        // else
        // {
        //     this.bids_filter = props.bids;
        // }
        
        this.bids_filter = props.bids_modified;
        this.title = props.title

    },
    data() {
        return {
            //Visibility variables
            isVisibleBid : false,
            
            //Pentester bid props
            details: {},
            title : undefined,
            inprogress : undefined,

            //table details
            bids_filter : [],
            columns: ["pentester_username", "amount", "deadline", "preview"],
             options: {
                sortIcon:{
                    base:'glyphicon',
                    is:'glyphicon-sort',
                    up: 'glyphicon-chevron-up',
                    down: 'glyphicon-chevron-down'
                },
                headings : {
                    pentester_username : 'Pentester'
                },
                columnsClasses: {
                rating: "cursorable"
                },
                filterByColumn: true,
                filterable: ["pentester", "rating", "title"],
                rowClassCallback(row) 
                {
                const accepted_suffix = 
                row.accepted === 1 ? "_accepted" : "_not_accepted";
                
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


