"use strict";

function lotteryNum() {
  return (Math.round(Math.random() * 100) % 58) + 1;
}

function pickNumber(rndNum, arr) {
  var RandomNumbers = [...new Set([...arr, rndNum])];
  var ascRandomNums = RandomNumbers.sort(sortAsc);
  return ascRandomNums;

  //*****/
  function sortAsc(v1, v2) {
    return v1 - v2;
  }
}

var luckyLotteryNumbers = [];

while (luckyLotteryNumbers.length < 6) {
  let rndNum = lotteryNum();
  luckyLotteryNumbers = pickNumber(rndNum, Object.freeze(luckyLotteryNumbers));
}

console.log(luckyLotteryNumbers);
