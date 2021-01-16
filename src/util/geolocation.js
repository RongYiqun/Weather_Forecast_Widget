import { searchLocation, getWeathersByWoeid } from "../api";

export const getGeolocation = new Promise(function (resolve) {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    resolve(crd);
  }

  function error(err) {
    throw err;
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
});

export async function getWeatherInfo(location) {
  const listOflocation = await searchLocation(location);
  const closest = listOflocation[0];
  const closestWoeid = closest.woeid;
  return await getWeathersByWoeid(closestWoeid);
}
