export interface DeliveryOptions {
  deliveryTimeInMinutes: number;
  deliveryFee: number;
  minimumOrderAmount: number;
}

export interface Store {
  id: number;
  name: string;
  description?: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  deliveryOptions: DeliveryOptions;
  categories: string[];
}
