import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment';
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({

  plugins: [createPersistedState()],

  state: {
    data: [
      {symbol: '', price: ''}
    ]
  },

  mutations: {
    RECEIVE_PRICE(state, {symbol, price}) {
      state.data = {
        symbol: symbol,
        price: price
      }
      // state.data.push({
      //   symbol: symbol,
      //   price: price
      // });
    }
    // RECEIVE_HISTOPRICE(state, {crypto_prices}) {
    //   state.data = crypto_prices;
    // }
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
    // async FETCH_HISTOPRICE({commit}, payload) {
    //   let tsUnix = moment(payload.timestamp).unix();
    //   const url = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${payload.symbol}&tsyms=${payload.currency}&ts=${payload.tsUnix}`;
    //   const {data} = await axios.get(url);
    //   console.log("action data", data);
    //   commit('RECEIVE_HISTOPRICE', {
    //     crypto_histoprices: data[payload.symbol][payload.currency]
    //   });
    // }
  },

  getters: {
    crypto_prices: state => {
      console.log("getter state", state);
      return state;
      // return state.data.map(data => {
        // return {
          // name: data.name,
          // url: data.urls[1] ? data.urls[1].url : data.urls[0].url,
          // image: `${data.thumbnail.path}.${data.thumbnail.extension}`,
          // description: data.description === '' ? 'No description listed' : data.description
        // }
      // })
    }
  }
})
