import {
  render,
  fireEvent,
  waitFor,
  within,
  act,
  screen,
} from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";
import * as api from "./api";
import * as util from "./util";

import SydneyWeatherData from "./mockData/SydenyWeatherInfo.json";
import LondonWeatherData from "./mockData/LondonWeatherInfo.json";

describe("test App", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("render without geolocation input and user input ", async () => {
    jest.spyOn(util, "getGeolocation").mockImplementation(() => {
      throw new Error();
    });
    act(() => {
      render(<App />);
    });
    const reminder = screen.getByText("No weather Infomation");
    expect(reminder).toBeInTheDocument();
    const image = screen.getByAltText("sample weather status");
    expect(image).toBeInTheDocument();
  });

  it("render without user input by geolocation input", async () => {
    jest
      .spyOn(util, "getGeolocation")
      .mockResolvedValue({ latitude: -33.865143, longitude: 151.2099 });

    jest.spyOn(api, "searchLocation").mockResolvedValue([
      {
        title: "Sydney",
        location_type: "City",
        woeid: 1105779,
        latt_long: "-33.869629, 151.206955",
      },
    ]);

    jest.spyOn(api, "getWeathersByWoeid").mockResolvedValue(SydneyWeatherData);

    act(() => {
      render(<App />);
    });

    await waitFor(() => expect(util.getGeolocation).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(api.searchLocation).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(api.getWeathersByWoeid).toHaveBeenCalledTimes(1)
    );
    const weatherToday = screen.queryByText("January 18, 2021");
    const weatherFuture1 = screen.queryByText("January 19, 2021");
    const weatherFuture2 = screen.queryByText("January 20, 2021");
    const weatherFuture3 = screen.queryByText("January 21, 2021");
    const weatherFuture4 = screen.queryByText("January 22, 2021");
    const locationDescripotion = screen.queryByText("Sydney,Australia");
    expect(weatherToday).toBeInTheDocument();
    expect(weatherFuture1).toBeInTheDocument();
    expect(weatherFuture2).toBeInTheDocument();
    expect(weatherFuture3).toBeInTheDocument();
    expect(weatherFuture4).toBeInTheDocument();
    expect(locationDescripotion).toBeInTheDocument();
    const reminder = screen.queryByText("No weather Infomation");
    expect(reminder).not.toBeInTheDocument();
  });

  it("render with user input", async () => {
    jest.spyOn(util, "getGeolocation").mockImplementation(() => {
      throw new Error();
    });

    jest.spyOn(api, "searchLocation").mockResolvedValue([
      {
        title: "London",
        location_type: "City",
        woeid: 44418,
        latt_long: "51.506321,-0.12714",
      },
    ]);

    jest.spyOn(api, "getWeathersByWoeid").mockResolvedValue(LondonWeatherData);

    act(() => {
      render(<App />);
    });

    const autocomplete = screen.getByTestId("autocomplete");
    const input = within(autocomplete).getByRole("textbox");
    autocomplete.focus();

    fireEvent.change(input, { target: { value: "sydney" } });
    await waitFor(() => expect(api.searchLocation).toHaveBeenCalledTimes(1));
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    fireEvent.keyDown(autocomplete, { key: "Enter" });
    await waitFor(() =>
      expect(api.getWeathersByWoeid).toHaveBeenCalledTimes(1)
    );
    const weatherToday = screen.queryByText("January 18, 2021");
    const weatherFuture1 = screen.queryByText("January 19, 2021");
    const weatherFuture2 = screen.queryByText("January 20, 2021");
    const weatherFuture3 = screen.queryByText("January 21, 2021");
    const weatherFuture4 = screen.queryByText("January 22, 2021");
    const locationDescripotion = screen.queryByText("London,England");
    expect(weatherToday).toBeInTheDocument();
    expect(weatherFuture1).toBeInTheDocument();
    expect(weatherFuture2).toBeInTheDocument();
    expect(weatherFuture3).toBeInTheDocument();
    expect(weatherFuture4).toBeInTheDocument();
    expect(locationDescripotion).toBeInTheDocument();
    const reminder = screen.queryByText("No weather Infomation");
    expect(reminder).not.toBeInTheDocument();
  });
});
