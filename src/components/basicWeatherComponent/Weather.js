import React from "react";
import "./Weather.css";
import "../fontIcons/styles.css";

const useState = React.useState;
const useEffect = React.useEffect;

const apiKey = "5946fb47d8d48875b39e72827aedeaff";
const countryCode = "us";
const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;

function getWeatherEndpoint(zipCode) {
  return `${apiEndpoint}?zip=${zipCode},${countryCode}&appid=${apiKey}`;
}

function convertKelvinToFahrenheit(kelvinTemp) {
  var fhDegeres = (kelvinTemp - 273.15) * (9 / 5) + 32;
  return parseInt(fhDegeres.toString());
}

function WeatherDisplay() {
  // define state for the current weather conditions and zip code
  const [zipCode, setZipCode] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  /**
   * Create the use effect for getting the current weather conditions
   * this will need to fire on changes to the zip code
   */
  useEffect(() => {
    /**
     * make API call to get the current weather for the given zip code
     */
    if (zipCode !== null) {
      var completeEndpoint = getWeatherEndpoint(zipCode);
      fetch(completeEndpoint)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setCurrentWeather(data);
        })
        .then(error => {
          // do something on error
        });
    }
  }, [zipCode]);

  /**
   * create the weather display object based on the current weather state
   * if the currentWeather is null, do not display anything
   */
  var currentWeatherDisplay = null;
  if (currentWeather !== null) {
    var currentTemp = convertKelvinToFahrenheit(currentWeather.main.temp);
    var feelsLike = convertKelvinToFahrenheit(currentWeather.main.feels_like);
    var min = convertKelvinToFahrenheit(currentWeather.main.temp_min);
    var max = convertKelvinToFahrenheit(currentWeather.main.temp_max);

    // determine the icon class here
    var weatherIcon = <div className="icon-sun wetherIcon"></div>;

    currentWeatherDisplay = [
      <span className="weatherHeader">Current weather for {currentWeather.name}</span>,
      <span className="weatherCurrent">
        {currentTemp}° feels like {feelsLike}°
      </span>,
      <span className="weatherRange">
        Min: {min}° Max: {max}°
      </span>,
      <div>{weatherIcon}</div>,
      <div className="weatherDescription">{currentWeather.weather[0].description}</div>
    ];
  }

  return (
    <div>
      <div>
        <span>Weather For Zipcode:</span>
        <input key="zipCodeInput" id="zipCode"></input>
        <input
          type="button"
          value="Get Weather"
          onClick={() => {
            setZipCode(document.getElementById("zipCode").value);
          }}
        ></input>
      </div>

      <div className="weatherCard">{currentWeatherDisplay}</div>
    </div>
  );
}

export default WeatherDisplay;
