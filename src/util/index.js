import moment from "moment";

export const getGeolocation = () =>
  new Promise(function (resolve) {
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
      console.log(err);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  });

export function formateDate(dateString) {
  return moment(dateString).format("LL");
}
