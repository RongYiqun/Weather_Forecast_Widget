import { searchLocation, getWeathersByWoeid } from "./index";

describe("test searchLocation", () => {
  beforeEach(() => {
    jest.setTimeout(50000);
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
      const result = await searchLocation(
        `${locationObject.latitude},${locationObject.longitude}`
      );
      expect("length" in result).toBe(true);
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
      const result = await getWeathersByWoeid(1105779);
      expect("consolidated_weather" in result).toBe(true);
      done();
    }).not.toThrow();
  });
});
