<template>
  <div>
    <pre>
      AddCrypto:
      {{ $data }}
    </pre>
    <form @submit.prevent="addCrypto()">
      <input autofocus id="crypto_symbol" placeholder="BTC" v-model="symbol" />
      <input id="cryptoAmount" placeholder="1.5" v-model="amount" />
      <input id="cryptoCurrency" placeholder="USD" v-model="currency" />
      <datepicker v-model="purchasedate" name="Date" placeholder="Date of purchase"></datepicker>
      <button name="addCrypto" @click="addCrypto">Add</button>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import {cryptostorage} from '../helpers/localStorage';
import {getPrice, getPriceForTimestamp} from '../api/crypto';

export default {
  name: 'AddCrypto',
  data() {
      return {
        cryptos: cryptostorage.fetch(),
        symbol: '',
        amount: '',
        currency: '',
        purchasedate: ''
      }
    },
    watch: {
      cryptos: {
        handler(cryptos) {
          cryptostorage.save(cryptos)
        },
        deep: true
      }
    },
    methods: {
      addCrypto() {
        const payload = {'symbol': this.symbol, 'currency': this.currency};
        this.$store.dispatch('FETCH_PRICE', payload);
      }
    },
    components: {
      Datepicker
    }
}
</script>

<style scoped lang="scss">

</style>
