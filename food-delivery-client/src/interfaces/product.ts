export interface ProductBase {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface ProductRequestDto extends ProductBase {
  storeId?: number;
}

export interface ProductResponseDto extends ProductBase {
  id: number;
  storeId: number;
  imageData: Uint8Array;
}

export interface ProductState extends ProductBase {
  id: number;
  storeId: number;
  imageData: string | null;
}
