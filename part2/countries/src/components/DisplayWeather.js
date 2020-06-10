import React from "react";

const DisplayWeather = ({ weather }) => {
  return (
    <>
      <div>Temperature: {weather.current.temperature} °C</div>
      <img src={weather.current.weather_icons[0]} alt="weather"></img>
      <div>
        Wind speed: {weather.current.wind_speed} km/h, Direction:{" "}
        {weather.current.wind_dir}
      </div>
    </>
  );
};

export default DisplayWeather;
