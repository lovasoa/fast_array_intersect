# fast_array_intersect

The fastest javascript array intersection function.
It takes arrays, and returns the elements that are common to all the arrays.
And it does that faster than any other published alternative I am aware of.

[![npm version](https://badgen.net/npm/v/fast_array_intersect)](https://www.npmjs.com/package/fast_array_intersect)
[![size](https://badgen.net/bundlephobia/minzip/fast_array_intersect)](https://bundlephobia.com/result?p=fast_array_intersect)
![CI status](https://github.com/lovasoa/fast_array_intersect/workflows/Node%20CI/badge.svg)
![Typed with TypeScript](https://badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)

## How to use

This module exports a single default function, with the following signature:

```js
intersect(arrays [, hash])
```

The arguments are :

\#| name     | optional? | type            | description
--|----------|-----------|-----------------|---------------------------
1 | `arrays` | required  | array of arrays | The arrays to intersect
2 | `hash`   | optional  | function        | A function that takes an element of one of the arrays and returns a value. The value should be the same for semantically identical values.

By default, the intersection is computed for values that are equal under [*SameValueZero*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).
You can use the optional hash function argument when you are intersecting arrays of javascript objects. You should then implement a function that returns the same primitive value when called with identical objects.

The order and references of result values are determined by the shortest of the input arrays.

### Examples

```js
import intersect from 'fast_array_intersection'

intersect([
  [1,2,3],
  [1,2,6]
]) // --> [1,2]

intersect([
  [{x:2}, {y:2}],
  [{x:1}, {x:2}]
], JSON.stringify) // --> [{x:2}]

intersect([
  [{id:0, excluded:"A"}, {id:1, excluded:"B"}],
  [{id:0, excluded:"C"}, {id:2, excluded:"C"}]
], x => x.id) // --> [{id:0, excluded:"A"}]
```

Without the ES6 import syntax, the function can be imported using : 
```js
var intersect = require("fast_array_intersect").default;
```

## Performance
`fast_array_intersect` is designed to be fast, and beats all other array intersection function I tested.

### Benchmark
Here is a comparison of **`fast_array_intersect`** with
[intersect](https://www.npmjs.com/package/intersect),
[intersection-of](https://www.npmjs.com/package/intersection-of) and
[array-intersection-x](https://www.npmjs.com/package/array-intersection-x):

```diff
2 arrays of 10 elements, with an intersection of size 5...
+ fast_array_intersect x 1,184,797 ops/sec ±0.37% (95 runs sampled)
intersect x 366,556 ops/sec ±0.42% (96 runs sampled)
intersection-of x 301,857 ops/sec ±0.32% (92 runs sampled)
array-intersection-x x 28,634 ops/sec ±0.37% (92 runs sampled)
+ Fastest is fast_array_intersect

2 arrays of 100 elements, with an intersection of size 10...
+ fast_array_intersect x 129,016 ops/sec ±0.34% (96 runs sampled)
intersect x 27,995 ops/sec ±0.29% (97 runs sampled)
intersection-of x 29,102 ops/sec ±0.33% (92 runs sampled)
array-intersection-x x 3,582 ops/sec ±0.19% (96 runs sampled)
+ Fastest is fast_array_intersect

10 arrays of 100 elements, with an intersection of size 99...
+ fast_array_intersect x 42,378 ops/sec ±0.26% (96 runs sampled)
intersect x 24,630 ops/sec ±0.32% (96 runs sampled)
intersection-of x 39,934 ops/sec ±0.28% (95 runs sampled)
array-intersection-x x 2,525 ops/sec ±0.22% (96 runs sampled)
+ Fastest is fast_array_intersect

10 arrays of 100 elements, with an intersection of size 0...
+ fast_array_intersect x 152,349 ops/sec ±0.41% (97 runs sampled)
intersect x 8,502 ops/sec ±0.40% (98 runs sampled)
intersection-of x 6,429 ops/sec ±0.15% (97 runs sampled)
array-intersection-x x 3,614 ops/sec ±0.35% (96 runs sampled)
+ Fastest is fast_array_intersect

1000 arrays of 10 elements, with an intersection of size 3...
+ fast_array_intersect x 3,804 ops/sec ±0.34% (95 runs sampled)
intersect x 416 ops/sec ±0.77% (87 runs sampled)
intersection-of x 812 ops/sec ±0.23% (94 runs sampled)
array-intersection-x x 2,701 ops/sec ±0.29% (95 runs sampled)
+ Fastest is fast_array_intersect

10 arrays of 1000 elements, with an intersection of size 500...
+ fast_array_intersect x 2,787 ops/sec ±0.29% (96 runs sampled)
intersect x 826 ops/sec ±0.71% (94 runs sampled)
intersection-of x 1,164 ops/sec ±0.17% (95 runs sampled)
array-intersection-x x 232 ops/sec ±0.27% (90 runs sampled)
+ Fastest is fast_array_intersect
```

For more details about the benchmark, see [`benchmark.js`](./benchmark.js).
