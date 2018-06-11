import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment';
import createPersistedState from "vuex-persistedstate";
import {lastWeek, lastWeekUnix} from '../src/helpers/utils';

Vue.use(Vuex);

export default new Vuex.Store({

  plugins: [createPersistedState()],

  state: {
    crypto: []
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
    },
    RECEIVE_HISTOPRICE(state, {symbol, amount, purchasedate, historic}) {
      state.crypto.push({symbol, amount, purchasedate, historic});
    },
    REMOVE_CRYPTO(state, {payload}) {
      state.crypto.splice(state.crypto.indexOf(payload), 1);
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
    },
    async FETCH_HISTOPRICE({commit}, payload) {
      let requestData = [];
      let commitData = [];
      let tsWeekUnix = lastWeekUnix(payload.timestamp);
      let tsWeek = lastWeek(payload.timestamp);
      let coinValue;
      for (var i = 0; i < tsWeek.length; i++) {
        const url = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${payload.symbol}&tsyms=${payload.currency}&ts=${tsWeekUnix[i]}`;
        const {data} = await axios.get(url);
        requestData.push(data);
      }
      for (var i = 0; i < tsWeek.length; i++) {
        for (var i = 0; i < requestData.length; i++) {
          coinValue = requestData[i][payload.symbol][payload.currency] * payload.amount;
          commitData.push({ts: tsWeek[i], price: requestData[i][payload.symbol][payload.currency], value: coinValue
          });
        }
      }
      commit('RECEIVE_HISTOPRICE', {
        symbol: payload.symbol,
        amount: payload.amount,
        purchasedate: payload.timestamp,
        historic: {
          commitData
        }
      });
    },
    async REMOVE_CRYPTO({commit}, payload) {
      commit('REMOVE_CRYPTO', {payload});
    },
  },

  getters: {
    getCoins: state => {
      return state.crypto;
    }
  }
})
