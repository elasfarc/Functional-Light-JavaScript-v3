"use strict";

var output = console.log;
var printIf = when(output);
var isLongEnough = not(isShortEnough);

function when(fn) {
  return function (predicate) {
    return function (...arg) {
      if (predicate(...arg)) fn(...arg);
    };
  };
}

function not(cb) {
  return function negated(...args) {
    return !cb(...args);
  };
}
function isShortEnough(str) {
  return str.length <= 5;
}

var msg1 = "Hello";
var msg2 = msg1 + " World";

printIf(isShortEnough)(msg1); // Hello
printIf(isShortEnough)(msg2);
printIf(isLongEnough)(msg1);
printIf(isLongEnough)(msg2); // Hello World
