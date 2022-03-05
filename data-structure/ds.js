"use strict";
const R = require("ramda");

// inception!
curry = curry(2, curry);

var nums = {
  first: [3, 5, 2, 4, 9, 1, 12, 3],
  second: [5, 7, 7, 9, 10, 4, 2],
  third: [1, 1, 3, 2],
};

// var filteredNums = filterObj(R.compose(isOdd, listSum), nums);

// var filteredNumsProducts = mapObj(listProduct, filteredNums);

// console.log(reduceObj(sum, 0, filteredNumsProducts));
// 38886

// console.log(
//   R.compose(
//     R.curryN(3, reduceObj)(sum, 0),
//     R.curryN(2, mapObj)(listProduct),
//     R.curryN(2, filterObj)(R.compose(isOdd, listSum))
//   )(nums)
// );
console.log(
  R.reduce(R.binary(R.compose), R.identity, [
    R.curryN(3, reduceObj)(sum, 0),
    R.curryN(2, mapObj)(listProduct),
    R.curryN(2, filterObj)(R.compose(isOdd, listSum)),
  ])(nums)
);

// ************************************

function mapObj(mapperFn, o) {
  var newObj = {};
  var keys = Object.keys(o);
  for (let key of keys) {
    newObj[key] = mapperFn(o[key]);
  }
  return newObj;
}

function filterObj(predicateFn, o) {
  return R.compose(R.reduce(setObjPairOnPred, {}), R.toPairs)(o);
  //****/
  function setObjPairOnPred(obj, [key, value]) {
    return R.defaultTo(obj)(
      R.cond([[predicateFn, R.assoc(key, R.__, obj)]])(value)
    );
  }
}
// reduceObj (iterative)
function reduceObj(reducer, init, o) {
  var acc = init;
  for (let key in o) {
    acc = reducer(acc, o[key]);
  }
  return acc;
}

//reduceObj (recursive)
function reduceObj(reducer, init, o) {
  return R.compose(R.curryN(3, bigFn)(reducer, R.always(init)), R.values)(o);
}

//naive
function bigFn(fn, accFn, [v1, ...rest]) {
  if (rest.length == 0) return fn(accFn(), v1);
  return bigFn(
    fn,
    function f() {
      return fn(accFn(), v1);
    },
    rest
  );
}
// using Ramda
function bigFn(fn, accFn, [v1, ...rest]) {
  var callFnWith = R.compose(R.curryN(2, fn)(R.__, v1), R.call);
  return R.defaultTo(callFnWith(accFn))(
    R.cond([
      [
        R.gt(R.__, 0),
        R.curryN(4, R.call)(bigFn, fn, R.always(R.call(fn, accFn(), v1))),
      ],
    ])(rest)
  );
}

// ************************************

function curry(arity, fn) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      var args = prevArgs.concat([nextArg]);
      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}
function compose(...fns) {
  return function composed(arg) {
    return fns.reduceRight((result, fn) => fn(result), arg);
  };
}
function pipe(...fns) {
  return compose(...fns.reverse());
}
function binary(fn) {
  return function two(arg1, arg2) {
    return fn(arg1, arg2);
  };
}

// ************************************

function isOdd(v) {
  return v % 2 == 1;
}
function sum(x, y) {
  return x + y;
}
function mult(x, y) {
  return x * y;
}
function listSum(list) {
  return list.reduce(sum, 0);
}
function listProduct(list) {
  return list.reduce(mult, 1);
}
