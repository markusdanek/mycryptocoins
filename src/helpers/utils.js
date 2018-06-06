import _ from 'lodash'
import moment from 'moment';

export function getJsonBody(body) {
  if (_.isString(body)) {
    try {
      return JSON.parse(body);
    } catch (err) {
      return body;
    }
  }
  return body;
}

export function lastWeekUnix(date) {
  var result = [];
  for (var i = 0; i < 7; i++) {
    if(date){
      var d = new Date(date);
    } else {
      var d = new Date();
    }
    d.setDate(d.getDate() - i);
    result.push(moment(d).unix());
  }
  return result;
}

export function lastWeek(date) {
  var result = [];
  for (var i = 0; i < 7; i++) {
    if(date){
      var d = new Date(date);
    } else {
      var d = new Date();
    }
    d.setDate(d.getDate() - i);
    result.push(moment(d).format());
  }
  return result;
}

export function lastMonthUnix(date) {
  var result = [];
  for (var i = 0; i < 31; i++) {
    if(date){
      var d = new Date(date);
    } else {
      var d = new Date();
    }
    d.setDate(d.getDate() - i);
    result.push(moment(d).unix());
  }
  return result;
}
