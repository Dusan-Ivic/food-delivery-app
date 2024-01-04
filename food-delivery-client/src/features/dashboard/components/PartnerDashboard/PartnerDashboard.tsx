import { useState } from "react";
import { BsHouseAddFill } from "react-icons/bs";
import { Button, Col, Row } from "react-bootstrap";
import { OrderHistory } from "@/features/orders/components";
import { StoreTable, StoreModal } from "@/features/stores/components";
import { PartnerResponseDto } from "@/features/partners/types/response";
import { useAuthUser } from "@/features/auth/hooks";
import { useStores } from "@/features/stores/hooks";
import { useOrders } from "@/features/orders/hooks";
import { StatusAlert } from "@/features/dashboard/components";

export function PartnerDashboard() {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const { user } = useAuthUser();
  const { orders } = useOrders();
  const { stores, createStore } = useStores({ partnerId: user?.id });

  return (
    <Col>
      <Row>
        <StatusAlert status={(user as PartnerResponseDto).status} />
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
