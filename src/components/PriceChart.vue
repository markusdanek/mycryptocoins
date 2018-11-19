<script>
import {
  Bar
} from 'vue-chartjs'

export default {
  extends: Bar,
  name: 'price-chart',
  mounted() {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: '',
        backgroundColor: '#19a0ff',
        fill: true,
        showLine: true,
        data: this.$store.getters.getCryptoHistoricPrice,
      }]
    }, {
      // scales: {
      //   xAxes: [{
      //     gridLines: {
      //       display: false
      //     },
      //     ticks: {
      //       display: false
      //     }
      //   }],
      //   yAxes: [{
      //     gridLines: {
      //       display: false
      //     },
      //     ticks: {
      //       display: false
      //     }
      //   }]
      // },
      responsive: true,
      legend: {
        display: true
      },
      title: {
        display: true
      },
      tooltips: {
        enabled: true
      }

    })
  }
}
</script>

<style>
</style>
