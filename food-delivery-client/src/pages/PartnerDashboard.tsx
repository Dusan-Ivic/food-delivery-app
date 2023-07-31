import { getStores, clearStores } from "../features/stores/storesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { StoreList } from "../components/StoreList";
import { BsHouseAddFill } from "react-icons/bs";
import { Button } from "react-bootstrap";

export function PartnerDashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const { stores } = useAppSelector((state) => state.stores);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getStores(user.id));
    }

    return () => {
      dispatch(clearStores());
    };
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="text-center mt-3 mb-3">Your Stores</h1>
        <Button onClick={() => console.log("add store")} className="bg-success">
          <BsHouseAddFill className="fs-4" />
        </Button>
      </div>

      {stores.length > 0 ? (
        <StoreList stores={stores} />
      ) : (
        <p className="text-center mt-4">You don't have any registered stores</p>
      )}

      <hr />
    </div>
  );
}
