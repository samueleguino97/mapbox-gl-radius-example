import * as React from "react";
import { Layer, Marker, Source } from "react-map-gl";
var createGeoJSONCircle = function (
  center: [number, number],
  radiusInKm: number,
  points: number
): any {
  //POINTS IS THE NUMBER OF POINTS IN THE POLYGON, WHICH IS USUALLY EQUAL TO THE NUMBER OF SIDES OF THE POLYGON
  //THIS HELPS IN CREATING A SMOOTH CIRCLE
  if (!points) points = 64;

  var coords = {
    latitude: center[1],
    longitude: center[0],
  };

  var km = radiusInKm;

  var ret = [];
  var distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
  var distanceY = km / 110.574;

  var theta, x, y;
  for (var i = 0; i < points; i++) {
    theta = (i / points) * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    type: "FeatureCollection" as const,
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [ret],
        },
      },
    ],
  };
};
type Props = {
  latitude: number;
  longitude: number;
  radiusInKm: number;
  color?: string;
  opacity?: number;
};
function MarkerWithRadius({
  latitude: lat,
  longitude: lng,
  radiusInKm,
  color,
  opacity,
}: Props) {
  const geocircle = React.useMemo(() => {
    return createGeoJSONCircle([lng, lat], radiusInKm, 64);
  }, [lat, lng, radiusInKm]);

  return (
    <>
      <Source id="data" type="geojson" data={geocircle}>
        <Layer
          type="fill"
          id="the-circle"
          paint={{
            "fill-color": color || "blue",
            "fill-opacity": opacity || 0.4,
          }}
        ></Layer>
      </Source>
      <Marker latitude={lat} longitude={lng} />
    </>
  );
}
export default MarkerWithRadius;
