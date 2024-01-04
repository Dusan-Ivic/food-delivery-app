import { useAuthUser } from "@/features/auth/hooks";
import storesService from "@/features/stores/api";
import { StoreRequestDto } from "@/features/stores/types/request";
import { StoreResponseDto } from "@/features/stores/types/response";
import { useEffect, useState } from "react";

export function useStore(storeId?: string) {
  const [store, setStore] = useState<StoreResponseDto | null>(null);
  const { accessToken } = useAuthUser();

  useEffect(() => {
    const getStore = async (id: string) => {
      setStore(await storesService.getStore(id));
    };

    if (storeId) {
      getStore(storeId);
    }
  }, [storeId]);

  const updateStore = async (data: StoreRequestDto) => {
    if (store && accessToken) {
      setStore(await storesService.updateStore(store.id, data, accessToken.payload));
    }
  };

  const uploadImage = async (formData: FormData) => {
    if (store && accessToken) {
      const response = await storesService.uploadImage(store.id, formData, accessToken.payload);
      setStore({ ...store, image: response.image });
    }
  };

  return { store, updateStore, uploadImage };
}
