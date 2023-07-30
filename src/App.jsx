import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Header,
  Profile,
  Login,
  Register,
} from "./components/imports.js";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { Context } from "./main.jsx";
import axios from "axios";
function App() {
  const { userData, setUserData, isAuthenticated, setIsAuthenticated } =
    useContext(Context);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:4000/user/me", { withCredentials: true })
      .then((response) => {
        response.data.success
          ? (setIsAuthenticated(true), setUserData(response.data.user))
          : (setIsAuthenticated(false), setUserData({}));
      })
      .catch((error) => {
        console.log(error);
        setIsAuthenticated(false);
      });
  }, [isAuthenticated]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
