import { useEffect } from "react";
import { StoreList } from "../components/StoreList";
import { getStores, clear, reset } from "../features/stores/storesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { StateStatus } from "../interfaces/state";

export function Home() {
  const dispatch = useAppDispatch();
  const { stores, status, message } = useAppSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStores());

    return () => {
      //dispatch(clear());
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (status == StateStatus.Error) {
      console.error(message);
    }
  }, [status, message]);

  return (
    <div>
      <h1 className="text-center mt-3 mb-4">Stores</h1>
      <StoreList stores={stores} />
    </div>
  );
}
