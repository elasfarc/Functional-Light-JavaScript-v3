"use strict";
const R = require("ramda");

function isPalindrome(str) {
  var isFirstEqLast = (str) => R.equals(R.head(str))(R.last(str));
  return R.defaultTo(false)(
    R.cond([
      [R.either(R.isEmpty, R.compose(R.equals(1), R.length)), R.T],
      [isFirstEqLast, R.compose(isPalindrome, R.compose(R.init, R.tail))],
    ])(str)
  );
}

console.log(isPalindrome("") === true);
console.log(isPalindrome("a") === true);
console.log(isPalindrome("aa") === true);
console.log(isPalindrome("aba") === true);
console.log(isPalindrome("abba") === true);
console.log(isPalindrome("abccba") === true);

console.log(isPalindrome("ab") === false);
console.log(isPalindrome("abc") === false);
console.log(isPalindrome("abca") === false);
console.log(isPalindrome("abcdba") === false);
