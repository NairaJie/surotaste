import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Mealplan from "./pages/Mealplan";
import Culinary from "./pages/Culinary";
import DetailFood from "./pages/DetailFood";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mealplan" element={<Mealplan />} />
        <Route path="/culinary" element={<Culinary />} />
        <Route path="/detailfood/:foodName" element={<DetailFood />} />
      </Routes>
    </Router>
  );
}

export default App;
