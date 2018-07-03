import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment';
import _ from 'lodash'
import createPersistedState from "vuex-persistedstate";
import {lastWeek, lastWeekUnix, uid, diff, diffPercent} from '../src/helpers/utils';

Vue.use(Vuex);

export default new Vuex.Store({

  plugins: [createPersistedState()],

  state: {
    crypto: []
  },

  mutations: {
    RECEIVE_PRICE(state, {symbol, amount, currency, price, value, purchasedate, historic}) {
      let id = uid()
      state.crypto.push({id, symbol, amount, currency, price, value, purchasedate, historic});
    },
    RECEIVE_CURRENTPRICE(state, {crypto, data}) {
      state.crypto.forEach(item => {
        if(item.price !== data.price) {
          item.price = data;
          item.value = data * item.amount;
        }
      });
    },
    REMOVE_CRYPTO(state, {payload}) {
      state.crypto.splice(state.crypto.indexOf(payload), 1);
    }
  },

  actions: {
    async FETCH_PRICE({commit}, payload) {
      let requestData = [];
      let commitData = [];
      let tsWeekUnix = lastWeekUnix(payload.timestamp);
      let tsWeek = lastWeek(payload.timestamp);
      let coinValue;
      const url = `https://min-api.cryptocompare.com/data/price?fsym=${payload.symbol}&tsyms=${payload.currency}`;
      const {data} = await axios.get(url);
      let valueToday = data[payload.currency] * payload.amount;
      for (var i = 0; i < tsWeek.length; i++) {
        const url = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${payload.symbol}&tsyms=${payload.currency}&ts=${tsWeekUnix[i]}`;
        const {data} = await axios.get(url);
        requestData.push(data);
      }
      for (var i = 0; i < tsWeek.length; i++) {
        for (var i = 0; i < requestData.length; i++) {
          coinValue= _.multiply(requestData[i][payload.symbol][payload.currency], payload.amount);
          commitData.push({ts: tsWeek[i], price: requestData[i][payload.symbol][payload.currency], value: coinValue
          });
        }
      }
      commit('RECEIVE_PRICE', {
        symbol: payload.symbol,
        amount: payload.amount,
        currency: payload.currency,
        price: data[payload.currency],
        value: valueToday,
        purchasedate: payload.timestamp,
        historic: {
          commitData
        }
      });
    },
    async FETCH_CURRENT({ commit, state }, payload) {
      let crypto = [payload];
      for (var i = 0; i < crypto.length; i++) {
        const url = `https://min-api.cryptocompare.com/data/price?fsym=${crypto[i].symbol}&tsyms=${crypto[i].currency}`;
        const {data} = await axios.get(url);
        data = data[payload.currency];
        commit('RECEIVE_CURRENTPRICE', {crypto,data});
      }
    },
    async REMOVE_CRYPTO({commit}, payload) {
      commit('REMOVE_CRYPTO', {payload});
    }
  },

  getters: {
    getCoins: state => {
      return state.crypto;
    },
    groupBySymbol: state =>{
      let groupedState = state.crypto.groupBy('symbol');
      console.log(groupedState);
      let groupedStateNew = [];
      for (var key in groupedState) {
        if (groupedState.hasOwnProperty(key)) {

          let cryptoAmount = [];
          let cryptoValuePurchaseDate = [];
          let cryptoValueToday = [];
          let cryptoDiff = [];
          let cryptoDiffPercent = [];
          for (var i = 0; i < groupedState[key].length; i++) {
            cryptoAmount.push(parseFloat(groupedState[key][i].amount));

            let valuePurchaseDate = _.multiply(groupedState[key][i].historic.commitData[0].price, groupedState[key][i].amount);
            cryptoValuePurchaseDate.push(valuePurchaseDate);

            cryptoValueToday.push(groupedState[key][i].value);

            let coinDiff = diff(groupedState[key][i].value, groupedState[key][i].historic.commitData[0].price);
            cryptoDiff.push(coinDiff);

            let coinDiffPercent = diffPercent(groupedState[key][i].value, groupedState[key][i].historic.commitData[0].price);
            cryptoDiffPercent.push(coinDiffPercent);

          }
          // Crypto sum amount
          let amountSum = _.sum(cryptoAmount);
          // Crypto value of purchase date
          let valuePD = _.sum(cryptoValuePurchaseDate);
          valuePD = _.round(valuePD, 2);
          // Crypto value today (amount * price)
          let valueToday = _.sum(cryptoValueToday);
          valueToday = _.round(valueToday, 2);
          // Crypto earning/loss
          let valueDifference = _.sum(cryptoDiff);
          valueDifference = _.round(valueDifference, 2);
          // Crypto earning/loss in percent
          let valueDifferencePercent = _.sum(cryptoDiffPercent);
          valueDifferencePercent = _.round(valueDifferencePercent, 2);

          groupedStateNew.push({
            symbol: 'TODO',
            amount: amountSum,
            valuePD: valuePD,
            valueToday: valueToday,
            delta: valueDifference,
            deltaPercent: valueDifferencePercent
          });
          console.log("groupedStateNew", groupedStateNew);
        }
      }
      return groupedStateNew;
    }
  }
})
