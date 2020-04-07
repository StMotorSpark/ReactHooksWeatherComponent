import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import WeatherDisplay from "./components/basicWeatherComponent/Weather";
import WeatherDisplay from "./components/customHookWeatherComponent/Weather";

function App() {
  return (
    <div className="App">
      <WeatherDisplay></WeatherDisplay>
    </div>
  );
}

export default App;
