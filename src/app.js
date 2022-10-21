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

function formatDate(timestamp) {
  let time = new Date(timestamp);
  let sunHour = time.getHours();
  if (sunHour < 10) {
    sunHour = `0${sunHour}`;
  }
  let sunMinute = time.getMinutes();
  if (sunMinute < 10) {
    sunMinute = `0${sunMinute}`;
  }
  return `${sunHour}:${sunMinute}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-3 next-days">
        <div class="weather-date">${day}</div>
        <img
          src="images/01d.png"
          alt="Sun"
          width="45px"
          class="forecast-icon"
        />
        <div class="weather-forecast-temp">
          <span class="forecast-min"> 13º</span>
          <span class="forecast-max">19º</span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function displayTemperature(response) {
  // console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#current-city");
  let countryElement = document.querySelector("#country");
  let minTempElement = document.querySelector("#min-temp");
  let maxTempElement = document.querySelector("#max-temp");
  let tempDescriptionElement = document.querySelector(".temp-description");
  let windElement = document.querySelector(".wind-speed");
  let humidityElement = document.querySelector(".humidity");
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
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}`;
  humidityElement.innerHTML = response.data.main.humidity;
  let icon = response.data.weather[0].icon;
  iconElement.setAttribute("src", `images/${icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  sunriseElement.innerHTML = formatDate(response.data.sys.sunrise * 1000);
  sunsetElement.innerHTML = formatDate(response.data.sys.sunset * 1000);
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
displayForecast();

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
