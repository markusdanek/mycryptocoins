import _ from 'lodash'
import moment from 'moment';

/**
 * getJsonBody - description
 *
 * @param  {string} body
 * @return {string} body
 */
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

/**
 * lastWeekUnix - Return last seven days of 'date' as Unix timestamp
 *
 * @param  {date} date
 * @return {date} result
 */
export function lastWeekUnix(date) {
  var result = [];
  for (var i = 0; i < 7; i++) {
    if (date) {
      var d = new Date(date);
    } else {
      var d = new Date();
    }
    d.setDate(d.getDate() - i);
    result.push(moment(d).unix());
  }
  return result;
}

/**
 * lastWeek - Return last seven days of 'date' as timestamp
 *
 * @param  {date} date
 * @return {date} result
 */
export function lastWeek(date) {
  var result = [];
  for (var i = 0; i < 7; i++) {
    if (date) {
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
    if (date) {
      var d = new Date(date);
    } else {
      var d = new Date();
    }
    d.setDate(d.getDate() - i);
    result.push(moment(d).unix());
  }
  return result;
}

/**
 * Array.prototype.groupBy - Return Array grouped based on same item prop
 *
 * @param  {array} prop
 * @return {array} groups
 */
Array.prototype.groupBy = function(prop) {
  return this.reduce(function(groups, item) {
    var val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
}

/**
 * uid - Generate and return UUID
 *
 * @return {uuid}
 */
export function uid() {
  return '_' + Math.random().toString(36).substr(2, 9);
}


/**
 * diff - description
 *
 * @param  {float} a
 * @param  {float} b
 * @return {float}
 */
export function diff(a, b){
  return a - b;
}

/**
 * diffPercent - description
 *
 * @param  {float} a
 * @param  {float} b
 * @return {integer}
 */
export function diffPercent(a, b) {
  var avg = (a + b) / 2;
  var diff = a - b;
  return (diff / avg) * 100;
}
