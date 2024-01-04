import { PartnerTable } from "@/features/partners/components";
import { Col, Row } from "react-bootstrap";
import { OrderHistory } from "@/features/orders/components";
import { StoreTable } from "@/features/stores/components";
import { useStores } from "@/features/stores/hooks";
import { useOrders } from "@/features/orders/hooks";
import { usePartners } from "@/features/partners/hooks";

export function AdminDashboard() {
  const { orders } = useOrders();
  const { stores } = useStores();
  const { partners, verifyPartner } = usePartners();

  return (
    <Col>
      <Row>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Partners</h1>
        </div>

        {partners.length > 0 ? (
          <PartnerTable partners={partners} handleVerifyPartner={verifyPartner} />
        ) : (
          <p className="text-center mt-4">There are currently no registered partners</p>
        )}
      </Row>

      <hr />

      <Row>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Registered Stores</h1>
        </div>

        {stores.length > 0 ? (
          <StoreTable stores={stores} />
        ) : (
          <p className="text-center mt-4">There are currently no registered stores</p>
        )}
      </Row>

      <hr />

      <Row>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Orders</h1>
        </div>

        {orders.length > 0 ? (
          <OrderHistory orders={orders} canManageOrders={false} />
        ) : (
          <p className="text-center mt-4">There are currently no orders</p>
        )}
      </Row>
    </Col>
  );
}
