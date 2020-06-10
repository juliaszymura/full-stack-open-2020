import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayCountryInfo from "./DisplayCountryInfo";
import DisplayWeather from "./DisplayWeather";

const DisplayCountry = ({ country }) => {
  const [weather, setWeather] = useState({
    current: {
      temperature: 2222,
      wind_dir: "FSO2020",
      wind_speed: 14444,
      weather_icons: [""],
    },
  });

  const getWeather = () => {
    const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY;
    const CancelToken = axios.CancelToken;
    let cancel;

    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`,
        { cancelToken: new CancelToken((c) => (cancel = c)) }
      )
      .then((response) => setWeather(response.data))
      .catch((error) => {
        if (axios.isCancel(error)) {
          // Ignore request cancellation
        } else {
          console.log(error.message);
        }
      });

    return () => cancel();
  };

  useEffect(getWeather, [country]);

  if ("error" in weather)
    return (
      <>
        <DisplayCountryInfo country={country} />
        <div>Couldn't fetch weather info</div>
      </>
    );
  return (
    <>
      <DisplayCountryInfo country={country} />
      <DisplayWeather weather={weather} />
    </>
  );
};

export default DisplayCountry;
