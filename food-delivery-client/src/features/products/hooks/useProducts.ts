import { useAuthUser } from "@/features/auth/hooks";
import productsService from "@/features/products/api";
import { ProductRequestDto } from "@/features/products/types/request";
import { ProductResponseDto } from "@/features/products/types/response";
import { useEffect, useState } from "react";

export function useProducts(storeId?: string) {
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const { accessToken } = useAuthUser();

  useEffect(() => {
    const getProducts = async (storeId: string) => {
      setProducts(await productsService.getProducts(storeId));
    };

    if (storeId) {
      getProducts(storeId);
    }
  }, [storeId]);

  const createProduct = async (data: ProductRequestDto) => {
    if (accessToken && storeId) {
      await productsService.createProduct(data, accessToken.payload);
      setProducts(await productsService.getProducts(storeId));
    }
  };

  const updateProduct = async (productId: number, data: ProductRequestDto) => {
    if (accessToken && storeId) {
      await productsService.updateProduct(productId, data, accessToken.payload);
      setProducts(await productsService.getProducts(storeId));
    }
  };

  const uploadImage = async (productId: number, formData: FormData) => {
    if (accessToken && storeId) {
      await productsService.uploadImage(productId, formData, accessToken.payload);
      setProducts(await productsService.getProducts(storeId));
    }
  };

  const deleteProduct = async (productId: number) => {
    if (accessToken && storeId) {
      await productsService.deleteProduct(productId, accessToken.payload);
      setProducts(await productsService.getProducts(storeId));
    }
  };

  return { products, createProduct, updateProduct, uploadImage, deleteProduct };
}
