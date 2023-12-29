import { ProductResponseDto } from "@/features/products/types/response";
import { StateStatus } from "@/interfaces/enums";

export type ProductsState = {
  products: ProductResponseDto[];
  status: StateStatus;
  message: string;
};
