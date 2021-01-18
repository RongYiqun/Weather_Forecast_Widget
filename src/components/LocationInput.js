import React, { useState, useEffect, useCallback } from "react";
import throttle from "lodash.throttle";
import { TextField, Container } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { searchLocation } from "../api";

export default function LocationInput({
  selectedLocation,
  setSelectedLocation,
}) {
  const [inputLocation, setInputLocation] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);

  const fetchLocationOptions = useCallback(
    throttle(async (inputLocation) => {
      try {
        const listOflocation = await searchLocation(inputLocation);
        setLocationOptions(listOflocation);
      } catch (err) {
        console.log(err);
      }
    }, 200),
    []
  );

  useEffect(() => {
    if (inputLocation.length >= 2) {
      fetchLocationOptions(inputLocation);
    }
  }, [inputLocation, fetchLocationOptions]);

  return (
    <Container maxWidth="sm">
      <Autocomplete
        data-testid="autocomplete"
        options={locationOptions}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.title
        }
        getOptionSelected={(option, value) => option.title === value.title}
        value={selectedLocation}
        onChange={(event, newLocation) => {
          setSelectedLocation(newLocation);
        }}
        onInputChange={(event, inputLocation) => {
          setInputLocation(inputLocation);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            if (locationOptions.length > 0) {
              setSelectedLocation(locationOptions[0]);
            }
          }
        }}
        filterOptions={(options, state) => options}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Please input your coordinate or your city for weather information"
            variant="outlined"
          />
        )}
      />
    </Container>
  );
}
