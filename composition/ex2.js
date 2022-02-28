"use strict";
var f1 = compose(increment, decrement);
var f2 = pipe(decrement, increment);
var f3 = compose(decrement, double, increment, half);
var f4 = pipe(half, increment, double, decrement);
var f5 = compose(increment);
var f6 = pipe(increment);

console.log(f1(3) === 3);
console.log(f1(3) === f2(3));
console.log(f3(3) === 4);
console.log(f3(3) === f4(3));
console.log(f5(3) === 4);
console.log(f5(3) === f6(3));

//***********************/
function increment(x) {
  return x + 1;
}
function decrement(x) {
  return x - 1;
}
function double(x) {
  return x * 2;
}
function half(x) {
  return x / 2;
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

function pipe(...fns) {
  return compose(unApply(compose), reverseArr)(fns);
  //return compose(unapply(compose), Array.prototype.reverse.bind(fns))(fns);
  //   return compose(unapply(compose))(fns.reverse());
  //   return compose(...fns.reverse());
}

function apply(fn) {
  return function (...args) {
    return fn(args);
  };
}
function unApply(fn) {
  return function (arr) {
    return fn(...arr);
  };
}
function reverseArr(arr) {
  return arr.reverse();
}
