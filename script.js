const apiKey = '189f8707ab18328de5b20371366c55eb'; 

function getWeatherByCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return alert('Please enter a city name.');
  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
  }, () => alert("Unable to retrieve your location."));
}

function fetchWeather(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Weather data not found");
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => {
      document.getElementById('weatherDisplay').innerHTML = `<p style="color:red">${error.message}</p>`;
    });
}

function displayWeather(data) {
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById('weatherDisplay').innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <img src="${icon}" alt="Weather icon">
    <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
    <p>🌡️ Temperature: ${data.main.temp} °C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
  `;
}
