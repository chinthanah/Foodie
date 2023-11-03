import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./screens/Signup";
import { CartProvider } from "./components/ContextReducer";
import Cart from "./screens/Cart";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
