<template>
  <div class="container">

    <div class="columns">

      <div class="column item is-one-third" v-for="(value, key) in cryptoOverview">
        <div class="top">
          <div class="columns">
            <div class="column is-offset-1 purchasedate">
              <!-- <small>{{value.purchasedate | formatDate}}</small> -->
              <small>{{value.amount}} {{value.symbol}}</small>
            </div>
            <div class="column">
              <span class="is-pulled-right" @click="show(value.symbol)">
                <b-icon icon="info-circle"></b-icon>
              </span>
            </div>
          </div>
          <div class="columns">
            <div class="column is-offset-1 is-2">
              <img :src="imageUrl(value.symbol)" alt="crypto image" />
            </div>
            <div class="column info">
              <h3>
                {{value.valueToday}}
              </h3>
              <div class="columns">
                <div class="column">
                  <p v-if="value.deltaPercent > 0" class="positive">
                    {{value.deltaPercent}}% ({{value.delta}})
                    <b-icon icon="angle-up"></b-icon>
                  </p>
                  <p v-else class="negative">
                    {{value.deltaPercent}}% ({{value.delta}})
                    <b-icon icon="angle-down"></b-icon>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div class="bottom">
          <div class="columns">
            <div class="column">
              <PriceChart :coin="value.symbol" :styles="{width: '360px', height: '100px', position: 'relative'}" />
              <!-- <p class="chart-legend">Market trend for the last seven days</p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal name="crypto-details" height="auto" width="70%" :scrollable="true">
      <CryptoModal :coin="groupBySymbol[this.symbol]"/>
    </modal>

  </div>
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment';
  import {mapGetters} from 'vuex';
  import {images} from '../helpers/coinIcons';
  import CryptoModal from '@/components/CryptoModal'
  import PriceChart from '@/components/PriceChart'

  export default {
    name: 'list-crypto',
    computed: {
      ...mapGetters(['getCoins', 'groupBySymbol','cryptoOverview', 'getCryptoImage'])
    },
    data() {
      return {
        symbol: ''
      }
    },
    mounted() {
      this.$store.dispatch('FETCH_CRYPTOIMAGE');
    },
    components: {
      CryptoModal, PriceChart
    },
    methods: {
      imageUrl(symbol) {
        for (let key in this.getCryptoImage) {
          if (this.getCryptoImage.hasOwnProperty(key)) {
            if (this.getCryptoImage[key].symbol === symbol) {
              return this.getCryptoImage[key].image;
            }
          }
        }
      },
      removeCrypto(crypto){
        this.$store.dispatch('REMOVE_CRYPTO', crypto);
      },
      show(symbol) {
        this.symbol = symbol;
        this.$modal.show('crypto-details');
      },
      hide() {
        this.$modal.hide('crypto-details');
      }
    },
    filters: {
      round(value) {
        return value.toFixed(2);
      },
      formatDate(value){
        return moment(String(value)).format('MMMM Do YYYY')
      },
      positivNegativ(value){
        if(value > 0) {
          return 'positiv'
        } else {
          return 'positiv'
        }
      }
    }
  }
</script>

<style lang="scss">
  .item {
    box-shadow: 0 0 35px rgba(140, 152, 164, 0.125) !important;
    border-radius: 0.25rem !important;
    background: #FFF;
    margin-right: 0.75rem;
    .top {
      .purchasedate {
        color: #8C98A4;
      }
      .info {
        h3 {
          font-weight: 500;
          font-size: 1rem;
          line-height: 1.5;
        }
        p {
          font-size: 80%;
          font-weight: 400;
          &.positive {
            color: #00C9A7;
          }
          &.negative {
            color: #DE4437;
          }
        }
      }
    }
    .bottom {
      p.chart-legend {
        font-size: 0.75rem;
        color: #8C98A4;
        text-align: right;
      }
    }
  }
</style>
