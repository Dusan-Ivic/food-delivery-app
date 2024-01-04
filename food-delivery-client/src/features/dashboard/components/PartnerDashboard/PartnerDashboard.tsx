import { useState } from "react";
import { BsHouseAddFill } from "react-icons/bs";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { OrderHistory } from "@/features/orders/components";
import { StoreTable, StoreModal } from "@/features/stores/components";
import { PartnerStatus } from "@/features/partners/types/enums";
import { PartnerResponseDto } from "@/features/partners/types/response";
import { useAuthUser } from "@/features/auth/hooks";
import { useStores } from "@/features/stores/hooks";
import { useOrders } from "@/features/orders/hooks";

export function PartnerDashboard() {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const { user } = useAuthUser();
  const { orders } = useOrders();
  const { stores, createStore } = useStores({ partnerId: user?.id });

  const AlertComponent = ({
    status,
    children,
  }: {
    status: PartnerStatus;
    children: JSX.Element;
  }) => {
    switch (status) {
      case PartnerStatus.Pending:
        return (
          <Alert variant="warning">
            {children} You may be restricted from performing certain actions.
          </Alert>
        );
      case PartnerStatus.Rejected:
        return (
          <Alert variant="danger">
            {children} You may be restricted from performing certain actions.
          </Alert>
        );
      case PartnerStatus.Suspended:
        return (
          <Alert variant="danger">
            {children} You may be restricted from performing certain actions.
          </Alert>
        );
      case PartnerStatus.Accepted:
        return (
          <Alert variant="success">
            {children} You can now perform all store and product related actions.
          </Alert>
        );
    }
  };

  return (
    <Col>
      <Row>
        <AlertComponent status={(user as PartnerResponseDto).status}>
          <>Your current status is: {PartnerStatus[(user as PartnerResponseDto).status]}.</>
        </AlertComponent>
      </Row>

      <Row>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Your Stores</h1>
          <Button onClick={() => setModalVisible(true)} className="bg-success">
            <BsHouseAddFill className="fs-4" />
          </Button>
        </div>

        {stores.length > 0 ? (
          <StoreTable stores={stores} />
        ) : (
          <p className="text-center mt-4"> You don't have any registered stores</p>
        )}
      </Row>

      <hr />

      <Row>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Orders</h1>
        </div>

        <>
          {orders.length > 0 ? (
            <OrderHistory orders={orders} canManageOrders={false} />
          ) : (
            <p className="text-center mt-4">There are currently no orders</p>
          )}
        </>
      </Row>

      <StoreModal
        isVisible={isModalVisible}
        title="Add new store"
        onSubmit={createStore}
        onClose={() => setModalVisible(false)}
      />
    </Col>
  );
}
