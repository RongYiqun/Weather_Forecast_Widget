import { useState, useEffect } from "react";
import { getGeolocation } from "./util";
import LocationInput from "./components/LocationInput";
import TodayWeather from "./components/TodayWeather";
import FutureWeatherList from "./components/FutureWeatherList";
import { getWeathersByWoeid, searchLocation } from "./api";

function App() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null); // returned weather info
  const [locationInfo, setLocationInfo] = useState(null); // returned location info

  useEffect(() => {
    const fetchWeatherByGeolocation = async () => {
      try {
        const geolocation = await getGeolocation;
        const locationString = `${geolocation.latitude},${geolocation.longitude}`;
        const listOflocation = await searchLocation(locationString);
        // console.log("listOflocation", listOflocation);
        const closest = listOflocation[0];
        setSelectedLocation(closest);
        const data = await getWeathersByWoeid(closest.woeid);
        const { consolidated_weather, ...otherInfo } = data;
        setWeatherInfo(consolidated_weather);
        setLocationInfo(otherInfo);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWeatherByGeolocation();
  }, []);

  useEffect(() => {
    const fetchWeatherByWoeid = async () => {
      try {
        const data = await getWeathersByWoeid(selectedLocation.woeid);
        const { consolidated_weather, ...otherInfo } = data;
        setWeatherInfo(consolidated_weather);
        setLocationInfo(otherInfo);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWeatherByWoeid();
  }, [selectedLocation]);

  return (
    <div className="App">
      <LocationInput
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
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
