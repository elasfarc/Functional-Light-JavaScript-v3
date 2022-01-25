function add(n1, n2) {
  return n1 + n2;
}

function add2(f1, f2) {
  return add(f1(), f2());
}

function constant(v) {
  return function () {
    return v;
  };
}
/*
addn (iteration)

function addn(arr) {
  arr = [...arr];
  while (arr.length > 2) {
    let [f1, f2, ...rest] = arr;
    arr = [() => add2(f1, f2), ...rest];
  }
  return add2(arr[0], arr[1]);
}
*/

/*
 addn (Recursion)

function addn([f1, f2, ...rest]) {
  if (rest.length == 0) return add2(f1, f2);
  return addn([() => add2(f1, f2), ...rest]);
}
*/

// addn (reduce)
function addn(arr) {
  return arr.reduce(function reducer(composedFn, fn) {
    return function () {
      return add2(composedFn, fn);
    };
  })();
}

var sum = addn([
  constant(5),
  constant(5),
  constant(5),
  constant(5),
  constant(5),
  constant(5),
]);
console.log(sum);
