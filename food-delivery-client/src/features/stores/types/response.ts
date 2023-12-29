import { Coordinate } from "@/types/geolocation";

export type StoreResponseDto = {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  category: string;
  deliveryTimeInMinutes: number;
  deliveryFee: number;
  coordinates: Coordinate[];
  partnerId: number;
  image: string | null;
};
