<template>
  <div class="comp_container">
    
    <h2 class="h2s">Preview your bids.</h2>
    <v-bar id="bids_wrapper" 
    wrapper="bids_wrapper">
      <div class="d-flex flex-column justify-content-center">
          <div 
          @click="openBidsView(job.id,job.bids,job.completed)"
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
              style="margin-right:auto;"
                :class="{
                'completed_bid' : job.completed === 1,
                'inprogress_bid' : job.inprogress === 1}"
                
                >

                {{job.completed ===  1 ? 'Completed' : ''}}
                {{job.inprogress === 1 ? 'In progress' : ''}}
                
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
      
    </v-bar>

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
    openBidsView(id,bids,completed)
    {

      this.$router.push({
        name: 'spec_bid',
        params : {
          job_id : id,
          bids,
          completed
        }
      })
    }
  },
  data() {
    return {
      details: {},
      isVisibleBid: false,
      columns: ["pentester", "rating", "title", "preview"],
      // table_data: hardcodepentst,
      jobs: [],
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
    };
  }
};
</script>

<style lang="scss" scoped>
$accepted_bg_color : #3BC14A;
$accepted_color_text : #000923;
$not_accepted_bg_color : #A22C29;
$in_progress_color : #2E86AB;

</style>
