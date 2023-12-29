import { Coordinate } from "@/types/geolocation";

export type BasicInfo = {
  name: string;
  category: string;
  description: string;
};

export type ContactInfo = {
  address: string;
  city: string;
  postalCode: string;
  phone: string;
};

export type DeliveryInfo = {
  deliveryTimeInMinutes: number;
  deliveryFee: number;
};

export type DeliveryArea = {
  coordinates: Coordinate[];
};

export type StoreRequestDto = BasicInfo & ContactInfo & DeliveryInfo & DeliveryArea;

export type GetStoresRequestDto = {
  partnerId?: number;
  coordinate?: Coordinate;
};
