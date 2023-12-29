import { MapContainer, TileLayer } from "react-leaflet";
import { Coordinate } from "@/types/geolocation";
import { LocationMarker } from "@/components";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { LatLngExpression } from "leaflet";
import { DeliveryLocation } from "@/features/delivery/types/location";
import { getReverseGeocoding } from "@/features/delivery/api";

interface DeliveryLocationMapProps {
  location: DeliveryLocation | null;
  onSetLocation: (newLocation: DeliveryLocation) => void;
}

export function DeliveryLocationMap({ location, onSetLocation }: DeliveryLocationMapProps) {
  const [currentLocation, setCurrentLocation] = useState<DeliveryLocation | null>(location);

  const getMapCenter = (): LatLngExpression => {
    if (currentLocation && currentLocation.coordinate) {
      return [currentLocation.coordinate.y, currentLocation.coordinate.x];
    } else {
      return [50, 15];
    }
  };

  const handleLocationSet = () => {
    if (currentLocation) {
      onSetLocation(currentLocation);
    }
  };

  const handleLocationChange = async (point: Coordinate) => {
    const response = await getReverseGeocoding({
      lat: point.y,
      lon: point.x,
      type: "amenity",
      format: "json",
      apiKey: import.meta.env.VITE_GEOAPIFY_API_KEY,
    });

    if (response.results.length) {
      setCurrentLocation({
        address: response.results[0].formatted,
        coordinate: {
          x: response.results[0].lon,
          y: response.results[0].lat,
        },
      });
    }
  };

  return (
    <div>
      <MapContainer
        center={getMapCenter()}
        zoom={location ? 18 : 3}
        style={{ cursor: "crosshair", height: "50vh" }}
      >
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker point={currentLocation?.coordinate} onSetPoint={handleLocationChange} />
      </MapContainer>
      <Button variant="primary" className="w-100 mt-3" onClick={handleLocationSet}>
        Set Address
      </Button>
    </div>
  );
}
