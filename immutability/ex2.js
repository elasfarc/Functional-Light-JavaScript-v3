"use strict";
const R = require("ramda");

var luckyLotteryNumbers = [];

while (luckyLotteryNumbers.length < 6) {
  luckyLotteryNumbers = pickNumber(luckyLotteryNumbers, lotteryNum());
}

console.log(luckyLotteryNumbers);

///////////

function lotteryNum() {
  return (Math.round(Math.random() * 100) % 58) + 1;
}

function pickNumber(luckyLotteryNumbers, rndNum) {
  return R.defaultTo([...luckyLotteryNumbers])(
    R.cond([
      [
        R.compose(R.complement, R.includes(R.__, luckyLotteryNumbers)),
        R.compose(R.sort(sortASC), R.append(R.__, luckyLotteryNumbers)),
      ],
    ])(rndNum)
  );

  //***/
  function sortASC(v1, v2) {
    return v1 - v2;
  }
}

function when(fn) {
  return function (predicate) {
    return function (...args) {
      if (predicate(...args)) return fn(...args);
    };
  };
}
function not(fn) {
  return function (...args) {
    return !fn(...args);
  };
}
function compose(...fns) {
  return function composed(v) {
    return fns.reduceRight(composeReducer, v);
    //****/
    function composeReducer(result, fn) {
      return fn(result);
    }
  };
}

function curry(func) {
  var argsLength = func.length;
  var argsList = [];
  return function curried(...args) {
    argsLength -= args.length;
    argsList = [...argsList, ...args];
    return argsLength > 0 ? curried : func(...argsList);
  };
}
