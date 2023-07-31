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
}

export interface GetStoreResponseDto extends Store {}

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
