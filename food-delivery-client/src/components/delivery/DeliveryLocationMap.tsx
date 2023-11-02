import { MapContainer, TileLayer } from "react-leaflet";
import { Coordinate } from "../../interfaces/geolocation";
import { LocationMarker } from "./LocationMarker";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { LatLngExpression } from "leaflet";
import axios from "axios";
import { DeliveryLocation } from "../../context/location/DeliveryLocationContext";

interface DeliveryLocationMapProps {
  location: DeliveryLocation | null;
  onSetLocation: (newLocation: DeliveryLocation) => void;
}

export function DeliveryLocationMap({
  location,
  onSetLocation,
}: DeliveryLocationMapProps) {
  const [currentLocation, setCurrentLocation] =
    useState<DeliveryLocation | null>(location);

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

  const handleLocationChange = (point: Coordinate) => {
    const query = `lat=${point.y}&lon=${
      point.x
    }&type=amenity&format=json&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`;
    axios
      .get(`https://api.geoapify.com/v1/geocode/reverse?${query}`)
      .then((res) => res.data)
      .then((data) => {
        const result = data.results[0];
        setCurrentLocation({
          coordinate: {
            x: result.lon,
            y: result.lat,
          },
          address: result.formatted,
        });
      });
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
        <LocationMarker
          point={currentLocation?.coordinate}
          onSetPoint={handleLocationChange}
        />
      </MapContainer>
      <Button
        variant="primary"
        className="w-100 mt-3"
        onClick={handleLocationSet}
      >
        Set Address
      </Button>
    </div>
  );
}
