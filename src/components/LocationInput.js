import React, { useState, useEffect, useMemo } from "react";
import throttle from "lodash/throttle";
import { TextField, Container } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { searchLocation } from "../api";

export default function LocationInput() {
  const [inputLocation, setInputLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [locationOptions, setLocationOptions] = React.useState([]);
  const loading = React.useRef(false);

  const fetchLocationOptions = async () => {
    loading.current = true;
    try {
      const listOflocation = await searchLocation(inputLocation);
      setLocationOptions(listOflocation);
      loading.current = false;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (inputLocation) {
      fetchLocationOptions();
      console.log("locationOptions", locationOptions);
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
          console.log("newLocation", newLocation);
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
