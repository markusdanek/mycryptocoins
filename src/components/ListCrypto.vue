<template>
  <div class="container">

    <div class="columns">

      <div class="column item is-one-third" v-for="(value, key) in getCoins">
        <div class="top">
          <div class="columns">
            <div class="column is-offset-1 purchasedate">
              <small>{{value.purchasedate | formatDate}}</small>
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
              <div v-for="(asdf, key) in value.historic">
                <div v-for="(as, key) in asdf" v-if="key==0">
                  <h3>{{as.value | round}} {{value.currency}} ({{value.amount}} @ {{as.price}})</h3>
                </div>
              </div>
              <p>1.3649%</p>
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
      ...mapGetters(['getCoins'])
    },
    methods: {
      imageUrl(symbol) {
        return _.get(images, symbol);
      },
      cryptoState(){
        console.log(this.$store.state.crypto);
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
    },
    mounted() {
      this.cryptoState();
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
        color: #8c98a4;
      }
      .info {
        h3 {
          font-weight: 500;
          font-size: 1rem;
          line-height: 1.5;
        }
        p {
          color: #00c9a7;
          font-size: 80%;
          font-weight: 400;
        }
      }
    }
  }
</style>
