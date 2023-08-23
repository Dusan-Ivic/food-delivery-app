export interface StoreBase {
  name: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  category: string;
  deliveryTimeInMinutes: number;
  deliveryFee: number;
}

export interface StoreRequestDto extends StoreBase {}

export interface StoreResponseDto extends StoreBase {
  id: number;
  partnerId: number;
  image: string | null;
}

export interface StoreState extends StoreBase {
  id: number;
  partnerId: number;
  image: string | null;
}

export interface GetStoresRequestDto {
  partnerId?: number;
  city?: string;
}
