import { MapContainer, TileLayer } from "react-leaflet";
import { Coordinate } from "../../interfaces/geolocation";
import { LocationMarker } from "./LocationMarker";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { LatLngExpression } from "leaflet";

interface DeliveryLocationMapProps {
  location: Coordinate | undefined;
  onSetLocation: (newLocation: Coordinate) => void;
}

export function DeliveryLocationMap({
  location,
  onSetLocation,
}: DeliveryLocationMapProps) {
  const [coordinate, setCoordinate] = useState<Coordinate | undefined>(
    location
  );

  const getMapCenter = (): LatLngExpression => {
    if (coordinate) {
      return [coordinate.y, coordinate.x];
    } else {
      return [50, 15];
    }
  };

  const handleLocationChange = () => {
    if (coordinate) {
      onSetLocation(coordinate);
    }
  };

  return (
    <div>
      <MapContainer
        center={getMapCenter()}
        zoom={location ? 15 : 3}
        style={{ cursor: "crosshair", height: "50vh" }}
      >
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker point={coordinate} onSetPoint={setCoordinate} />
      </MapContainer>
      <Button
        variant="primary"
        className="w-100 mt-3"
        onClick={handleLocationChange}
      >
        Set Address
      </Button>
    </div>
  );
}
