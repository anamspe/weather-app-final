function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#current-city");
  let countryElement = document.querySelector("#country");
  let minTempElement = document.querySelector("#min-temp");
  let maxTempElement = document.querySelector("#max-temp");
  let tempDescriptionElement = document.querySelector(".temp-description");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}º`;
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  minTempElement.innerHTML = `${Math.round(response.data.main.temp_min)}º`;
  maxTempElement.innerHTML = `${Math.round(response.data.main.temp_max)}º`;
  tempDescriptionElement.innerHTML = response.data.weather[0].description;
}

let apiKey = `6914b599dae34153d2187249330170b1`;
let city = `Vancouver`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
