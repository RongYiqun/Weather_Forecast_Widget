import {
  render,
  fireEvent,
  waitFor,
  within,
  screen,
  wait,
} from "@testing-library/react";
import LocationInput from "./LocationInput";
import "@testing-library/jest-dom/extend-expect";
import * as api from "../api";

describe("test LocationInput", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("render", async () => {
    let mockSelectedLocation = "";
    const mockSetSelectedLocation = jest.fn((location) => {
      mockSelectedLocation = location;
    });

    jest.spyOn(api, "searchLocation").mockResolvedValue([
      {
        title: "New York",
        location_type: "City",
        woeid: 2459115,
        latt_long: "40.71455,-74.007118",
      },
      {
        title: "York",
        location_type: "City",
        woeid: 41415,
        latt_long: "53.96196,-1.09045",
      },
    ]);
    render(
      <LocationInput
        selectedLocation={mockSelectedLocation}
        setSelectedLocation={mockSetSelectedLocation}
      />
    );
    const autocomplete = screen.getByTestId("autocomplete");
    const input = within(autocomplete).getByRole("textbox");
    autocomplete.focus();

    fireEvent.change(input, { target: { value: "york" } });
    await waitFor(() => expect(api.searchLocation).toHaveBeenCalledTimes(1));
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    fireEvent.keyDown(autocomplete, { key: "Enter" });
    await waitFor(() =>
      expect(mockSetSelectedLocation).toHaveBeenCalledTimes(1)
    );
    expect(input.value).toBe("New York");
    expect(mockSelectedLocation.title).toBe("New York");
  });
});
