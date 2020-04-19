import "../sass/main.scss";
import { getData } from "./functions/function";
// import DOM from "./DOM/elements";

const prevWeatherToggle = document.querySelector(".show-previous-weather"),
  prevWeather = document.querySelector(".previous-weather");

prevWeatherToggle.addEventListener("click", () => {
  prevWeather.classList.toggle("show-weather");
});

// DOM Elements
const currentSolElement = document.querySelector("[data-current-sol]");
const currentDateElement = document.querySelector("[data-current-date]");
const currentTempHighElement = document.querySelector(
  "[data-current-temp-high]"
);
const currentTempLowElement = document.querySelector("[data-current-temp-low]");
const windSpeedElement = document.querySelector("[data-wind-speed]");
const windDirectionText = document.querySelector("[data-wind-direction-text]");
const windDirectionArrow = document.querySelector(
  "[data-wind-direction-arrow]"
);

// Previous Section
const previousSolTemplate = document.querySelector(
  "[data-previous-sol-template]"
);
const previousSolContainer = document.querySelector("[data-previous-sols]");

// Unit Toggle
const unitToggle = document.querySelector("[data-unit-toggle]"),
  metricRadio = document.getElementById("cel"),
  imperialRadio = document.getElementById("fah");

// Global variable
let selectedSolIndex;

getData().then((sols) => {
  selectedSolIndex = sols.length - 1;
  // console.log(sols);
  displaySelectedSol(sols);
  displayPreviousSols(sols);
  updateUnits();

  unitToggle.addEventListener("click", () => {
    let metricUnits = !isMetric();
    metricRadio.checked = metricUnits;
    imperialRadio.checked = !metricUnits;
    displaySelectedSol(sols);
    displayPreviousSols(sols);
    updateUnits();
  });

  metricRadio.addEventListener("change", () => {
    displaySelectedSol(sols);
    displayPreviousSols(sols);
    updateUnits();
  });
  imperialRadio.addEventListener("change", () => {
    displaySelectedSol(sols);
    displayPreviousSols(sols);
    updateUnits();
  });
});
function displaySelectedSol(sols) {
  const selectedSol = sols[selectedSolIndex];

  // console.log(selectedSol.windDirectionDegrees);
  currentSolElement.innerText = selectedSol.sol;
  currentDateElement.innerText = displayDate(selectedSol.date);
  currentTempHighElement.innerText = displayTemp(selectedSol.maxTemp);
  currentTempLowElement.innerText = displayTemp(selectedSol.minTemp);
  windSpeedElement.innerText = displaySpeed(selectedSol.windSpeed);
  windDirectionArrow.style.setProperty(
    "--direction",
    `${selectedSol.windDirectionDegrees}deg`
  );
  windDirectionText.innerText = selectedSol.windDirectionCardinal;
}

function displayDate(date) {
  return date.toLocaleDateString(undefined, { day: "numeric", month: "long" });
}

function displayTemp(temp) {
  let returnTemp = temp;
  if (!isMetric) {
    returnTemp = (temp - 32) * (5 / 9);
  }
  return Math.round(returnTemp);
}
function displaySpeed(speed) {
  let returnSpeed = speed;
  if (!isMetric) {
    returnSpeed = speed / 1.609;
  }
  return Math.round(returnSpeed);
}

function displayPreviousSols(sols) {
  previousSolContainer.innerHTML = "";
  sols.forEach((solData, index) => {
    const solContainer = previousSolTemplate.content.cloneNode(true);
    solContainer.querySelector("[data-sol]").innerText = solData.sol;
    solContainer.querySelector("[data-date]").innerText = displayDate(
      solData.date
    );
    solContainer.querySelector("[data-temp-high]").innerText = displayTemp(
      solData.maxTemp
    );
    solContainer.querySelector("[data-temp-low]").innerText = displayTemp(
      solData.minTemp
    );

    solContainer
      .querySelector("[data-select-button]")
      .addEventListener("click", () => {
        selectedSolIndex = index;
        displaySelectedSol(sols);
      });

    previousSolContainer.appendChild(solContainer);
  });
}

function updateUnits() {
  const speedUnits = document.querySelectorAll("[data-speed-unit]");
  const tempUnits = document.querySelectorAll("[data-temp-unit");
  speedUnits.forEach((unit) => {
    unit.innerText = isMetric() ? "kph" : "mph";
  });
  tempUnits.forEach((unit) => {
    unit.innerText = isMetric() ? "C" : "F";
  });
}

function isMetric() {
  return metricRadio.checked;
}

// // var d = new Date();
// var d = new Date("2020-5-15");
// const day = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
// // console.log(d.getMonth());
// // console.log(day);

// fetch("https://pomber.github.io/covid19/timeseries.json")
//   .then((response) => response.json())
//   .then((data) => {
//     // data["Tanzania"].forEach(({ date, confirmed, recovered, deaths }) =>
//     //   console.log(`${day} active cases: ${confirmed - recovered - deaths}`)
//     // );
//     data["Tanzania"].map((e) => {
//       if (e.date === day) {
//         return console.log(e);
//       }
//     });
//     // console.log(data);
//   });
