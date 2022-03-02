const f = require("./ex2");
const R = require("ramda");

var numbers = [5, 2, 1, 5, 4, 2, 7, 9, 17, 6, 3, 2, 4, 8, 10, 5, 12, 13];
var isEven = (v) => v % 2 == 0;

console.log(
  R.compose(
    R.curryN(2, R.call)(f.addn),
    R.map(R.always),
    R.transduce(R.filter(isEven), unique, [])
  )(numbers)
);

function unique(arr, num) {
  return R.defaultTo([...arr])(
    R.cond([[R.compose(R.not, R.includes(R.__, arr)), R.append(R.__, arr)]])(
      num
    )
  );
}
