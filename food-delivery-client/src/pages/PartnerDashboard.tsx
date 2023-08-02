import { getStores, createStore, reset } from "../features/stores/storesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { StoreList } from "../components/StoreList";
import { BsHouseAddFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { StateStatus } from "../interfaces/enums";
import { toast } from "react-toastify";
import { StoreRequestDto } from "../interfaces/store";
import { FormModal, FormProps } from "../components/FormModal";
import { StoreForm } from "../components/forms";

export function PartnerDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stores, status, message } = useAppSelector((state) => state.stores);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      dispatch(getStores(user.id));
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

  const FormComponent = ({ data, onSubmit }: FormProps<StoreRequestDto>) => {
    return <StoreForm store={data} onSubmit={onSubmit} />;
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Your Stores</h1>
          <Button onClick={() => setModalVisible(true)} className="bg-success">
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

      <FormModal
        isVisible={isModalVisible}
        title="Add new store"
        FormComponent={FormComponent}
        data={null}
        onSubmit={(data) => dispatch(createStore(data))}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}
