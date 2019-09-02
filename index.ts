function default_hash<T>(x: T): any {
  return x;
}

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
  return arrays[0].filter(e => set.get(hash(e)) === arrays.length);
}
