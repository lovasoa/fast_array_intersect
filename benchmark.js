const array_intersect = require('./lib/index.js').default;
const intersectionOf = require("intersection-of").intersectionOf;
const arrayIntersectionX = require("array-intersection-x").default;

var Benchmark = require('benchmark');

function make_input(arrays, elems, intersect) {
  return new Array(arrays)
    .fill()
    .map(_ =>
      new Array(elems)
      .fill()
      .map((_,j) =>
        j<intersect ? j : Math.random()))
}

let inputs = [
  [2, 100, 10],
  [10, 100, 99],
  [10, 100, 0],
  [1000, 10, 3],
  [10, 1000, 500]
];


inputs.forEach(([a,b,c]) => {
  let input = make_input(a,b,c);
  let name = `${a} arrays of ${b} elements, with an intersection of size ${c}`;
  new Benchmark.Suite(name)
    .add("array_intersect", () => array_intersect(input))
    .add("intersection-of", () => intersectionOf.apply(null, input))
    .add("array-intersection-x", () => arrayIntersectionX.apply(null, input))
    .on('start', function(event) {
      console.log(`\n${name}...`);
    })
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run();
});

