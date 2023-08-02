import {
  getStores,
  reset as resetStores,
} from "../features/stores/storesSlice";
import {
  getPartners,
  clearPartners,
  reset as resetPartners,
} from "../features/partners/partnersSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { StateStatus } from "../interfaces/enums";
import { toast } from "react-toastify";
import { StoreList } from "../components/StoreList";
import { PartnerList } from "../components/PartnerList";
import { Col, Row } from "react-bootstrap";

export function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    stores,
    status: storesStatus,
    message: storesMessage,
  } = useAppSelector((state) => state.stores);
  const {
    partners,
    status: partnersStatus,
    message: partnersMessage,
  } = useAppSelector((state) => state.partners);

  useEffect(() => {
    if (user) {
      dispatch(getStores(null));
      dispatch(getPartners());
    }

    return () => {
      dispatch(resetStores());
      dispatch(clearPartners());
    };
  }, []);

  useEffect(() => {
    if (storesStatus == StateStatus.Error) {
      toast.error(storesMessage);
    }

    return () => {
      dispatch(resetStores());
    };
  }, [storesStatus, storesMessage]);

  useEffect(() => {
    if (partnersStatus == StateStatus.Error) {
      toast.error(partnersMessage);
    }

    return () => {
      dispatch(resetPartners());
    };
  }, [partnersStatus, partnersMessage]);

  return (
    <Row>
      <Col>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Partners</h1>
        </div>
        {partners.length > 0 ? (
          <PartnerList partners={partners} />
        ) : (
          <p className="text-center mt-4">
            There are currently no registered partners
          </p>
        )}
      </Col>

      <hr />

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
    </Row>
  );
}
