import { render, screen } from "@testing-library/react";
import TodayWeather from "./TodayWeather";
import "@testing-library/jest-dom/extend-expect";
import { formateDate } from "../util";

describe("test TodayWeather", () => {
  it("render with valid todayWeatherInfo and locationInfo", () => {
    const todayWeatherInfo = {
      weather_state_abbr: "lr",
      weather_state_name: "Light Rain",
      min_temp: 7.234999999999999,
      max_temp: 11.625,
      the_temp: 9.123,
      applicable_date: "2021-01-19",
      wind_speed: 13.108392663649619,
    };
    const locationInfo = {
      parent: {
        title: "England",
        location_type: "Region / State / Province",
        woeid: 24554868,
        latt_long: "52.883560,-1.974060",
      },
      title: "London",
      location_type: "City",
    };
    render(
      <TodayWeather
        todayWeatherInfo={todayWeatherInfo}
        locationInfo={locationInfo}
      />
    );

    const weatherDiscription = screen.getByText("Light Rain");
    const temperature = screen.getByText(/7*12/);
    const currentTemperature = screen.getByText("9°C");
    const date = screen.getByText(formateDate("2021-01-19"));
    const wind = screen.getByText(/13km\/h/);
    const image = screen.getByAltText("weather status lr");
    const location = screen.getByText("London,England");
    expect(weatherDiscription).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
    expect(currentTemperature).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(wind).toBeInTheDocument();
    expect(image.src).toContain("lr.svg");
    expect(location).toBeInTheDocument();
  });
});
