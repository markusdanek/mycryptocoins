<template>
  <div class="container">
    <div class="field">
      <form @submit.prevent @submit="addCrypto()">
        <div class="columns">
          <div class="column">
            <div class="control">
              <b-field label="Symbol">
                <autocomplete autofocus :source="getCryptoName" :maxlength="10" inputClass="symbolAutocomplete" @selected="addSymbolToModel" results-display="name" placeholder="BTC"></autocomplete>
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
                <autocomplete :source="currencyList" :maxlength="10" inputClass="symbolAutocomplete" @selected="addCurrencyToModel" results-display="name" placeholder="USD"></autocomplete>
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
import {mapGetters} from 'vuex';
import Autocomplete from 'vuejs-auto-complete';

export default {
  name: 'add-crypto',
  data() {
      return {
        symbol: '',
        amount: '',
        currency: '',
        purchasedate: new Date(),
        currencyList: [{id: 1, name:'USD'}, {id: 2, name:'EUR'}, {id: 3, name:'GBP'}, {id: 4, name:'JPY'}, {id: 5, name:'CNY'}, {id: 6, name:'KRW'}]
      }
  },
  computed: {
    ...mapGetters(['getCryptoName'])
  },
  mounted() {
    this.$store.dispatch('FETCH_CRYPTONAME');
  },
  methods: {
    addSymbolToModel(input) {
      this.symbol = input.display;
    },
    addCurrencyToModel(input) {
      this.currency = input.display;
    },
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
    Datepicker, Autocomplete
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
