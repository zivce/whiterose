<template>
  <div>
    <v-client-table
    :data='table_data'
    :columns='columns'
    :options='options'
    >
    </v-client-table>

  </div>

</template>

<script>
import logger from "../../../utils/groupLogger";
import welcomeToastr from "../../toastr/welcometoastr";
import hardcode from "./hardcode";

export default {
  mixins: [welcomeToastr],
  created() {
    //  axios
    //   .get("allscans")
    //   .then(response => {
    //     //this adapts response for show in vue tables 2
    //     response.data.data.forEach(scan_info => {
    //       this.table_data.push({
    //         date: moment(scan_info.created_at),
    //         scan: scan_info.scanName,
    //         output: "",
    //         uri: scan_info.path
    //       });
    //     });
    //   })
    //   .catch(err => {
    //     //error snotify here.
    //   });
  },
  mounted() {
    logger(["hellow", "user mounted"], "User.vue");
  },
  data() {
    return {
      sortIcon:"fa fa-caret",
      columnsClasses: {
          date: "cursorable"
        },
      columns: ["date", "scan", "show"],
      table_data: hardcode,
      options: {
        datepickerOptions: {
          linkedCalendars: true
        },
        dateColumns: ["date"],
        sortable: ["date"],
        filterable:["scan"],
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
.cursorable
{
  cursor: pointer;
}
</style>
