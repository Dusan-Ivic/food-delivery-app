import { Spinner as BootstrapSpinner } from "react-bootstrap";

export function Spinner() {
  return (
    <div className="w-100 d-flex justify-content-center">
      <BootstrapSpinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </BootstrapSpinner>
    </div>
  );
}
