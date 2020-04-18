import "../sass/main.scss";

const prevWeatherToggle = document.querySelector(".show-previous-weather"),
  prevWeather = document.querySelector(".previous-weather");

prevWeatherToggle.addEventListener("click", () => {
  prevWeather.classList.toggle("show-weather");
});

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
