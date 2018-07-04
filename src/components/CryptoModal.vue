<template>
  <div>
    <div class="coin-logo">
      <img :src="imageUrl(coin[0].symbol)" alt="" width="60" />
    </div>
    <div v-for="(value, key) in coin">
      <div class="wrapper">
        <div class="amount">
          <p>Amount</p>
          {{value.amount}}
          {{value.symbol}}
        </div>
        <div class="value">
          <p>Value</p>
          {{value.value}}
        </div>
        <div class="purchasedate">
          <p>Purchase Date</p>
          {{value.purchasedate | formatDate}}
        </div>
        <div class="today">
          <p>Today ({{value.currency}})</p>
          {{value.price}}
        </div>
        <div class="yesterday">
          <p>Purchase date ({{value.currency}})</p>
          <div v-for="(value, key) in value">
            <div v-for="(value, key) in value.commitData" v-if="key==0">
              {{value.price}}
            </div>
          </div>
        </div>
        <div class="remove">
          <p>&nbsp;</p>
          <span @click="removeCrypto(value)"><b-icon icon="times"></b-icon></span>
        </div>
      </div>
      <!-- <hr> -->
    </div>
    <!-- <pre>{{coin}}</pre> -->
  </div>
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment';
  import {images} from '../helpers/coinIcons';
  export default {
    name: 'crypto-modal',
    props: {
      coin: Array
    },
    data() {
      return {
        variable: true
      }
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
      formatDate(value){
        return moment(String(value)).format('MMMM Do YYYY')
      }
    }
  }
</script>

<style lang="scss">
  .coin-logo {
    text-align: center;
    margin: 20px 0;
  }
  .wrapper > * {
    // grid-column: col-start / span 12;
  }
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr 1fr 1fr 1fr;
    padding: 20px;
    border-top: 2px solid whitesmoke;
    p {
      color: #19a0ff;
      font-weight: bold;
    }
    .remove {
      span {
        color: #DE4437;;
      }
    }
  }
</style>
