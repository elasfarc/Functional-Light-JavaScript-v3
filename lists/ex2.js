const R = require("ramda");

const always = (v) => () => v;

function add(y) {
  return function forX(x) {
    return x + y;
  };
}

function add2(f2, f1) {
  return add(f2())(f1());
}

console.log(add2(always(5), always(7)));
