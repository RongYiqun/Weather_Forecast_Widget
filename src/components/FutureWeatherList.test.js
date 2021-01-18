import weatherInfoData from "../mockData/weatherInfoData.json";
import { render, screen } from "@testing-library/react";
import FutureWeatherList from "./FutureWeatherList";
import "@testing-library/jest-dom/extend-expect";

describe("test FutureWeatherList", () => {
  it("renders with valid dayWeatherInfo", () => {
    const weatherInfo = weatherInfoData.weatherInfo;
    render(<FutureWeatherList weatherInfo={weatherInfo} />);
    const windDecription = screen.getAllByText(/Wind/);
    expect(windDecription.length).toBe(4);
  });
});
