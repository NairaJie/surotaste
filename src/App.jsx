import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      {/* <Route path="/culinary" element={<Culinary />} />
      <Route path="/mealplan" element={<Mealplan />} /> */}
    </Routes>
  );
}

export default App;
