import { getStores, reset as resetStores } from "../features/stores/slices";
import {
  getPartners,
  clearPartners,
  verifyPartner,
  reset as resetPartners,
} from "../features/partners/partnersSlice";
import { getOrders, clearOrders, reset as resetOrders } from "../features/orders/slices";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { PartnerStatus, StateStatus } from "../interfaces/enums";
import { toast } from "react-toastify";
import { PartnerTable } from "../components/users/PartnerTable";
import { Col, Row } from "react-bootstrap";
import { OrderHistory } from "../features/orders/components/OrderHistory/OrderHistory";
import { Spinner } from "../components/ui/Spinner";
import { PartnerResponseDto } from "@/interfaces/partner";
import { StoreTable } from "@/features/stores/components";

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
  const {
    orders,
    status: ordersStatus,
    message: ordersMessage,
  } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (user) {
      dispatch(getStores());
      dispatch(getPartners());
      dispatch(getOrders());
    }

    return () => {
      dispatch(resetStores());
      dispatch(clearPartners());
      dispatch(clearOrders());
    };
  }, [user, dispatch]);

  useEffect(() => {
    if (storesStatus == StateStatus.Error && storesMessage) {
      toast.error(storesMessage);
    }

    return () => {
      dispatch(resetStores());
    };
  }, [storesStatus, storesMessage, dispatch]);

  useEffect(() => {
    if (partnersStatus == StateStatus.Error && partnersMessage) {
      toast.error(partnersMessage);
    }

    return () => {
      dispatch(resetPartners());
    };
  }, [partnersStatus, partnersMessage, dispatch]);

  useEffect(() => {
    if (ordersStatus == StateStatus.Error && ordersMessage) {
      toast.error(ordersMessage);
    }

    return () => {
      dispatch(resetOrders());
    };
  }, [ordersStatus, ordersMessage, dispatch]);

  const handleVerify = (partner: PartnerResponseDto, status: PartnerStatus) => {
    if (partner.status === status) {
      toast.warn(`Partner is already ${PartnerStatus[status]}`);
    } else {
      dispatch(verifyPartner({ partnerId: partner.id, newStatus: status }));
    }
  };

  return (
    <Col>
      <Row>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Partners</h1>
        </div>

        {partnersStatus === StateStatus.Loading ? (
          <Spinner />
        ) : (
          <>
            {partners.length > 0 ? (
              <PartnerTable partners={partners} onVerify={handleVerify} />
            ) : (
              <p className="text-center mt-4">There are currently no registered partners</p>
            )}
          </>
        )}
      </Row>

      <hr />

      <Row>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Registered Stores</h1>
        </div>

        {storesStatus === StateStatus.Loading ? (
          <Spinner />
        ) : (
          <>
            {stores.length > 0 ? (
              <StoreTable stores={stores} />
            ) : (
              <p className="text-center mt-4">There are currently no registered stores</p>
            )}
          </>
        )}
      </Row>

      <hr />

      <Row>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Orders</h1>
        </div>

        {ordersStatus === StateStatus.Loading ? (
          <Spinner />
        ) : (
          <>
            {orders.length > 0 ? (
              <OrderHistory orders={orders} canManageOrders={false} />
            ) : (
              <p className="text-center mt-4">There are currently no orders</p>
            )}
          </>
        )}
      </Row>
    </Col>
  );
}
