const apiUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=35GNQH62ZU5MAV3G8NNJJMVD3";

// Wrap the fetch call in a function
function fetchWeatherData() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Weather data:", data);
      // Process the data here
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Call the function when the script loads
fetchWeatherData();
