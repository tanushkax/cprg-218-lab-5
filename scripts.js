document.addEventListener("DOMContentLoaded", () => {
  const fetchButton = document.getElementById("fetch-button");
  fetchButton.addEventListener("click", fetchWeather);

  async function fetchWeather() {
    const selectedCity = document.getElementById("cities").value;
    const apiKey = "9205f6d9965738450359040b8baed188"; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("Weather API Response:", data); // Log the response
      displayWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  function displayWeather(data) {
    const weatherInfo = document.getElementById("weather-info");
    if (data && data.main && data.weather) {
      const temperature = data.main.temp - 273.15; // Convert temperature from Kelvin to Celsius
      const weatherDescription = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      weatherInfo.innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${temperature.toFixed(1)}°C</p>
        <p>Weather: ${weatherDescription}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;
    } else {
      weatherInfo.innerHTML = "<p>Weather information not available.</p>";
    }
  }
});
