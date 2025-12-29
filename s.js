function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.city;
  document.querySelector(".current-temperature-value").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector(".current-details").innerHTML = `
    ${formatDate(new Date(response.data.time * 1000))}, ${
    response.data.condition.description
  } <br />
    Humidity: <strong>${response.data.temperature.humidity}%</strong>,
    Wind: <strong>${Math.round(response.data.wind.speed)} km/h</strong>
  `;
}

function searchCity(city) {
  let apiKey = "8297ctbc28addf64c89c09573c3d0o27";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  return `${days[day]} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

// Default city on load
searchCity("Eldoret");
