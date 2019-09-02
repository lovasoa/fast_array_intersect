function default_hash<T>(x: T): any {
  return x;
}

 /**
  * Takes an array of arrays and optionnally a hash function,
  * and returns the elements that are present in all the arrays.
  * When intersecting arrays of objects, you should use a custom
  * hash function that returns identical values when given objects
  * that should be considered equal in your application.
  * The default hash function is the identity function.
  * When performance is not critical, a handy hash function can be `JSON.stringify`.
  */
export default function intersect<T>(arrays: T[][], hash=default_hash): T[] {
  if (arrays.length === 0) return [];

  // Put the smallest array in the beginning
  for (let i=1; i<arrays.length; i++) {
    if(arrays[i].length < arrays[0].length) {
      let tmp = arrays[0];
      arrays[0] = arrays[i];
      arrays[i] = tmp;
    }
  }

  // Create a map associating each element to its current count
  const set = new Map();
  for(const elem of arrays[0]) {
    set.set(hash(elem), 1);
  }
  for (let i=1; i<arrays.length; i++) {
    let found = 0;
    for(const elem of arrays[i]) {
      const hashed = hash(elem);
      const count = set.get(hashed)
      if (count === i) {
        set.set(hashed,  count + 1);
        found++;
      }
    }
    // Stop early if an array has no element in common with the smallest
    if (found === 0) return []; 
  }

  // Output only the elements that have been seen as many times as there are arrays
  return arrays[0].filter(e => {
    const hashed = hash(e);
    const count = set.get(hashed);
    if (count !== undefined) set.set(hashed, 0);
    return count === arrays.length
  });
}
