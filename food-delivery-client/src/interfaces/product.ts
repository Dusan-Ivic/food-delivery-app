export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  storeId: number;
}

export interface GetProductResponseDto extends Product {}

export interface CreateProductRequestDto {
  name: string;
  description: string;
  price: number;
  quantity: number;
  storeId: number;
} 

export interface CreateProductResponseDto extends Product {}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  quantity: number;
}