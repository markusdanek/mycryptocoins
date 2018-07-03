<template>
  <div class="container">

    <div class="columns">

      <div class="column item is-one-third" v-for="(value, key) in groupBySymbol">
        <div class="top">
          <div class="columns">
            <div class="column is-offset-1 purchasedate">
              <!-- <small>{{value.purchasedate | formatDate}}</small> -->
              <small>{{value.amount}} {{value.symbol}}</small>
            </div>
            <div class="column">
              <span class="is-pulled-right" @click="removeCrypto(value)">
                <b-icon icon="times"></b-icon>
              </span>
            </div>
          </div>
          <div class="columns">
            <div class="column is-offset-1 is-2">
              <img :src="imageUrl(value.symbol)" alt="" width="40" />
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
              <img src="../assets/bar-chart.png" alt="">
            </div>
          </div>
        </div>
      </div>

    </div>
    <pre>{{groupBySymbol}}</pre>
  </div>
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment';
  import {mapGetters} from 'vuex';
  import {images} from '../helpers/coinIcons';

  export default {
    name: 'list-crypto',
    computed: {
      ...mapGetters(['getCoins', 'groupBySymbol'])
    },
    methods: {
      imageUrl(symbol) {
        return _.get(images, symbol);
      },
      removeCrypto(crypto){
        this.$store.dispatch('REMOVE_CRYPTO', crypto);
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
  }
</style>
