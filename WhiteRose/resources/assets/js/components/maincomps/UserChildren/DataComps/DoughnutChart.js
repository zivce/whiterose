// CommitChart.js
import {Line } from 'vue-chartjs';

//TODO: Napuni chart

export default {
  extends: Line ,
  created(){
    //NAPUNI OVDE
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          label: 'Tokens spent',
          backgroundColor: '#546A76',
          data: [40, 20, 12, 39, 10, 40, 39]
        },
        
      ]
    })
  }
}