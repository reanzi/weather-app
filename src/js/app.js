import "../sass/main.scss";

const prevWeatherToggle = document.querySelector(".show-previous-weather"),
  prevWeather = document.querySelector(".previous-weather");

prevWeatherToggle.addEventListener("click", () => {
  prevWeather.classList.toggle("show-weather");
});
