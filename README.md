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
import intersect from 'fast_array_intersect'

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

```
2 arrays of 10 elements, with an intersection of size 5...
fast_array_intersect x 1,064,622 ops/sec ±0.55% (92 runs sampled)
intersect x 360,324 ops/sec ±0.46% (95 runs sampled)
intersection-of x 303,913 ops/sec ±0.35% (97 runs sampled)
array-intersection-x x 28,616 ops/sec ±0.20% (94 runs sampled)
Fastest is fast_array_intersect

2 arrays of 100 elements, with an intersection of size 10...
fast_array_intersect x 104,023 ops/sec ±0.30% (92 runs sampled)
intersect x 28,178 ops/sec ±0.38% (96 runs sampled)
intersection-of x 30,345 ops/sec ±0.21% (94 runs sampled)
array-intersection-x x 3,667 ops/sec ±0.32% (97 runs sampled)
Fastest is fast_array_intersect

10 arrays of 100 elements, with an intersection of size 99...
fast_array_intersect x 41,212 ops/sec ±0.39% (92 runs sampled)
intersect x 24,863 ops/sec ±0.36% (93 runs sampled)
intersection-of x 40,573 ops/sec ±0.17% (96 runs sampled)
array-intersection-x x 2,504 ops/sec ±0.14% (98 runs sampled)
Fastest is fast_array_intersect

10 arrays of 100 elements, with an intersection of size 0...
fast_array_intersect x 156,244 ops/sec ±0.38% (95 runs sampled)
intersect x 9,125 ops/sec ±0.29% (95 runs sampled)
intersection-of x 6,426 ops/sec ±0.24% (97 runs sampled)
array-intersection-x x 3,695 ops/sec ±0.31% (96 runs sampled)
Fastest is fast_array_intersect

1000 arrays of 10 elements, with an intersection of size 3...
fast_array_intersect x 4,260 ops/sec ±0.29% (96 runs sampled)
intersect x 438 ops/sec ±0.81% (92 runs sampled)
intersection-of x 835 ops/sec ±0.17% (94 runs sampled)
array-intersection-x x 2,672 ops/sec ±0.60% (95 runs sampled)
Fastest is fast_array_intersect

10 arrays of 1000 elements, with an intersection of size 500...
fast_array_intersect x 2,701 ops/sec ±0.13% (97 runs sampled)
intersect x 842 ops/sec ±0.63% (94 runs sampled)
intersection-of x 1,193 ops/sec ±0.17% (96 runs sampled)
array-intersection-x x 234 ops/sec ±0.33% (91 runs sampled)
Fastest is fast_array_intersect
```

For more details about the benchmark, see [`benchmark.js`](./benchmark.js).
