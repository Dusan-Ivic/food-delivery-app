import { Header } from "@/components";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { DeliveryLocationProvider } from "@/features/delivery/context";
import { AuthUserProvider } from "@/features/auth/context";

function App() {
  return (
    <AuthUserProvider>
      <DeliveryLocationProvider>
        <div className="bg-light pb-5" style={{ minHeight: "100vh" }}>
          <Header />
          <ToastContainer style={{ width: "40%" }} position="top-left" />
          <Container>
            <Outlet />
          </Container>
        </div>
      </DeliveryLocationProvider>
    </AuthUserProvider>
  );
}

export default App;
