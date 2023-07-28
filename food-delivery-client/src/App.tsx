import { Header } from "./components/Header";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  return (
    <div>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
