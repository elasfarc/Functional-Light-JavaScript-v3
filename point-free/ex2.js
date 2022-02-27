"use strict";

var not =
  (fn) =>
  (...arg) =>
    !fn(...arg);

var when =
  (fn) =>
  (predicate) =>
  (...args) => {
    if (predicate(...args)) {
      fn(...args);
    }
  };

var isLongEnough = not(isShortEnough);
var output = console.log;
var printIf = when(output);

function isShortEnough(str) {
  return str.length <= 5;
}

var msg1 = "Hello";
var msg2 = msg1 + " World";

printIf(isShortEnough)(msg1); // Hello
printIf(isShortEnough)(msg2);
printIf(isLongEnough)(msg1);
printIf(isLongEnough)(msg2); // Hello World
