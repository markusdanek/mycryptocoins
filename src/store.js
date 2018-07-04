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
      return state.crypto.groupBy('symbol');
    },
    cryptoOverview: state =>{
      let groupedState = state.crypto.groupBy('symbol');
      let groupedStateNew = [];
      for (var key in groupedState) {
        if (groupedState.hasOwnProperty(key)) {
          let cryptoAmount = [];
          let cryptoValuePurchaseDate = [];
          let cryptoValueToday = [];
          let cryptoDiff = [];
          let cryptoDiffPercent = [];
          for (var i = 0; i < groupedState[key].length; i++) {
            // sum amount
            cryptoAmount.push(parseFloat(groupedState[key][i].amount));
            // value of purchase date
            let valuePurchaseDate = _.multiply(groupedState[key][i].historic.commitData[0].price, groupedState[key][i].amount);
            cryptoValuePurchaseDate.push(valuePurchaseDate);
            // value today (amount * price)
            cryptoValueToday.push(groupedState[key][i].value);
            // earning/loss
            let coinDiff = diff(groupedState[key][i].value, groupedState[key][i].historic.commitData[0].price);
            cryptoDiff.push(coinDiff);
            // earning/loss in percent
            let coinDiffPercent = diffPercent(groupedState[key][i].value, groupedState[key][i].historic.commitData[0].price);
            cryptoDiffPercent.push(coinDiffPercent);
          }
          let amountSum = _.sum(cryptoAmount); // sum amount
          let valuePD = _.round(_.sum(cryptoValuePurchaseDate), 2); // value of purchase date
          let valueToday = _.round(_.sum(cryptoValueToday), 2); // value today (amount * price)
          let valueDifference = _.round(_.sum(cryptoDiff), 2); // earning/loss
          let valueDifferencePercent = _.round(_.sum(cryptoDiffPercent), 2); // earning/loss in percent
          groupedStateNew.push({
            symbol: groupedState[key][0].symbol,
            amount: amountSum,
            valuePD: valuePD,
            valueToday: valueToday,
            delta: valueDifference,
            deltaPercent: valueDifferencePercent
          });
        }
      }
      return groupedStateNew;
    }
  }
})
