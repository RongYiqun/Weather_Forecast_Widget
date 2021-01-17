import { TextField, InputAdornment, Container } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { useState, useEffect } from "react";

// const useStyles = makeStyles((theme) => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
// }));

export default function LocationInput({ location, setLocation }) {
  //   const classes = useStyles();
  const [inputLocation, setInputLocation] = useState();

  useEffect(() => {
    setInputLocation(location);
  }, [location]);

  return (
    <Container maxWidth="sm">
      <TextField
        id="outlined-textarea"
        label="Enter Location"
        placeholder="Please input your coordinate or your city"
        variant="outlined"
        value={inputLocation}
        fullWidth
        onChange={(event) => setInputLocation(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              onClick={() => setLocation(inputLocation)}
            >
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            setLocation(inputLocation);
          }
        }}
      />
    </Container>
  );
}
