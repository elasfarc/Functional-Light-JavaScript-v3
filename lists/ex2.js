const R = require("ramda");

console.log(addn([always(5), always(7), always(12), always(6), always(5)]));
console.log(addn([always(5), always(7), always(12)]));

// #6, #7 && #8
var numbers = [5, 2, 1, 5, 4, 2, 7, 9, 17, 6, 3, 2, 4, 8, 10, 5, 12, 13];
console.log(
  R.compose(
    R.curryN(2, R.call)(addn),
    R.map(R.always),
    R.reduce(uniqueEvenNums, [])
  )(numbers)
);

//****/
function uniqueEvenNums(arr, num) {
  return R.defaultTo([...arr])(
    R.cond([
      [
        R.both(
          R.compose(R.equals(0), R.modulo(R.__, 2)),
          R.compose(R.not, R.includes(R.__, arr))
        ),
        R.append(R.__, arr),
      ],
    ])(num)
  );
}
function addn(fns, cont = R.identity) {
  fns = [...fns];
  var [f1, f2] = fns;
  return R.ifElse(
    R.compose(R.lte(R.__, 2), R.length),
    R.apply(add2),
    R.compose(
      addn,
      R.append(R.always(add2(f1, f2))),
      R.takeLast(R.__, fns),
      R.subtract(R.__, 2),
      R.length
    )
  )(fns);
}

function addn(fns) {
  return R.compose(R.call, R.bind(fns.reduce, fns))(reducer);
  //***/
  function reducer(resultFn, fn) {
    return () => add2(resultFn, fn);
  }
}

function addn(fns) {
  fns = [...fns];
  while (fns.length > 2) {
    let [f1, f2, ...rest] = fns;
    fns = [() => add2(f1, f2), ...rest];
  }
  return add2(fns[0], fns[1]);
}

function always(v) {
  return function () {
    return v;
  };
}

function add(y) {
  return function forX(x) {
    return x + y;
  };
}

function add2(f2, f1) {
  return add(f2())(f1());
}
