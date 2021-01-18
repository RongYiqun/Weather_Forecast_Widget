import React, { useState, useEffect, useRef, useCallback } from "react";
import debounce from "lodash.debounce";
import { TextField, Container } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { searchLocation } from "../api";

export default function LocationInput({
  selectedLocation,
  setSelectedLocation,
}) {
  const [inputLocation, setInputLocation] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const loading = useRef(false);

  const fetchLocationOptions = useCallback(
    debounce(async (inputLocation) => {
      loading.current = true;
      try {
        const listOflocation = await searchLocation(inputLocation);
        setLocationOptions(listOflocation);
      } catch (err) {
        console.log(err);
      }
      loading.current = false;
    }, 200),
    []
  );

  useEffect(() => {
    if (inputLocation) {
      fetchLocationOptions(inputLocation);
    }
  }, [inputLocation]);

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
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading.current ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Container>
  );
}
