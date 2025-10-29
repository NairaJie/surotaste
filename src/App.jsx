import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Mealplan from "./pages/Mealplan";
import Culinary from "./pages/Culinary";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/mealplan" element={<Mealplan />} />
      <Route path="/culinary" element={<Culinary />} />
      
    </Routes>
  );
}

export default App;
