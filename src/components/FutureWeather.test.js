import { render, screen } from "@testing-library/react";
import FutureWeather from "./FutureWeather";
import "@testing-library/jest-dom/extend-expect";
import { formateDate } from "../util";

describe("test FutureWeather", () => {
  it("renders with valid dayWeatherInfo", () => {
    const dayWeatherInfo = {
      weather_state_abbr: "lr",
      weather_state_name: "Light Rain",
      min_temp: 7.234999999999999,
      max_temp: 11.625,
      applicable_date: "2021-01-19",
      wind_speed: 13.108392663649619,
    };
    render(<FutureWeather dayWeatherInfo={dayWeatherInfo} />);
    const weatherDiscription = screen.getByText("Light Rain");
    const temperature = screen.getByText(/7*12/);
    const date = screen.getByText(formateDate("2021-01-19"));
    const wind = screen.getByText(/13km\/h/);
    const image = screen.getByAltText("weather status lr");
    expect(weatherDiscription).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(wind).toBeInTheDocument();
    expect(image.src).toContain("lr.svg");
  });
});
