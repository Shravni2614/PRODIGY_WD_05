async function getWeather() {
  const city = document.getElementById("locationInput").value.trim();
  const apiKey = "BQ9MNJL4DKJQ73RVBXF5HBP9V"; // Replace with your actual Visual Crossing API key
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}&unitGroup=metric`;

  if (!city) {
    document.getElementById(
      "weatherDisplay"
    ).innerHTML = `<p>⚠️ Please enter a city name.</p>`;
    return;
  }

  document.getElementById(
    "weatherDisplay"
  ).innerHTML = `<p>🔄 Fetching weather data...</p>`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const condition = data.currentConditions.conditions;
    const icon = getWeatherIcon(condition);

    const weatherInfo = `
      <div class="weather-icon">${icon}</div>
      <h2>📍 ${data.resolvedAddress}</h2>
      <p>🌤️ Condition: ${condition}</p>
      <p>🌡️ Temperature: ${data.currentConditions.temp}°C</p>
      <p>💧 Humidity: ${data.currentConditions.humidity}%</p>
      <p>🌬️ Wind Speed: ${data.currentConditions.windspeed} km/h</p>
    `;

    document.getElementById("weatherDisplay").innerHTML = weatherInfo;
  } catch (error) {
    document.getElementById(
      "weatherDisplay"
    ).innerHTML = `<p>⚠️ Couldn't fetch weather for "${city}". Try another city!</p>`;
    console.error("Error fetching weather:", error);
  }
}

function getWeatherIcon(condition) {
  const icons = {
    Clear: "☀️",
    "Partially cloudy": "⛅",
    Cloudy: "☁️",
    Rain: "🌧️",
    Snow: "❄️",
    Thunderstorm: "⛈️",
  };
  return icons[condition] || "🌈";
}
