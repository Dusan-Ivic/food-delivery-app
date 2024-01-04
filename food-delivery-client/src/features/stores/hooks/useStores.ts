import { useAuthUser } from "@/features/auth/hooks";
import storesService from "@/features/stores/api";
import { StoreRequestDto } from "@/features/stores/types/request";
import { StoreResponseDto } from "@/features/stores/types/response";
import { StoreFilters } from "@/features/stores/types/search";
import { useEffect, useState } from "react";

export function useStores(initialFilters?: StoreFilters) {
  const [stores, setStores] = useState<StoreResponseDto[]>([]);
  const [filters, setFilters] = useState<StoreFilters>(initialFilters || {});
  const { accessToken } = useAuthUser();

  useEffect(() => {
    const getStores = async (filters: StoreFilters) => {
      setStores(await storesService.getStores(filters));
    };

    getStores(filters);
  }, [filters]);

  const createStore = async (data: StoreRequestDto) => {
    if (accessToken) {
      await storesService.createStore(data, accessToken.payload);
      setStores(await storesService.getStores(filters));
    }
  };

  return {
    stores,
    setFilters,
    createStore,
  };
}
