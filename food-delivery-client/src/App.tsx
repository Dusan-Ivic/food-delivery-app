import { Header } from "./components/Header";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Profile, Register, Store } from "./pages";
import { PrivateRoute } from "./components/PrivateRoute";
import { Orders } from "./pages/Orders";

function App() {
  return (
    <div className="bg-light pb-5" style={{ minHeight: "100vh" }}>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/stores/:id" element={<Store />} />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
