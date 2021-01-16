import axios from "axios";

// CORS Proxies  https://api.allorigins.win

export function searchLocation(locationString) {
  let url;
  const parts = locationString.split(",");
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    //check if it is a lattlong string
    url = `https://www.metaweather.com/api/location/search/?lattlong=${locationString}`;
  } else {
    url = `https://www.metaweather.com/api/location/search/?query=${locationString}`;
  }
  return axios
    .get(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    .then((res) => res.data.contents)
    .then((content) => JSON.parse(content));
}

export function getWeathersByWoeid(woeid) {
  const url = `https://www.metaweather.com/api/location/${woeid}/`;
  return axios
    .get(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    .then((res) => res.data.contents)
    .then((content) => JSON.parse(content));
}
