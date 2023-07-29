import { Header } from "./components/Header";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Register } from "./pages";

function App() {
  return (
    <div className="bg-light pb-5" style={{ minHeight: "100vh" }}>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
