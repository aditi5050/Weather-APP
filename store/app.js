function findDay(timestamp){
  let now = new Date(timestamp * 1000);
  let dayName = now.getDay();
  days = ["Sun","Mon","Tue","Wed","Thru","Fri","Sat"];
  return`${days[dayName]}`;
  
}
function getForecast(response) {
  let forecastElement = document.querySelector("#forecast-description");
  console.log(response.data.daily);
  let forecastDay = response.data.daily;
  
  let forecastHTML = `<div class="row">`;
  forecastDay.forEach(function(forecast, index){
    
    if(index<6)
    {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
    <div id="forecast-day">${findDay(forecast.dt)}</div>
    <div class="f">
    <img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" alt="${forecast.weather[0].description}" id="forecast-icon"/>
    <span id="forecastTempMax">${Math.round(forecast.temp.max)}°</span>
    <span id="forecastTempMin">${Math.round(forecast.temp.min)}°</span>
    </div>
    </div>`; 
    }
  });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;

}

function weatherPrediction(coordinates){
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  console.log(lat,lon);
  let apiKey = "311f1f45fee82242ab4086372ab360f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(getForecast);
  }



function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#citySearch").value;
  let cityName = document.querySelector("#city");
  cityName.innerHTML = cityInput;
  let apiKey = "311f1f45fee82242ab4086372ab360f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

function displayTime(tstamp) {
  let now = new Date(tstamp * 1000);
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
if(hour<10)
{
  hour =`0${hour}`;
}
if(minute<10)
{
  minute =`0${minute}`;
}
if(second<10)
{
  second =`0${second}`;
}
  let timeElement = document.querySelector("#time");
  console.log(`${hour}:${minute}:${second}`);
  
  timeElement.innerHTML = `${hour}:${minute}:${second}`;
}
function displayTemp(response) {
  console.log(response.data);
  let cityTemp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  cityTemp.innerHTML = `${temperature}`;
  temperatureElement = temperature;

  let wDescription = document.querySelector("#weather-description");
  wDescription.innerHTML = `${response.data.weather[0].description}`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)}`;
  let timestamp = response.data.dt;
  let iconElement = response.data.weather[0].icon;
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconElement}@2x.png`);
  displayTime(timestamp);
  icon.setAttribute("alt", `${response.data.weather[0].description}`);
  displayTime(timestamp);

  weatherPrediction(response.data.coord)
}


let form = document.querySelector("#input-form");
form.addEventListener("submit", showCity);




