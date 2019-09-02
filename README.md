# array_intersect

The fastest javascript array intersection function.
It takes arrays, and returns the elements that are common to all the arrays.
And it does that faster than any other published alternative I am aware of.

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

### Examples

```es6
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
