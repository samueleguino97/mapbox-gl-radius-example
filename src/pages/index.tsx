import * as React from "react";
import Map, { Layer, Marker, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MarkerWithRadius from "../components/MarkerWithRadius";
function App() {
  return (
    <div className="w-full h-screen relative">
      <Map
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1Ijoic2FtdWVsZWd1aW5vOTciLCJhIjoiY2tjZ2Eyb2UxMDFsazJ4cGw0aDl3d2xmMiJ9.L-6mclqNjCUxeWSFk6EUYw"
      >
        <MarkerWithRadius
          latitude={40}
          longitude={-100}
          radiusInKm={5}
          color="red"
        />
      </Map>
    </div>
  );
}
export default App;
