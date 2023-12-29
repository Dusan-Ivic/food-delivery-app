import { Coordinate } from "@/types/geolocation";
import { useMapEvents, Polyline } from "react-leaflet";

interface PolygonDrawingProps {
  points: Coordinate[];
  onSetPoint: (newPoint: Coordinate) => void;
}

export function PolygonDrawing({ points, onSetPoint }: PolygonDrawingProps) {
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
