import { useState, useEffect } from "react";
import { getGeolocation } from "./util/getGeolocation";
import LocationInput from "./components/LocationInput";

function App() {
  const [location, setLocation] = useState();

  useEffect(() => {
    getGeolocation
      .then((geolocation) => setLocation(geolocation))
      .catch((err) => console.log(err));
  }, []);

  console.log(location);

  return (
    <div className="App">
      <LocationInput />
    </div>
  );
}

export default App;
