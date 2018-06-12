<template>
  <div class="comp_container">
    
    <h2 class="h2s">Preview your bids.</h2>
      <div class="d-flex flex-column justify-content-center">
          <div 
          style="cursor:pointer;"
          @click="openBidsView(job)"
          class="bid_container"
          v-for="job in jobs"
          :key="job.id">
            <div
            style="display:flex;
            flex-direction:column;"
            >
              <!-- gets the number of bids -->
              <h3 class="bid_h3" 
              style="margin-top: auto;">
              {{job.title}} 
              - 
              {{job.bids.length === 0 ? 'No bids' 
              : job.bids.length === 1 ? job.bids.length + ' Bid' : job.bids.length + ' Bids'}} 
              
              </h3>  
              <span
              v-if="job.completed ===  1 || job.inprogress == 1"
              style="margin-right:auto;"
                :class="{
                'completed_bid' : job.completed === 1,
                'inprogress_bid' : job.inprogress === 1}"
                
                >

                {{job.completed ===  1 ? 'Completed' : ''}}
                {{job.inprogress === 1 ? 'In progress' : ''}}
          
              </span>
              
              <span
              style="margin-right:auto;"
              v-else 
              class="opened_job">
              
                Open job
              
              </span>


              <p class="bid_p" style="
              display: flex;
              flex-direction:  column;
              ">
                
                <span style="font-weight:bold;"> {{job.domain}} </span>

                 {{job.description}}
                
              </p>
              <!-- number of bids for job -->
            </div>
        
          </div>
        </div>
      
  </div>

</template>

<script>

import GetBidsAPI from "../../../services/api/user_api/getBids.api";

export default {

  created() {
    //TODO : fetch bids here
    
    GetBidsAPI.getBidsClient().then(
      (jobs_bids_combined) => {
        this.jobs = jobs_bids_combined.data;
      }

    )

    // axios
    //   .post("viewbidsclient")
    //   .then(response => {
    //     console.log(response.data);
    //     //this adapts response for show in vue tables 2
    //     response.data.forEach(bid_info => {
    //       console.log(bid_info);
    //       this.table_data.push({
    //         pentester: bid_info.pentester_email,
    //         pentester_username: bid_info.pentester_username,
    //         rating: bid_info.pentester_rating,
    //         title: bid_info.job_name,
    //         bid_info: bid_info.bid,
    //         accepted : bid_info.accepted
    //       });
    //     });
    //   })
    //   .catch(err => {
    //     //error snotify here.
    //   });


  
  },
  computed: {},
  mounted() {
  

  },
  computed: {},
  methods: {
    openBidsView(job)
    { 
        let bids_modified = null;

        if(job.completed === 1 || 
        job.inprogress  === 1)
        {
            /**Logic to get accepted bid to top of table */
            bids_modified = _.sortBy(job.bids, (item) => {
                return item.accepted === 1 ? 0  : 1;
            })
            

            // this.bids_filter = props.bids;
        
            /**Logic for accepting already inprogress */
            /**add inprogress to each */

            bids_modified = bids_modified.map(( bid ) => {
               return {
                   ...bid,
                   declined_flag : bid.accepted != 1
               } 
            })
        }
        else
        {
           bids_modified = job.bids;
        }
      


      this.$router.push({
        name: 'spec_bid',
        params : {
          job_id : job.id,
          bids_modified,
          completed: job.completed,
          title : job.title
        }
      })
    }
  },
  data() {
    return {
      details: {},
      isVisibleBid: false,
      jobs : []
    };
  }
};
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
.opened_job {
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
