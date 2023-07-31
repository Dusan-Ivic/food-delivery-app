import {
  getStores,
  clearStores,
  createStore,
  reset,
} from "../features/stores/storesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { StoreList } from "../components/StoreList";
import { BsHouseAddFill } from "react-icons/bs";
import { Button, Col, Row } from "react-bootstrap";
import { StoreForm } from "../components/forms";
import { StateStatus } from "../interfaces/state";
import { toast } from "react-toastify";
import { CreateStoreRequestDto as StoreFormData } from "../interfaces/store";

export function PartnerDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stores, status, message } = useAppSelector((state) => state.stores);

  useEffect(() => {
    if (user) {
      dispatch(getStores(user.id));
    }

    return () => {
      dispatch(clearStores());
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

  const onSubmit = (data: StoreFormData) => {
    dispatch(createStore(data));
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Your Stores</h1>
          <Button
            onClick={() => console.log("add store")}
            className="bg-success"
          >
            <BsHouseAddFill className="fs-4" />
          </Button>
        </div>

        {stores.length > 0 ? (
          <StoreList stores={stores} />
        ) : (
          <p className="text-center mt-4">
            You don't have any registered stores
          </p>
        )}
      </div>

      <hr />

      <Row className="d-flex justify-content-center">
        <Col xs={10} sm={12} md={10} lg={7} xl={6}>
          <h1 className="mt-3 mb-3">Create new store</h1>
          <StoreForm onSubmit={onSubmit} />
        </Col>
      </Row>
    </div>
  );
}
