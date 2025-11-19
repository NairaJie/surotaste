import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Mealplan from "./pages/Mealplan";
import Culinary from "./pages/Culinary";
import DetailFood from "./pages/DetailFood";
import UploadPhoto from "./pages/UploadPhoto";
import ResultUpload from "./pages/ResultUpload";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DetailRestaurant from "./pages/DetailRestaurant";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/mealplan" element={<Mealplan />} />
      <Route path="/culinary" element={<Culinary />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/uploadphoto" element={<UploadPhoto />} />
      <Route path="/resultupload" element={<ResultUpload/>} />
      <Route path="/detailfood/:name" element={<DetailFood />} />
      <Route path="/detailrestaurant/:name" element={<DetailRestaurant />} />
    </Routes>
  );
}

export default App;
