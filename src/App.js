import { useState, useEffect } from "react";
import { getGeolocation, getWeatherInfo } from "./util/geolocation";
import LocationInput from "./components/LocationInput";
import TodayWeather from "./components/TodayWeather";
import FutureWeatherList from "./components/FutureWeatherList";

function App() {
  const [location, setLocation] = useState(""); //input location
  const [weatherInfo, setWeatherInfo] = useState(null); // returned weather info
  const [locationInfo, setLocationInfo] = useState(null); // returned location info

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
        const locationString = `${geolocation.latitude},${geolocation.longitude}`;
        setLocation(locationString);
        getInfoByLocation(locationString);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getInfoByLocation(location);
  }, [location]);

  return (
    <div className="App">
      <LocationInput location={location} setLocation={setLocation} />
      {weatherInfo && locationInfo && (
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
