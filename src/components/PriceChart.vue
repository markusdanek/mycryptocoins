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
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
    this.renderChart({
      labels: ['', '', '', '', '', '', ''],
      datasets: [{
        label: this.coin,
        backgroundColor: '#19a0ff',
        borderColor: '#19a0ff',
        borderWidth: '3',
        pointBorderWidth: '1',
        // pointBackgroundColor: '#19C0DD',
        // pointBorderColor: '#19C0DD',
        fill: true,
        showLine: true,
        data: this.$store.getters.getCryptoHistoricPrice(this.coin)
      }],
    }, {
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            display: false
          }
        }],
        yAxes: [{
          gridLines: {
            display: false,
            drawBorder: false
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
