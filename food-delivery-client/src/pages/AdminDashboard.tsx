import { getStores, reset } from "../features/stores/storesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { StateStatus } from "../interfaces/enums";
import { toast } from "react-toastify";
import { StoreList } from "../components/StoreList";

export function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stores, status, message } = useAppSelector((state) => state.stores);

  useEffect(() => {
    if (user) {
      dispatch(getStores(null));
    }

    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (status == StateStatus.Error) {
      toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [status, message]);

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Registered Stores</h1>
        </div>

        {stores.length > 0 ? (
          <StoreList stores={stores} />
        ) : (
          <p className="text-center mt-4">
            There are currently no registered stores
          </p>
        )}
      </div>

      <hr />
    </div>
  );
}
