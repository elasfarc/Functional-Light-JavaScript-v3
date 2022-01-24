function compose(...fns) {
  return function (v) {
    return fns.reduceRight(invoke, v);
    //*****/
    function invoke(v, fn) {
      return fn(v);
    }
  };
}
function getNumSeven() {
  return 7;
}
function getNumThirteen() {
  return 13;
}

function add(v1, v2) {
  return v1 + v2;
}

// console.log(add(getNumSeven(), getNumThreteen()));

function add2(fn2) {
  return function (fn1) {
    v1 = fn2();
    v2 = fn1();
    return add(v1, v2);
  };
}

//console.log(add2(getNumSeven, getNumThreteen));

/*
4. Replace your two functions from (1) with a single function that takes a value and returns a function back,
 where the returned function will return the value when it's called.

 */

function getValue(v) {
  return function () {
    return v;
  };
}

/*
5. Write an `addn(..)` that can take an array of 2 or more functions, and using only `add2(..)`,
 adds them together. Try it with a loop. Try it without a loop (recursion).
  Try it with built-in array functional helpers (hint: reduce).

*/

function addn(fnsArr) {
  if (fnsArr.length < 1) return;
  var getTotal = getValue(0);
  for (let fn of fnsArr) {
    getTotal = compose(getValue, add2(fn))(getTotal);
  }
  return getTotal();
}

x = addn([getNumSeven, getNumThirteen, getNumSeven]);
console.log(x);

function addnRecursion(fnsArr, total = 0) {
  if (fnsArr.length == 0) return total;
  getTotal = getValue(total);
  fn = fnsArr[0];
  total = add2(getTotal)(fn);
  return addnRecursion(fnsArr.slice(1), total);
}

y = addnRecursion([getNumSeven, getNumThirteen, getNumSeven]);
console.log(y);

z = [getNumSeven, getNumThirteen, getNumSeven].reduce((total, fn) => {
  getTotal = getValue(total);
  return add2(fn)(getTotal);
}, 0);

console.log(z);

/*
6. Start with an array of odd and even numbers (with some duplicates), and trim it down to only have unique values.
7. Filter your array to only have even numbers in it.
8. Map your values to functions, using (4), and pass the new list of functions to the `addn(..)` from (5).
*/
const mod = (v2) => (v1) => v1 % v2;
const eq = (v2) => (v1) => v1 === v2;
const isEven = compose(eq(0), mod(2));

var myList = [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 11];
myList = myList
  .reduce((uniqueValuesArr, num) => {
    uniqueValuesArr.includes(num) ? null : uniqueValuesArr.push(num);
    return uniqueValuesArr;
  }, [])
  .filter(isEven)
  .map(getValue);

console.log(addnRecursion(myList));
