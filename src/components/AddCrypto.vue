<template>
  <div class="container">
    <div class="field">
      <form @submit.prevent @submit="addCrypto()">
        <div class="columns">
          <div class="column">
            <div class="control">
              <b-field label="Symbol">
                <b-input autofocus id="crypto_symbol" placeholder="BTC" v-model="symbol" />
              </b-field>
            </div>
          </div>
          <div class="column">
            <div class="control">
              <b-field label="Amount">
                <b-input id="cryptoAmount" placeholder="0.05" v-model="amount" />
              </b-field>
            </div>
          </div>
          <div class="column">
            <div class="control">
              <b-field label="Currency">
                <b-input id="cryptoCurrency" placeholder="USD" v-model="currency" />
              </b-field>
            </div>
          </div>
          <div class="column">
            <div class="control">
              <b-field label="Purchase date">
                <b-datepicker
                  v-model="purchasedate"
                  placeholder="Date of purchase"
                  :first-day-of-week="1"
                />
              </b-field>
            </div>
          </div>
          <div class="column">
            <button class="button is-info" name="add">Add</button>
          </div>
        </div>
      </form>
    </div>
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
        purchasedate: new Date()
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
        this.$store.dispatch('FETCH_PRICE', payload);
      }
    },
    components: {
      Datepicker
    }
}
</script>

<style scoped lang="scss">
  .field {
    padding: 20px 0 40px 0;
  }
  button.button {
    margin-top: 50px;
  }
  // mobile
  @media only screen and (max-width: 768px) {
    .field {
      padding: 0;
    }
    button.button {
      margin-top: 0;
      margin-bottom: 25px;
    }
  }
</style>
