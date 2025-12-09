import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Mealplan from "./pages/Mealplan";
import Culinary from "./pages/Culinary";
import DetailFood from "./pages/DetailFood";
import UploadPhoto from "./pages/UploadPhoto";
import ResultUpload from "./pages/ResultUpload";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DetailRestaurant from "./pages/Detailrestaurant";
import Profile from "./pages/Profile";
import MealplanResult from "./pages/MealplanResult";
import ChatBotPage from "./pages/ChatBotPage";
import Review from "./pages/Review";
import Save from "./pages/Save";

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, "", "/profile");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/mealplan" element={<Mealplan />} />
      <Route path="/mealplanresult" element={<MealplanResult />} />
      <Route path="/culinary" element={<Culinary />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/uploadphoto" element={<UploadPhoto />} />
      <Route path="/resultupload" element={<ResultUpload />} />
      <Route path="/detailfood/:name" element={<DetailFood />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/chatbot" element={<ChatBotPage />} />
      <Route path="/review" element={<Review />} />
      <Route path="/save" element={<Save />} />
      <Route path="/detailrestaurant/:id" element={<DetailRestaurant />} />
    </Routes>
  );
}

export default App;
