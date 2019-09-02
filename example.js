const intersect = require("fast_array_intersect").default;

const nice_people = [
  {first_name:"John", family_name: "Doe"},
  {first_name:"Jane", family_name: "Doe"},
];

const neighbors = [
  {first_name:"John", family_name: "Doe"},
  {first_name:"Oliver", family_name: "Twist"},
];

function person_hash(person) {
  return person.first_name + " " + person.family_name;
}

const nice_neighbors = intersect([nice_people, neighbors], person_hash);

nice_neighbors
