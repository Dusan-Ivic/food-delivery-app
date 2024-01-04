import storesService from "@/features/stores/api";
import { StoreResponseDto } from "@/features/stores/types/response";
import { StoreFilters } from "@/features/stores/types/search";
import { useEffect, useState } from "react";

export function useStores(initialFilters?: StoreFilters) {
  const [stores, setStores] = useState<StoreResponseDto[]>([]);
  const [filters, setFilters] = useState<StoreFilters>(initialFilters || {});

  useEffect(() => {
    const getStores = async (filters: StoreFilters) => {
      const response = await storesService.getStores(filters);
      setStores(response);
    };

    getStores(filters);
  }, [filters]);

  return {
    stores,
    setFilters,
  };
}
