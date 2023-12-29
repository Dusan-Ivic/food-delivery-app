import { Coordinate } from "@/types/geolocation";

export type DeliveryLocation = {
  coordinate: Coordinate | undefined;
  address: string | undefined;
};
