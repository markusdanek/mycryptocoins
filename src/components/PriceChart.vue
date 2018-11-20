<script>
import {
  Line
} from 'vue-chartjs'

export default {
  extends: Line,
  name: 'price-chart',
  props: {
    coin: {
      type: String
    }
  },
  mounted() {
    this.renderChart({
      labels: ['', '', '', '', '', '', ''],
      datasets: [{
        label: this.coin,
        backgroundColor: '#19a0ff',
        borderColor: '#19a0ff',
        borderWidth: '3',
        fill: false,
        showLine: true,
        data: this.$store.getters.getCryptoHistoricPrice(this.coin)
      }],
    }, {
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            display: false
          }
        }],
        yAxes: [{
          type: 'linear',
          gridLines: {
            display: false
          },
          ticks: {
            display: false
          }
        }]
      },
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltips: {
        // enabled: false
      },
      responsive: true,
      maintainAspectRatio: false
    })
  }
}
</script>

<style>
</style>
