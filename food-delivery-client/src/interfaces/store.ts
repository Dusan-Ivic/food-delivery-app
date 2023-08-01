export interface DeliveryOptions {
  deliveryTimeInMinutes: number;
  deliveryFee: number;
}

export interface Store {
  id: number;
  name: string;
  description?: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  partnerId: number;
  deliveryOptions: DeliveryOptions;
  category: string;
  imageData: string | null;
}

export interface StoreResponseDto {
  id: number;
  name: string;
  description?: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  partnerId: number;
  deliveryOptions: DeliveryOptions;
  category: string;
  imageData: Uint8Array;
}

export interface GetStoreResponseDto extends StoreResponseDto {}

export interface CreateStoreRequestDto {
  name: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  deliveryOptions: DeliveryOptions;
  category: string;
}

export interface CreateStoreResponseDto extends Store {}
