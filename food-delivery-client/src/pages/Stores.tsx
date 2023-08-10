import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getStores, reset } from "../features/stores/storesSlice";
import { StateStatus, UserType } from "../interfaces/enums";
import { toast } from "react-toastify";
import { Spinner } from "../components/Spinner";
import { StoreList } from "../components/StoreList";
import { FaLocationDot } from "react-icons/fa6";
import { CustomerState } from "../interfaces/customer";

export function Stores() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stores, status, message } = useAppSelector((state) => state.stores);

  useEffect(() => {
    if (user && user.userType === UserType.Customer) {
      dispatch(getStores({ city: (user as CustomerState).city }));
    } else {
      dispatch(getStores());
    }

    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (status == StateStatus.Error && message) {
      toast.error(message);
    }
  }, [status, message]);

  return (
    <>
      {user && user.userType === UserType.Customer && (
        <div className="d-flex justify-content-center">
          <div className="d-flex gap-1 align-items-center">
            <FaLocationDot style={{ fontSize: "24px" }} />
            <div>
              {`${(user as CustomerState).address}, ${
                (user as CustomerState).city
              }`}
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-center mt-3 mb-4 display-4">
          {user && user.userType === UserType.Customer
            ? `Stores delivering to ${(user as CustomerState).city}`
            : "Available Stores"}
        </h1>

        {status === StateStatus.Loading ? (
          <Spinner />
        ) : (
          <>
            {stores.length > 0 ? (
              <StoreList stores={stores} />
            ) : (
              <p className="text-center mt-4">
                {user && user.userType === UserType.Customer
                  ? `There are currently no stores delivering to ${
                      (user as CustomerState).city
                    }`
                  : "There are currently no registered stores"}
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}
