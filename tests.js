const assert = require('assert');
const array_intersect = require('./lib/index.js').default;

var tests = [
  {"input": [],
   "output": []},

  {"input": [[1,2,3]],
   "output": [1,2,3]},

  {"input": [[1,2,3],[4,5,6]],
   "output": []},

  {"input": [[1,2,3],[2,3,4,5,6]],
   "output": [2,3]},

  {"input": [[1,1,1],[1,1],[1,1,1,1]],
   "output": [1]},

  {"input": [[1,2,3],[2,3,4,5,6],[0,1,2]],
   "output": [2]},

  {"input": [[4,0,9,1,0],[4,0,9],[4,9,1]],
   "output": [4,9]},

  {"input": [[1,2,3],[2,3,4,5,6],[0,1,2,3]],
   "output": [2,3]},

  {"input": [[1,2,3],[2,3,4,5,6],[0,1,2],["a","b","c"]],
   "output": []},

  {"input": [[+0,0,-0],[-0],[0],[1/0,0/0,0]],
   "output": [0]},

  {"input": [[null,0,undefined,"",0],["",null,0,undefined],[null,undefined,{},[]]],
   "output": [null, undefined]},

  {"input": [["null", "undefined"],[null,undefined]],
   "output": []},

  {"input": [[{different_obj:1}],[{different_obj:1}]], // No deep object comparison
   "output": []},

  {"input": (x => [[x,1],[x,2]])({same_obj:1}), // same-reference objects are the same
   "output": [{same_obj:1}]},

  {"input": [[{different_obj:1},0],[{different_obj:1},1]],
   "output": [{different_obj: 1}],
   "hash": JSON.stringify},

  {"input": [[{id:1,b:2},{id:1},{id:2}],[{id:1,c:3}],[{id:1,d:0}]],
   "output": [{id:1,c:3}],
   "hash": o => o.id},
];

for(const {input, output, hash} of tests) {
  console.log("Testing ", input, hash ? "with " + hash : "");
  assert.deepEqual(array_intersect(input, hash), output);
}
