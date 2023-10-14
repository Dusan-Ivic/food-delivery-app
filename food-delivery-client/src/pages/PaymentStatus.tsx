import { Link, useSearchParams } from "react-router-dom";

export function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const paymentStatus = searchParams.get("status");

  return (
    <div
      className="text-center d-flex justify-content-center align-items-center"
      style={{ height: "50vh" }}
    >
      <div>
        <h1 className="mb-5">
          Your payment {paymentStatus === "success" ? "is completed" : "failed"}
        </h1>

        <div className="d-flex justify-content-center align-items-center gap-3">
          <Link to="/orders" className="btn btn-primary">
            Go to your Orders
          </Link>
          <div>or</div>
          <Link to="/stores" className="btn btn-primary">
            Go back to Stores
          </Link>
        </div>
      </div>
    </div>
  );
}
