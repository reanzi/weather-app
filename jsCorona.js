
const fetch = require("node-fetch");
const api = "https://pomber.github.io/covid19/"
const DATA = api + 'timeseries.json'
const FLAGS = api + 'countries.json'

async function getData() {
    const res = await fetch(DATA)
    const data = await res.json()
    // console.log(data)
    return data
}

// get
const displayData = async  (key) => {
 const data = await getData()
// console.log(data)
 const countries = Object.keys(data);

//  console.log(countries)
 const aCountry = data[countries[countries.indexOf(key, 0)]];
//  const {date, confirmed, recovered, deaths} = 
 aCountry.sort((a,b) => {
    a = new Date(a.date),
     b = new Date(b.date);
     return b-a
 });
 const filtered = aCountry.filter(el => {
    //  const start = new Date('2020-4-25');
    //  const data = new Date(el.date)
    //  return data > start
     return el.confirmed != 0;
 })
// console.log(aCountry.date)

//  const {date, confirmed, recovered, deaths} = aCountry[aCountry.length - 1]
filtered.forEach(({date, confirmed, recovered, deaths}) => {
 console.log(key,date, confirmed, recovered, deaths)

})
}

// displayData('Tanzania')

const getFlags = async (country) => {
 const res = await fetch(FLAGS)
 const data  = await res.json()
 const countries = Object.keys(data)
 const flags = Object.values(data)
//  const result = countries.find(el => el.startsWith(country, 0))
 const results = countries.filter(el => el.startsWith(country, 0))
//  const flag = flags.result
//  const nation = flags[countries.indexOf(result, 0)]
results.forEach(el => {
    // console.log(flags.indexOf(el))
    console.log(el, flags[countries.indexOf(el, 0)])
})
}


getFlags('Ug')



