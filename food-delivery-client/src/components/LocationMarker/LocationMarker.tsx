import L from "leaflet";
import { useMapEvents, Marker } from "react-leaflet";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Coordinate } from "@/types/geolocation";

const markerIcon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

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

  return point && <Marker icon={markerIcon} position={[point.y, point.x]} />;
}
