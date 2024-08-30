// API key for accessing the Visual Crossing Weather API
const apiKey = "35GNQH62ZU5MAV3G8NNJJMVD3";

// Base URL for the Visual Crossing Weather API
const apiUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

// Get references to important DOM elements
const citySelect = document.getElementById("citySelect");
const weatherInfo = document.getElementById("weatherInfo");

/**
 * Fetches weather data for a given city
 * @param {string} city - The name of the city to fetch weather data for
 */
async function fetchWeatherData(city) {
  try {
    // Construct the full API URL with the city, API key, and other parameters
    const fullUrl = `${apiUrl}${city}/today?unitGroup=metric&key=${apiKey}&contentType=json`;

    // Fetch data from the API
    const response = await fetch(fullUrl);

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the JSON data from the response
    const data = await response.json();

    // Display the weather data on the page
    displayWeatherData(data);
  } catch (error) {
    // Log any errors to the console
    console.error("There was a problem with the fetch operation:", error);

    // Display an error message to the user
    weatherInfo.innerHTML = `<p>Failed to fetch weather data. Please try again.</p>`;
  }
}

/**
 * Displays the weather data on the page
 * @param {Object} data - The weather data object returned from the API
 */
function displayWeatherData(data) {
  // Extract the current conditions from the data
  const currentConditions = data.currentConditions;

  // Get the current time of the location
  const localTime = new Date().toLocaleTimeString("en-US", { timeZone: data.timezone });

  // Extract just the city name from the resolved address
  const cityName = data.address.split(",")[0].trim();

  // Update the weatherInfo div with the weather data
  weatherInfo.innerHTML = `
        <h2>${cityName}</h2>
        <p>Current Time: ${localTime}</p>
        <p>Temperature: ${currentConditions.temp}°C</p>
        <p>Humidity: ${currentConditions.humidity}%</p>
        <p>Precipitation: ${currentConditions.precip} mm</p>
        <p>Wind Speed: ${currentConditions.windspeed} km/h</p>
    `;
}

// Add an event listener to the city select dropdown
citySelect.addEventListener("change", (event) => {
  // When a new city is selected, fetch weather data for that city
  fetchWeatherData(event.target.value);
});

// Fetch weather data for the default selected city when the page loads
fetchWeatherData(citySelect.value);
