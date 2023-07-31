import {
  getStores,
  clearStores,
  createStore,
  reset,
} from "../features/stores/storesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { StoreList } from "../components/StoreList";
import { BsHouseAddFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { StateStatus } from "../interfaces/state";
import { toast } from "react-toastify";
import { CreateStoreRequestDto as StoreFormData } from "../interfaces/store";
import { StoreModal } from "../components/StoreModal";

export function PartnerDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stores, status, message } = useAppSelector((state) => state.stores);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = (data: StoreFormData) => {
    dispatch(createStore(data));
    setModalVisible(false);
  };

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

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Your Stores</h1>
          <Button onClick={() => handleOpenModal()} className="bg-success">
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

      <StoreModal
        onSubmit={handleSubmit}
        isVisible={modalVisible}
        handleClose={handleCloseModal}
      />
    </div>
  );
}
