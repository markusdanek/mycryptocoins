<template>
  <div>
    <form @submit.prevent @submit="addCrypto()">
      <input autofocus id="crypto_symbol" placeholder="BTC" v-model="symbol" />
      <input id="cryptoAmount" placeholder="1.5" v-model="amount" />
      <input id="cryptoCurrency" placeholder="USD" v-model="currency" />
      <datepicker v-model="purchasedate" name="Date" placeholder="Date of purchase"></datepicker>
      <button name="add">Add</button>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import {cryptostorage} from '../helpers/localStorage';
import {getPrice, getPriceForTimestamp} from '../api/crypto';

export default {
  name: 'add-crypto',
  data() {
      return {
        symbol: '',
        amount: '',
        currency: '',
        purchasedate: ''
      }
    },
    methods: {
      addCrypto() {
        const payload = {
          'symbol': this.symbol,
          'amount': this.amount,
          'currency': this.currency,
          'timestamp': this.purchasedate,
        };
        // this.$store.dispatch('FETCH_PRICE', payload);
        this.$store.dispatch('FETCH_HISTOPRICE', payload);
      }
    },
    components: {
      Datepicker
    }
}
</script>

<style scoped lang="scss">

</style>
