import { searchLocation, getWeathersByWoeid } from "./index";

describe("test searchLocation", () => {
  beforeEach(() => {
    jest.setTimeout(30000);
  });

  it("searchLocation with city name string input", () => {
    expect(async () => await searchLocation("syd")).not.toThrow();
  });
  it("searchLocation with location string input", (done) => {
    const locationObject = {
      latitude: -33.8842945432536,
      longitude: 151.20076665634,
    };
    expect(async () => {
      const l = await searchLocation(
        `${locationObject.latitude},${locationObject.longitude}`
      );
      console.log(l);
      done();
    }).not.toThrow();
  });
});

describe("test getWeathersByWoeid", () => {
  beforeEach(() => {
    jest.setTimeout(30000);
  });
  it("getWeathersByWoeid with valid Woeid", (done) => {
    expect(async () => {
      const l = await getWeathersByWoeid(1105779);
      console.log(l);
      done();
    }).not.toThrow();
  });
});
