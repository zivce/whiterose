// CommitChart.js
import {Line } from 'vue-chartjs';
import SpendingsApi from '../../../../services/api/user_api/spendings.api';
//TODO: Napuni chart

export default {
  extends: Line ,
  created(){
    //NAPUNI OVDE
    // this.spendings = SpendingsApi.getSpendings();

  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          label: this.label,
          backgroundColor: '#546A76',
          data: this.spendings
        },
        
      ]
    })
  },
  data(){
    return {
      spendings: [30,40,50,60,10,30,40],
      label: "Money spent"
    }
  }
}