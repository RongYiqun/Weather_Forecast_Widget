import React, { useState, useEffect, useRef } from "react";
// import throttle from "lodash/throttle";
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

  const fetchLocationOptions = async () => {
    try {
      const listOflocation = await searchLocation(inputLocation);
      setLocationOptions(listOflocation);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (inputLocation) {
      loading.current = true;
      fetchLocationOptions();
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
