import { ProductResponseDto } from "@/features/products/types/response";
import { StateStatus } from "@/types/state";

export type ProductsState = {
  products: ProductResponseDto[];
  status: StateStatus;
  message: string;
};
