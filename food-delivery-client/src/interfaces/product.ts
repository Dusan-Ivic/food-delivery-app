export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  storeId: number;
}

export interface GetProductResponseDto extends Product {}
