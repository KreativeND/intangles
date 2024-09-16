import { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import { useEffect } from "react";
import data from "./assets/data/mapsData.json";

const center = {
  lat: 15.527665, // default latitude
  lng: 74.907585, // default longitude
};

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const App = () => {
  const [path, setPath] = useState([]);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.GOOGLE_MAP_API_KEY,
  });

  useEffect(() => {
    if (data.length > 0) {
      const tempData = data
        .filter((d) => d.loc && d.loc.coordinates)
        .map((c) => {
          return {
            lat: c.loc.coordinates[0],
            lng: c.loc.coordinates[1],
          };
        });

      setPath([...tempData]);
    }
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: 1200,
      }}
    >
      <div style={{ width: "60%" }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
        >
          <Polyline
            path={path}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
      </div>
    </div>
  );
};

export default App;
