"use strict";

function isPalindrome(str) {
  var strLength = str.length;
  if (strLength == 0 || strLength == 1) return true;
  var firstChar = str[0];
  var lastChar = str[strLength - 1];
  if (firstChar == lastChar) return isPalindrome(str.slice(1, strLength - 1));
  return false;
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
