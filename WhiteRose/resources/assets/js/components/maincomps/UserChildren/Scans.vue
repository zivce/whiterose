<template>
  <div class="comp_container">
    
    <h2 class="h2s">Preview your scans.</h2>

    <v-client-table
    :data='table_data'
    :columns='columns'
    :options='options'
    >

    
    <a  slot="download" 
        slot-scope="props"
        :href="props.row.uri"
    >
      <icon name="download"></icon>
    </a>


    </v-client-table>

  </div>

</template>

<script>
import logger from "../../../utils/groupLogger";
import welcomeToastr from "../../toastr/welcometoastr";
import hardcode from "./hardcode";

import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/download";

export default {
  components: {
    Icon
  },
  mixins: [welcomeToastr],
  created() {
    axios
      .get("allscans")
      .then(response => {
        //this adapts response for show in vue tables 2
        response.data.forEach(scan_info => {
          this.table_data.push({
            date: moment(scan_info.created_at),
            scan: scan_info.scanName,
            uri: scan_info.path
          });
        });
      })
      .catch(err => {
        //error snotify here.
      });
  },
  mounted() {
    logger(["hellow", "user mounted"], "User.vue");
  },
  data() {
    return {
      sortIcon: "fa fa-caret",

      columns: ["date", "scan", "download"],
      table_data: hardcode,
      options: {
        columnsClasses: {
          date: "cursorable"
        },
        dateColumns: ["date"],
        sortable: ["date"],
        filterable: ["scan"],
        pagination: {
          dropdown: true,
          nav: "scroll"
        },
        filterByColumn: true,
        dateFormat: "DD.MM.YYYY"
      }
    };
  }
};
</script>

<style scoped>
.cursorable {
  cursor: pointer;
}
</style>
