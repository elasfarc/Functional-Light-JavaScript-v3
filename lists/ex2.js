const R = require("ramda");

// console.log(add2(R.always(5), R.always(7)));
//console.log(add2(always(5), always(7)));
console.log(addn([always(5), always(7), always(12), always(6), always(5)]));
console.log(addn([always(5), always(7), always(12)]));

//****/
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
  //console.log("______", f2(), f1());
  return add(f2())(f1());
}
