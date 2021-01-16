import { useState, useEffect } from "react";
import { getGeolocation, getWeatherInfo } from "./util/geolocation";
import LocationInput from "./components/LocationInput";
import TodayWeather from "./components/TodayWeather";
import FutureWeatherList from "./components/FutureWeatherList";

function App() {
  const [location, setLocation] = useState(); //input location
  const [weatherInfo, setWeatherInfo] = useState(); // returned weather info
  const [locationInfo, setLocationInfo] = useState(); // returned location info

  const getInfoByLocation = (location) => {
    getWeatherInfo(location)
      .then((data) => {
        const { consolidated_weather, ...otherInfo } = data;
        setWeatherInfo(consolidated_weather);
        setLocationInfo(otherInfo);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getGeolocation
      .then((geolocation) => {
        setLocation(geolocation);
        getInfoByLocation(geolocation);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getInfoByLocation(location);
  }, [location]);

  return (
    <div className="App">
      <LocationInput />
      {weatherInfo && (
        <TodayWeather
          todayWeatherInfo={weatherInfo[0]}
          locationInfo={locationInfo}
        />
      )}
      {weatherInfo && <FutureWeatherList weatherInfo={weatherInfo.slice(1)} />}
    </div>
  );
}

export default App;
