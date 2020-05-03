const fs = require("fs");
const fetch = require("node-fetch");
const rawData = require("./corona.json");

const cloneData = async () => {
  const res = await fetch("https://pomber.github.io/covid19/timeseries.json");
  const data = await res.json();
  //   console.log(data);
  const coronaData = JSON.stringify(data, null, 2);
  fs.writeFileSync("corona.json", coronaData, (err) => {
    if (err) throw err;
    console.log("Data writeen to a file");
  });
};
// const corona = Object.keys(rawData);
const corona = Object.values(rawData);
const cases = corona.map( (el) => {
    // console.log(el)
  return {
    date: el['date']
  };
});

console.log(cases)

let employees = [
    {name: 'John', salary: 90000, hireDate: "July 1, 2010"},
    {name: 'David', salary: 75000, hireDate: "August 15, 2009"},
    {name: 'Ana', salary: 80000, hireDate: "December 12, 2011"}
];

// employees.sort((x, y) =>  x.salary - y.salary)
// console.table(employees)

employees.sort((x, y) => {
    let a = new Date(x.hireDate),
    b = new Date(y.hireDate);
    
    return b-a
})
// console.table(employees)

let rivers = ['Nile', 'Amazon', 'Congo', 'Mississippi', 'Rio-Grande'];

rivers.sort(function (a, b) {
    // console.log(a, b);
    return a.length - b.length;
});

// temporary array holds objects with position
// and length of element
var lengths = rivers.map(function (e, i) {
    return {index: i, value: e.length };
});

// console.table(lengths)

// sorting the lengths array containing the lengths of
// river names
lengths.sort(function (a, b) {
    return +(a.value > b.value) || +(a.value === b.value) - 1;
});

// copy element back to the array
var sortedRivers = lengths.map(function (e) {
    return rivers[e.index];
});

// console.log(sortedRivers);