import axios from "axios";

// CORS Proxies  https://api.allorigins.win

export function searchLocation(location) {
  let url;
  if (typeof location === "string") {
    url = `https://www.metaweather.com/api/location/search/?query=${location}`;
  } else {
    url = `https://www.metaweather.com/api/location/search/?lattlong=${location.latitude},${location.longitude}`;
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
