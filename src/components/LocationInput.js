import { TextField } from "@material-ui/core";

export default function LocationInput({ location, setLocation }) {
  return (
    <TextField
      id="outlined-textarea"
      label="Your Location"
      placeholder="Please input your coordinate or your city"
      variant="outlined"
      value={location}
      onChange={(event) => setLocation(event.target.value)}
      fullWidth
    />
  );
}
