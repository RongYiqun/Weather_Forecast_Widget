import { useState, useEffect } from "react";
import { getGeolocation, getWeatherInfo } from "./util/geolocation";
import { Grid } from "@material-ui/core";
import LocationInput from "./components/LocationInput";

function App() {
  const [location, setLocation] = useState();
  const [weatherInfo, setWeatherInfo] = useState();

  useEffect(() => {
    getGeolocation
      .then((geolocation) => {
        setLocation(geolocation);
        return getWeatherInfo(geolocation);
      })
      .then((weathers) => setWeatherInfo(weathers))
      .catch((err) => console.log(err));
  }, []);

  console.log(location);
  console.log(weatherInfo);

  return (
    <div className="App">
      <LocationInput />
    </div>
  );
}

export default App;
