import { useEffect } from "react";
import { StoreList } from "../components/StoreList";
import { getStores, reset } from "../features/stores/storesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { StateStatus } from "../interfaces/enums";
import { toast } from "react-toastify";
import { Spinner } from "../components/Spinner";

export function Home() {
  const dispatch = useAppDispatch();
  const { stores, status, message } = useAppSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStores(null));

    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (status == StateStatus.Error) {
      toast.error(message);
    }
  }, [status, message]);

  return (
    <div>
      <h1 className="text-center mt-3 mb-4">Available Stores</h1>

      {status === StateStatus.Loading ? (
        <Spinner />
      ) : (
        <>
          {stores.length > 0 ? (
            <StoreList stores={stores} />
          ) : (
            <p className="text-center mt-4">
              There are currently no registered stores
            </p>
          )}
        </>
      )}
    </div>
  );
}
