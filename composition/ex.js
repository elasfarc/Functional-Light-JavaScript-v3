"use strict";

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

// function compose(...args) {
//   return function composeFactory(v) {
//     var result = v;
//     for (let fn of args.reverse()) {
//       result = fn(result);
//     }
//     return result;
//   };
// }
function compose(...args) {
  return function composeFactory(v) {
    return [...args].reverse().reduce((result, fn) => {
      return fn(result);
    }, v);
  };
}

// function pipe(...args) {
//   return function pipeFactory(v) {
//     return args.reduce((result, fn) => {
//       return fn(result);
//     }, v);
//   };
// }

function pipe(...args) {
  return compose(...args.reverse());
}

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
