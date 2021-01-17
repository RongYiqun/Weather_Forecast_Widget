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
      try {
        const listOflocation = await searchLocation(inputLocation);
        console.log(listOflocation);
        setLocationOptions(listOflocation);
      } catch (err) {
        console.log(err);
      }
    }, 200),
    []
  );

  useEffect(() => {
    if (inputLocation) {
      loading.current = true;
      fetchLocationOptions(inputLocation);
      loading.current = false;
    }
  }, [inputLocation]);

  return (
    <Container maxWidth="sm">
      <Autocomplete
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
        filterOptions={(options, state) => options}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Please input your coordinate or your city"
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
