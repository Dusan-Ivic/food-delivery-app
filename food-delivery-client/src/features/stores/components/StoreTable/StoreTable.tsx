import { StoreResponseDto } from "@/features/stores/types/response";
import { Table } from "react-bootstrap";
import { FaStoreAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

interface StoreTableProps {
  stores: StoreResponseDto[];
}

export function StoreTable({ stores }: StoreTableProps) {
  return (
    <>
      <Table striped hover className="text-center rounded rounded-3 overflow-hidden">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Address</th>
            <th>City</th>
            <th>Partner</th>
            <th>Visit</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.id}</td>
              <td>
                <img
                  style={{ height: "48px", width: "48px", objectFit: "cover" }}
                  src={store.image ? store.image : "/images/no-image.svg"}
                />
              </td>
              <td>{store.name}</td>
              <td>{store.category}</td>
              <td>{store.address}</td>
              <td>{store.city}</td>
              <td>{store.partnerId}</td>
              <td>
                <Link to={`/stores/${store.id}`}>
                  <FaStoreAlt className="fs-5" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
