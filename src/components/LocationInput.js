import { TextField } from "@material-ui/core";

export default function LocationInput() {
  return (
    <TextField
      id="outlined-textarea"
      label="Your Location"
      placeholder="please input your coordinate or your city"
      variant="outlined"
      fullWidth
    />
  );
}
