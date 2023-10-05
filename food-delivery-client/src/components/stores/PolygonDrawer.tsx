import { Coordinate } from "../../interfaces/geolocation";
import { useMapEvents, Polyline } from "react-leaflet";

interface PolygonDrawerProps {
  points: Coordinate[];
  onSetPoint: (newPoint: Coordinate) => void;
}

export function PolygonDrawer({ points, onSetPoint }: PolygonDrawerProps) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onSetPoint({ x: lng, y: lat });
    },
  });

  return (
    <Polyline
      pathOptions={{ color: "red" }}
      positions={points.map((point) => [point.y, point.x])}
    />
  );
}
