import Axios from "axios";

// CORS Proxies  https://api.allorigins.win

const weatherApiUrl = "https://www.metaweather.com/api/location/";
const proxyUrl = "https://api.allorigins.win/";

const axios = Axios.create({
  baseURL: proxyUrl,
  timeout: 2000,
});

export function searchLocation(locationString) {
  let url;
  const parts = locationString.split(",");
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    //check if it is a lattlong string
    url = `${weatherApiUrl}search/?lattlong=${locationString}`;
  } else {
    url = `${weatherApiUrl}search/?query=${locationString}`;
  }
  return axios
    .get(`get?url=${encodeURIComponent(url)}`)
    .then((res) => res.data.contents)
    .then((content) => JSON.parse(content));
}

export function getWeathersByWoeid(woeid) {
  const url = `${weatherApiUrl}${woeid}/`;
  return axios
    .get(`get?url=${encodeURIComponent(url)}`)
    .then((res) => res.data.contents)
    .then((content) => JSON.parse(content));
}
