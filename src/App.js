import { useState, useEffect } from "react";
import { getGeolocation } from "./util";
import LocationInput from "./components/LocationInput";
import TodayWeather from "./components/TodayWeather";
import FutureWeatherList from "./components/FutureWeatherList";
import { getWeathersByWoeid, searchLocation } from "./api";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  img: {
    height: "20%",
    width: "20%",
    display: "block",
    margin: "auto",
    marginTop: theme.spacing(5),
  },
}));

function App() {
  const classes = useStyles();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null); // returned weather info
  const [locationInfo, setLocationInfo] = useState(null); // returned location info

  useEffect(() => {
    const fetchWeatherByGeolocation = async () => {
      try {
        const geolocation = await getGeolocation();
        const locationString = `${geolocation.latitude},${geolocation.longitude}`;
        const listOflocation = await searchLocation(locationString);
        const closest = listOflocation[0];
        const data = await getWeathersByWoeid(closest.woeid);
        const { consolidated_weather, ...otherInfo } = data;
        setWeatherInfo(consolidated_weather);
        setLocationInfo(otherInfo);
      } catch (err) {
        console.log("error occur");
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
    if (selectedLocation) {
      fetchWeatherByWoeid();
    }
  }, [selectedLocation]);

  return (
    <div className="App">
      <LocationInput
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      {!weatherInfo && (
        <>
          <Typography variant="subtitle1" component="p" align="center">
            No weather Infomation
          </Typography>
          <img
            alt="sample weather status"
            className={classes.img}
            src={`/weatherIcons/c.svg`}
          />
        </>
      )}
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
