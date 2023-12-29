import { Coordinate } from "@/interfaces/geolocation";

export type DeliveryLocation = {
  coordinate: Coordinate | undefined;
  address: string | undefined;
};
