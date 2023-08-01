export interface DeliveryOptions {
  deliveryTimeInMinutes: number;
  deliveryFee: number;
}

export interface StoreBase {
  name: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  category: string;
  deliveryOptions: DeliveryOptions;
}

export interface StoreRequestDto extends StoreBase {}

export interface StoreResponseDto extends StoreBase {
  id: number;
  partnerId: number;
  imageData: Uint8Array;
}

export interface StoreState extends StoreBase {
  id: number;
  partnerId: number;
  imageData: string | null;
}
