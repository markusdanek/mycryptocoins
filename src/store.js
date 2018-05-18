import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: []
  },

  mutations: {
    RECEIVE_PRICE(state, {crypto_prices}) {
      state.data = crypto_prices;
    }
  },

  actions: {
    async FETCH_PRICE({commit}, payload) {
      const url = `https://min-api.cryptocompare.com/data/price?fsym=${payload.symbol}&tsyms=${payload.currency}`;
      const {data} = await axios.get(url);
      console.log("action data", data);
      commit('RECEIVE_PRICE', {crypto_prices: data[payload.currency]});
    }
  },

  getters: {
    crypto_prices: state => {
      console.log("getters state", state);
      return {
        price: state.data
      };
      // return state.data.map(data => {
        // return {
          // name: data.name,
          // url: data.urls[1] ? data.urls[1].url : data.urls[0].url,
          // image: `${data.thumbnail.path}.${data.thumbnail.extension}`,
          // description: data.description === '' ? 'No description listed for this character.' : data.description
        // }
      // })
    }
  }
})
