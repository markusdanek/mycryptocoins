<template>
    <div class="field">
      <form @submit.prevent @submit="addCrypto()">
        <div class="columns">
          <div class="column">
            <div class="control">
              <b-input autofocus id="crypto_symbol" placeholder="BTC" v-model="symbol" />
            </div>
          </div>
          <div class="column">
            <div class="control">
              <b-input id="cryptoAmount" placeholder="1.5" v-model="amount" />
            </div>
          </div>
          <div class="column">
            <div class="control">
              <b-input id="cryptoCurrency" placeholder="USD" v-model="currency" />
            </div>
          </div>
          <div class="column">
            <div class="control">
              <b-datepicker
                v-model="purchasedate"
                name="Date"
                placeholder="Date of purchase"
                :first-day-of-week="1"
                />
            </div>
          </div>
          <div class="column">
            <button class="button is-info" name="add">Add</button>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

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
