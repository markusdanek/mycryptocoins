import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment';
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({

  plugins: [createPersistedState()],

  state: {
    currencies: [],
    histoCurrencies: []
  },

  mutations: {
    RECEIVE_PRICE(state, {symbol, price}) {
      const index = state.currencies.findIndex(d => d.symbol === symbol);
      if (index === -1) {
        state.currencies.push({symbol, price});
      } else {
        state.currencies[index] = {
          symbol,
          price
        };
      }
    }
  },

  actions: {
    async FETCH_PRICE({commit}, payload) {
      const url = `https://min-api.cryptocompare.com/data/price?fsym=${payload.symbol}&tsyms=${payload.currency}`;
      const {data} = await axios.get(url);
      commit('RECEIVE_PRICE', {
        symbol: payload.symbol,
        price: data[payload.currency]
      });
    }
  },

  getters: {
    getCurrencies: state => {
      return state;
    }
  }
})
