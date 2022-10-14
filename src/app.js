// Time data

let today = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[today.getDay()];
let hours = today.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = `${hours}:${minutes}`;
let currentDayTime = document.querySelector("#day-and-time");
currentDayTime.innerHTML = `${day} | ${time}`;

// Main Temperature Data and Home Button

function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#current-city");
  let countryElement = document.querySelector("#country");
  let minTempElement = document.querySelector("#min-temp");
  let maxTempElement = document.querySelector("#max-temp");
  let tempDescriptionElement = document.querySelector(".temp-description");
  let iconElement = document.querySelector(".main-temp-img");
  let sunriseElement = document.querySelector("#sunrise-time");
  let sunsetElement = document.querySelector("#sunset-time");

  celsiusTemp = response.data.main.temp;

  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}º`;
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  minTempElement.innerHTML = `${Math.round(response.data.main.temp_min)}º`;
  maxTempElement.innerHTML = `${Math.round(response.data.main.temp_max)}º`;
  tempDescriptionElement.innerHTML = response.data.weather[0].description;
  let icon = response.data.weather[0].icon;
  iconElement.setAttribute("src", `images/${icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  sunriseElement.innerHTML = response.data.sys.sunrise;
  sunsetElement.innerHTML = response.data.sys.sunset;
}

function search(city) {
  let apiKey = `6914b599dae34153d2187249330170b1`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-form-container");
  search(searchCity.value);
}

search(`Vancouver`);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

function showCurrentTemp(response) {
  // console.log(response);
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
  let units = `metric`;
  let apiKey = `6914b599dae34153d2187249330170b1`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentTemp);
}

let homeButton = document.querySelector("#home");
homeButton.addEventListener("click", getCurrentPosition);

// Celsius and Fahrenheit conversion

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemp)}º`;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = `${Math.round(celsiusTemp)}º`;
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-temp");
celsiusLink.addEventListener("click", showCelsiusTemp);
