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
