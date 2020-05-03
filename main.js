// const search = document.getElementById("search");
// const matchList = document.getElementById("match-list");
// const selectCountry = document.getElementById("card");
// const title = document.getElementsByTagName("h4");
const fs = require("fs");
let countries = [];

// Search the state.json and filter it
// const getCountry = async () => {
//   //   const res = await fetch("./statesOnly.json");
//   //   const res = await fetch("./states.json");
//   const res = await fetch("https://pomber.github.io/covid19/timeseries.json");
//   countries = await res.json()

//   countries[0].map((data, index) => {
//     console.log(index);
//   });
// };
const Testing = async () => {
  const res = await fetch("https://pomber.github.io/covid19/timeseries.json");
  const data = await res.json();
  const nchiZote = Object.keys(data);
  const nchi = data[nchiZote[0]];
  const { date, deaths, confirmed, recovered } = nchi[nchi.length - 1];
  // const date = "2020-4-20";
  // console.log(nchiZote[145]);
  nchiZote.map((country) => {
    const { deaths } = data[country].find((cases) => {
      console.log(country, cases);
      cases.deaths === date;
    });
    // console.log(country, date, deaths);
    return { country, deaths };
  });
  // return {
  //   nchi,
  //   // date,
  //   // deaths,
  //   // confirmed,
  //   // recovered,
  // };
};
// Testing();
Testing();
// console.log(results);
// fetch("https://pomber.github.io/covid19/timeseries.json")
//   .then((response) => response.json())
//   .then((data) => {
//     data["Argentina"].forEach(({ date, confirmed, recovered, deaths }) =>
//       console.log(`${date} active cases: ${confirmed - recovered - deaths}`)
//     );
//   });

// console.log(stats);
// if (countries.length > 0) {
// console.log(countries);
// }
//   FILTER
const searchStates = (searchText) => {
  // Get matches to the current typed input
  let matches = countries.filter((country) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return country.match(regex); //|| country.abbr.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }
  getCountryData(matches);
};

// const cloneData = () => {
//   const res = fetch("https://pomber.github.io/covid19/timeseries.json");
//   const data = res.json();
//   const coronaData = JSON.stringify(data, null, 2);
//   fs.writeFileSync("corona.json", coronaData);
//   console.log("done clonning");
// };

// cloneData();
const getCountryData = async (entries) => {
  if (entries.length > 0) {
    const response = await fetch(
      "https://pomber.github.io/covid19/timeseries.json"
    );
    const corona = await response.json();
    // console.log(corona);
    newArray = Object.values(corona);
    // console.log(newArray[]);
    entries.map((country, index) => {
      corona[country].forEach((data) => {
        outputHtml(entries, data);
      });
    });
    // outputHtml(entries, date, deaths, confirmed, recovered);
  }
};

const displayDetails = async (key) => {
  const res = await fetch("https://pomber.github.io/covid19/timeseries.json");
  const data = await res.json();
  // console.log(data);

  // const list = data[key]
  //   .map(({ date, confirmed, recovered, deaths }) => {
  //     return `<div class="card card-body mb-1" style="cursor: pointer;"  id="card">
  //     <small>${date} active cases: ${confirmed - recovered - deaths}</small>
  //   </div>`;
  //   })
  //   .join("");
  const list = data[key]
    // .map((array) => array.reverse())
    .map((info) => {
      return `<div class="card card-body mb-1">
    <h4>Deaths: ${info.deaths} <> Recovered: ${info.recovered} <> Confirmed: ${
        info.confirmed
      }</h4>
    <small>${info.date} active cases: ${
        info.confirmed - info.recovered - info.deaths
      }</small>
  </div>`;
    })
    .join("");

  matchList.innerHTML = list;
};

function custom_sort(a, b) {
  return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
}

// Show results to the screen
const outputHtml = (entries, { date, deaths, confirmed, recovered }) => {
  // const html = entries
  //   .map((el) => {
  //     // console.log(el);
  //     return `<div class="card card-body mb-1">
  // <h4>${el}</h4></div>`;
  //   })
  //   .join("");
  // console.log(html);
  const html = entries
    .map((el) => {
      return `
    <div class="card card-body mb-1" style="cursor: pointer;"  id="card">
      <h4>${el}</h4><small class="text-primary xs">Updated: ${date}</small>
    </div>
    `;
    })
    .join("");

  matchList.innerHTML = html;
};

// Events
// window.addEventListener("DOMContentLoaded", getCountry);
search.addEventListener("input", () => {
  // console.log("consolled");
  searchStates(search.value);
});
matchList.addEventListener("click", (e) => {
  displayDetails(e.target.innerHTML);
});
