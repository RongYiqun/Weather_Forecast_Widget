import { searchLocation, getWeathersByWoeid } from "./index";
// describe("test searchLocation", () => {
//   it("searchLocation with string input", () => {
//     expect(async () => await searchLocation("syd")).not.toThrow();
//   });
//   it("searchLocation with location object input", (done) => {
//     const locationObject = {
//       accuracy: 65,
//       altitude: 38.62283706665,
//       altitudeAccuracy: 10,
//       heading: null,
//       latitude: -33.8842945432536,
//       longitude: 151.20076665634,
//       speed: null,
//     };
//     expect(async () => {
//       const l = await searchLocation(locationObject);
//       console.log(l);
//       done();
//     }).not.toThrow();
//   });
// });

describe("test getWeathersByWoeid", () => {
  it("getWeathersByWoeid with valid Woeid", (done) => {
    expect(async () => {
      const l = await getWeathersByWoeid(1105779);
      console.log(l);
      done();
    }).not.toThrow();
  });
});
