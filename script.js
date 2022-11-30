let weather = {
  apiKey: "b348b52c341aa9611c8c16ab3be65991",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((res) => res.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weahter in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    // document.body.style.backgroundImage =
    //   "url('https://api.unsplash.com/search/photos?query='" + name + "')";
    document.body.style.backgroundImage =
      "url('https://picsum.photos/1600/900')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
// Event Listeners
document.querySelector(".search button").addEventListener("click", () => {
  weather.search();
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// The Hypothetical location

function fetchWeatherByCurrentLocation(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather.apiKey}`
  )
    .then((res) => res.json())
    .then((data) => weather.displayWeather(data));
}
navigator.geolocation.getCurrentPosition(
  (res) => {
    fetchWeatherByCurrentLocation(res.coords.latitude, res.coords.longitude);
  },
  (err) => {
    weather.fetchWeather("Aleppo");
  }
);
