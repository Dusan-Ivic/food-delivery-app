export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  storeId: number;
}

export interface GetProductResponseDto extends Product {}

export interface ProductRequestDto {
  name: string;
  description: string;
  price: number;
  quantity: number;
  storeId: number;
} 

export interface ProductResponseDto extends Product {}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  quantity: number;
}