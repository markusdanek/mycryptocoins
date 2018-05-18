import Vue from 'vue';
import {getJsonBody} from '../helpers/utils';
import moment from 'moment';

const ccUrl = 'https://min-api.cryptocompare.com/data'

export function getPrice(crypto, currency) {
  return new Promise((resolve, reject) => {
    Vue.http.get(ccUrl + '/price', {
      params: {
        fsym: crypto,
        tsyms: currency
      }
    }).then((result) => {
      resolve(getJsonBody(result.body[currency]));
    }).catch((err) => {
      reject(err);
    });
  });
}

// Vue.axios.get(api).then((response) => {
//   console.log(response.data)
// })

export function getPriceForTimestamp(crypto, timestamp, currency) {
  let timestampUnix = moment(timestamp).unix();
  return new Promise((resolve, reject) => {
    Vue.http.get(ccUrl + '/pricehistorical', {
      params: {
        fsym: crypto,
        ts: timestampUnix,
        tsyms: currency
      }
    }).then((result) => {
      resolve(JSON.parse(result.body[crypto][currency]));
    }).catch((err) => {
      reject(err);
    });
  });
}
