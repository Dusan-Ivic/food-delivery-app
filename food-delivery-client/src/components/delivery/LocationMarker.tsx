import { Coordinate } from "../../interfaces/geolocation";
import { useMapEvents, Marker } from "react-leaflet";

interface LocationMarkerProps {
  point: Coordinate | undefined;
  onSetPoint: (newPoint: Coordinate) => void;
}

export function LocationMarker({ point, onSetPoint }: LocationMarkerProps) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onSetPoint({ x: lng, y: lat });
    },
  });

  return point && <Marker position={[point.y, point.x]} />;
}
