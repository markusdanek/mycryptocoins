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
          <p>Portfolio today</p>
          {{value.value}} {{value.currency}}
        </div>
        <div class="today">
          <p>Price today</p>
          {{value.price}} {{value.currency}}
        </div>
        <div class="yesterday">
          <p>Purchase price</p>
          <div v-for="(value, key) in value">
            <div v-for="(value, key) in value.commitData" v-if="key==0">
              {{value.price}}
            </div>
          </div>
        </div>
        <div class="purchasedate">
          <p>Purchase date</p>
          {{value.purchasedate | formatDate}}
        </div>
        <div class="remove">
          <p>&nbsp;</p>
          <span @click="removeCrypto(value)"><b-icon icon="times"></b-icon></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment';
  import {images} from '../helpers/coinIcons';
  import {mapGetters} from 'vuex';
  export default {
    name: 'crypto-modal',
    props: {
      coin: Array
    },
    computed: {
      ...mapGetters(['getCryptoImage'])
    },
    data() {
      return {
        variable: true
      }
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
        if (this.coin.length < 2) {
          this.$modal.hide('crypto-details');
        }
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
